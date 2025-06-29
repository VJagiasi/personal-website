import { getObservationsContent } from '@/lib/notion';
import ClientPage from './page-client';

// This makes the page dynamic
export const revalidate = 60;

interface Block {
  type: string;
  id: string;
  paragraph?: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  numbered_list_item?: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
}

async function getThoughts() {
  try {
    const blocks = await getObservationsContent();
    
    // Extract text from numbered list items and paragraphs
    const thoughts = blocks
      .map((block: Block) => {
        if (block.numbered_list_item) {
          return block.numbered_list_item.rich_text
            .map(text => text.plain_text)
            .join('');
        }
        if (block.paragraph) {
          return block.paragraph.rich_text
            .map(text => text.plain_text)
            .join('');
        }
        return null;
      })
      .filter(text => text !== null && text.trim() !== '') as string[];

    return thoughts;
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return [];
  }
}

export default async function Page() {
  const thoughts = await getThoughts();
  return <ClientPage thoughts={thoughts} />;
}

