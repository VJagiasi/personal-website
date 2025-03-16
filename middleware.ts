import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPage } from '@/lib/notion';
import { slugify } from '@/lib/slug-mapping';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a direct ID-based writing URL
  if (pathname.startsWith('/writings/') && pathname.split('/').length === 3) {
    const segments = pathname.split('/');
    const idOrSlug = segments[segments.length - 1];
    
    // Check if the ID looks like a Notion ID (32 characters)
    if (idOrSlug && idOrSlug.length === 32) {
      try {
        // Fetch the page to get its title
        const page = await getPage(idOrSlug);
        
        // Type assertion to fix TypeScript errors
        const typedPage = page as any;
        
        // Get the title
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
        
        // Create a slug from the title
        const slug = slugify(title);
        
        // Create the new URL with the slug
        const newUrl = new URL(`/writings/${slug}`, request.url);
        
        // Redirect to the new URL
        return NextResponse.redirect(newUrl);
      } catch (error) {
        // If there's an error, just continue with the original request
        console.error('Error in middleware:', error);
      }
    }
  }
  
  return NextResponse.next();
}

// Only run the middleware on writing routes
export const config = {
  matcher: '/writings/:path*',
}; 