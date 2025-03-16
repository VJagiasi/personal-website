import { getDatabase } from './notion';

// Function to convert title to slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Cache for slug to ID mapping
let slugToIdMap: Record<string, string> = {};
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

export async function getSlugToIdMap(): Promise<Record<string, string>> {
  const now = Date.now();
  
  // Return cached map if it's still fresh
  if (Object.keys(slugToIdMap).length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return slugToIdMap;
  }
  
  // Fetch all pages from the database
  const pages = await getDatabase();
  const newMap: Record<string, string> = {};
  
  // Create a mapping of slug to page ID
  pages.forEach((page: any) => {
    // Try to get title from various possible properties
    let title = 'Untitled';
    if (page.properties.Title?.title?.[0]?.plain_text) {
      title = page.properties.Title.title[0].plain_text;
    } else if (page.properties.Name?.title?.[0]?.plain_text) {
      title = page.properties.Name.title[0].plain_text;
    } else {
      // Look for any property that has a title array
      for (const propKey in page.properties) {
        const prop = page.properties[propKey];
        if (prop.title && prop.title[0]?.plain_text) {
          title = prop.title[0].plain_text;
          break;
        }
      }
    }
    
    const slug = slugify(title);
    newMap[slug] = page.id;
  });
  
  // Update the cache
  slugToIdMap = newMap;
  lastFetchTime = now;
  
  return newMap;
}

export async function getPageIdFromSlug(slug: string): Promise<string | null> {
  const map = await getSlugToIdMap();
  return map[slug] || null;
} 