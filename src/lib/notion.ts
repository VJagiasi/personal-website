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

export const ids = {
  writings: process.env.NOTION_DATABASE_ID, // This is a database
  observations: process.env.NOTION_OBSERVATIONS_PAGE_ID // This is a page
};

export async function getDatabase() {
  const databaseId = ids.writings;
  
  if (!databaseId) {
    throw new Error('Database ID for writings not found');
  }

  const response = await notion.databases.query({
    database_id: databaseId,
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

// New function specifically for getting observations from a page
export async function getObservationsContent(): Promise<BlockWithChildren[]> {
  const pageId = ids.observations;
  
  if (!pageId) {
    throw new Error('Page ID for observations not found');
  }

  return getBlocks(pageId);
} 