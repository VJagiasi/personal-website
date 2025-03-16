import { Client } from '@notionhq/client';
import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Initialize the Notion client
let notion: Client;

// Initialize the client only on the server side
if (typeof window === 'undefined') {
  notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
}

export const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
  const response = await notion.databases.query({
    database_id: databaseId as string,
    // Removing the sort by Date since that property doesn't exist
    // sorts: [
    //   {
    //     property: 'Date',
    //     direction: 'descending',
    //   },
    // ],
  });
  
  return response.results;
}

export async function getPage(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
}

// Define a type for blocks with children
type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

export async function getBlocks(blockId: string): Promise<BlockWithChildren[]> {
  const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
  let cursor: string | undefined;
  
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    
    blocks.push(...results);
    
    if (!next_cursor) {
      break;
    }
    
    cursor = next_cursor;
  }
  
  // Fetch child blocks for nested blocks (e.g., toggle blocks)
  const fullBlocks = blocks as BlockObjectResponse[];
  
  const childBlocks = await Promise.all(
    fullBlocks
      .filter((block) => 'has_children' in block && block.has_children)
      .map(async (block) => {
        const children = await getBlocks(block.id);
        return { ...block, children } as BlockWithChildren;
      })
  );

  const blocksWithChildren = fullBlocks.map((block) => {
    if ('has_children' in block && block.has_children) {
      const childBlock = childBlocks.find((x) => x.id === block.id);
      return { ...block, children: childBlock?.children || [] } as BlockWithChildren;
    }
    return block as BlockWithChildren;
  });
  
  return blocksWithChildren;
} 