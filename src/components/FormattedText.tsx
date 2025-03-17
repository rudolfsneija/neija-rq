import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className = '' }: FormattedTextProps) {
  if (!text) return null;
  
  // Process horizontal rule first (---) to avoid conflicts
  const segments = text.split(/^---$/m);
  
  if (segments.length > 1) {
    // We have horizontal rules
    return (
        <div className={className}>
        {segments.map((segment, i) => (
            <React.Fragment key={i}>
            {i > 0 && <hr className="my-4 border-gray-300" />}
            <FormattedText text={segment} />
            </React.Fragment>
        ))}
        </div>
    );
  }
  
  // Process line breaks first (convert to paragraphs)
  const paragraphs = text.split(/\n\s*\n/);
  
  // Process formatting within paragraphs
  const formattedParagraphs = paragraphs.map((paragraph, index) => {
    // Process bold text: **text** -> <strong>text</strong>
    let formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Process italic text: *text* -> <em>text</em>
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Process bullet points: "- item" -> list items
    if (formatted.trim().startsWith('- ')) {
      const items = formatted.split(/\n- /);
      return (
        <ul key={index} className="list-disc pl-5 my-2">
          {items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: i === 0 ? item.substring(2) : item }} />
          ))}
        </ul>
      );
    }
    
    // Process single line breaks
    formatted = formatted.replace(/\n/g, '<br />');
    
    return <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
  
  return <div className={className}>{formattedParagraphs}</div>;
}