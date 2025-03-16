import { getPage, getBlocks } from '@/lib/notion';
import { getPageIdFromSlug } from '@/lib/slug-mapping';
import { notFound } from 'next/navigation';
import WritingClient from './writing-client';

// This makes the page dynamic
export const revalidate = 60; // revalidate every 60 seconds

export default async function WritingPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Get the Notion page ID from the slug
  const pageId = await getPageIdFromSlug(slug);
  
  if (!pageId) {
    notFound();
  }
  
  try {
    const page = await getPage(pageId);
    const blocks = await getBlocks(pageId);
    
    // Type assertion to fix TypeScript errors
    const typedPage = page as any;
    
    // Get the title from the page - try different possible property names
    let title = 'Untitled';
    if (typedPage.properties?.Title?.title?.[0]?.plain_text) {
      title = typedPage.properties.Title.title[0].plain_text;
    } else if (typedPage.properties?.Name?.title?.[0]?.plain_text) {
      title = typedPage.properties.Name.title[0].plain_text;
    } else {
      // Look for any property that has a title array
      for (const propKey in typedPage.properties) {
        const prop = typedPage.properties[propKey];
        if (prop.title && prop.title[0]?.plain_text) {
          title = prop.title[0].plain_text;
          break;
        }
      }
    }
    
    // Get the date from last_edited_time instead of Date property
    const date = typedPage.last_edited_time 
      ? new Date(typedPage.last_edited_time).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }) 
      : null;
    
    return <WritingClient title={title} date={date} blocks={blocks} />;
  } catch (error) {
    console.error('Error fetching writing:', error);
    notFound();
  }
} 