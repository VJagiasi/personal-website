"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface WritingClientProps {
  title: string;
  date: string | null;
  blocks: any[];
}

// Function to render blocks
function renderBlock(block: any, index: number, blocks: any[]) {
  const { type, id } = block;
  const value = block[type];
  
  // Special handling for numbered lists
  if (type === 'numbered_list_item') {
    // Check if this is the start of a numbered list
    const isStartOfList = index === 0 || blocks[index - 1].type !== 'numbered_list_item';
    
    // If it's the start, we need to find all consecutive numbered list items
    if (isStartOfList) {
      let endOfListIndex = index;
      while (
        endOfListIndex < blocks.length - 1 && 
        blocks[endOfListIndex + 1].type === 'numbered_list_item'
      ) {
        endOfListIndex++;
      }
      
      // Extract all list items
      const listItems = blocks.slice(index, endOfListIndex + 1);
      
      // Render the entire ordered list
      return (
        <ol className="list-decimal pl-6 mb-6 space-y-2" key={`list-${id}`}>
          {listItems.map((item) => (
            <li key={item.id} className="text-neutral-800">
              {item.numbered_list_item.rich_text.map((text: any, i: number) => {
                const {
                  annotations: { bold, code, italic, strikethrough, underline },
                  text: { content, link },
                } = text;
                
                // Apply text formatting (similar to paragraph formatting)
                if (link) {
                  return (
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      key={`${item.id}-${i}`} 
                      className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
                    >
                      {content}
                    </a>
                  );
                }
                
                if (bold) {
                  return <strong key={`${item.id}-${i}`} className="font-semibold">{content}</strong>;
                }
                
                if (italic) {
                  return <em key={`${item.id}-${i}`}>{content}</em>;
                }
                
                if (underline) {
                  return <u key={`${item.id}-${i}`}>{content}</u>;
                }
                
                if (strikethrough) {
                  return <s key={`${item.id}-${i}`}>{content}</s>;
                }
                
                if (code) {
                  return <code key={`${item.id}-${i}`} className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono">{content}</code>;
                }
                
                return <span key={`${item.id}-${i}`}>{content}</span>;
              })}
            </li>
          ))}
        </ol>
      );
    }
    
    // If it's not the start of a list, skip it (it will be rendered as part of the list)
    return null;
  }
  
  // Handle other block types
  switch (type) {
    case 'paragraph':
      return (
        <p className="text-neutral-800 mb-6 leading-relaxed font-normal" key={id}>
          {value.rich_text.map((text: any, i: number) => {
            const {
              annotations: { bold, code, color, italic, strikethrough, underline },
              text: { content, link },
            } = text;
            
            // Apply text formatting
            let formattedText = content;
            
            if (link) {
              return (
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={`${id}-${i}`} 
                  className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
                >
                  {formattedText}
                </a>
              );
            }
            
            if (bold) {
              return <strong key={`${id}-${i}`} className="font-semibold">{formattedText}</strong>;
            }
            
            if (italic) {
              return <em key={`${id}-${i}`}>{formattedText}</em>;
            }
            
            if (underline) {
              return <u key={`${id}-${i}`}>{formattedText}</u>;
            }
            
            if (strikethrough) {
              return <s key={`${id}-${i}`}>{formattedText}</s>;
            }
            
            if (code) {
              return <code key={`${id}-${i}`} className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono">{formattedText}</code>;
            }
            
            return <span key={`${id}-${i}`}>{formattedText}</span>;
          })}
        </p>
      );
    
    case 'heading_1':
      return <h1 className="text-3xl font-normal mt-10 mb-6 text-neutral-900" key={id}>{value.rich_text[0]?.text?.content || ''}</h1>;
    
    case 'heading_2':
      return <h2 className="text-2xl font-normal mt-8 mb-4 text-neutral-900" key={id}>{value.rich_text[0]?.text?.content || ''}</h2>;
    
    case 'heading_3':
      return <h3 className="text-xl font-normal mt-6 mb-3 text-neutral-900" key={id}>{value.rich_text[0]?.text?.content || ''}</h3>;
    
    case 'bulleted_list_item':
      return (
        <li className="text-neutral-800 pl-4 relative mb-3" key={id}>
          <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
          <span>{value.rich_text[0]?.text?.content || ''}</span>
        </li>
      );
    
    case 'to_do':
      return (
        <div className="flex items-start mb-3 text-neutral-800" key={id}>
          <input 
            type="checkbox" 
            checked={value.checked} 
            readOnly 
            className="mt-1 mr-2 h-4 w-4 rounded border-neutral-300 text-blue-600" 
          />
          <span className={value.checked ? "line-through text-neutral-500" : ""}>{value.rich_text[0]?.text?.content || ''}</span>
        </div>
      );
    
    case 'toggle':
      return (
        <details className="mb-4 border border-neutral-200 rounded-md" key={id}>
          <summary className="cursor-pointer font-normal p-3 hover:bg-neutral-50">
            {value.rich_text[0]?.text?.content || ''}
          </summary>
          <div className="p-3 pt-0 border-t border-neutral-200 bg-neutral-50">
            {block.children?.map((child: any, childIndex: number) => (
              renderBlock(child, childIndex, block.children)
            ))}
          </div>
        </details>
      );
    
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure className="my-8" key={id}>
          <img src={src} alt={caption} className="rounded-md w-full" />
          {caption && <figcaption className="text-center text-sm text-neutral-500 mt-2">{caption}</figcaption>}
        </figure>
      );
    
    case 'divider':
      return <hr className="my-8 border-neutral-200" key={id} />;
    
    case 'quote':
      return (
        <blockquote className="pl-4 border-l-4 border-neutral-200 my-6 text-neutral-700 italic" key={id}>
          {value.rich_text[0]?.text?.content || ''}
        </blockquote>
      );
    
    case 'code':
      return (
        <pre className="bg-neutral-100 p-4 rounded-md overflow-x-auto my-6 text-sm font-mono" key={id}>
          <code>{value.rich_text[0]?.text?.content || ''}</code>
        </pre>
      );
    
    default:
      return <p className="text-neutral-500" key={id}>Unsupported block type: {type}</p>;
  }
}

export default function WritingClient({ title, date, blocks }: WritingClientProps) {
  // Animation variants
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <motion.article 
      className="py-12 px-6 md:px-0 max-w-2xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="mb-12" variants={item}>
        <h1 className="text-3xl font-normal mb-3 text-neutral-900">{title}</h1>
        {date && <p className="text-neutral-500 text-sm">{date}</p>}
      </motion.div>
      
      <motion.div className="max-w-none" variants={item}>
        {blocks.map((block: any, index: number) => (
          renderBlock(block, index, blocks)
        ))}
      </motion.div>
    </motion.article>
  );
} 