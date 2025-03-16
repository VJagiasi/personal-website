// This file uses React Server Components for data fetching
// and passes the data to a client component for animations

import { getDatabase } from '@/lib/notion';
import WritingsClient from './writings-client';

// This makes the page dynamic
export const revalidate = 60; // revalidate every 60 seconds

interface Writing {
  id: string;
  title: string;
  slug: string;
  date?: string;
  description?: string;
}

// Function to convert title to slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Function to format date
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString('en-US', options);
}

async function getWritings() {
  try {
    const database = await getDatabase();
    return database;
  } catch (error) {
    console.error('Error fetching writings:', error);
    return [];
  }
}

export default async function WritingsPage() {
  const writings = await getWritings();
  
  // Process writings to extract title, date, and description
  const processedWritings: Writing[] = writings.map((writing: any) => {
    // Try to get title from various possible properties
    let title = 'Untitled';
    if (writing.properties.Title?.title?.[0]?.plain_text) {
      title = writing.properties.Title.title[0].plain_text;
    } else if (writing.properties.Name?.title?.[0]?.plain_text) {
      title = writing.properties.Name.title[0].plain_text;
    } else {
      // Look for any property that has a title array
      for (const propKey in writing.properties) {
        const prop = writing.properties[propKey];
        if (prop.title && prop.title[0]?.plain_text) {
          title = prop.title[0].plain_text;
          break;
        }
      }
    }
    
    // Get date from last_edited_time instead of Date property
    let date = '';
    if (writing.last_edited_time) {
      date = writing.last_edited_time;
    } else if (writing.created_time) {
      date = writing.created_time;
    }
    
    // Get description if available
    let description = '';
    if (writing.properties.Description?.rich_text?.[0]?.plain_text) {
      description = writing.properties.Description.rich_text[0].plain_text;
    } else if (writing.properties.Summary?.rich_text?.[0]?.plain_text) {
      description = writing.properties.Summary.rich_text[0].plain_text;
    }
    
    // Create a slug from the title
    const slug = slugify(title);
    
    return {
      id: writing.id,
      title,
      slug,
      date: date ? formatDate(date) : '',
      description
    };
  });
  
  // Sort writings by date (newest first)
  processedWritings.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Pass the processed writings to the client component
  return <WritingsClient writings={processedWritings} />;
}

