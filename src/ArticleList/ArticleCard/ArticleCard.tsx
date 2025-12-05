import React, { useEffect, useState } from 'react';
import './ArticleCard.css';

interface ArticleCardProps {
  folderName: string;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ folderName, onClick }) => {
  const [title, setTitle] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [imagePath, setImagePath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const MAX_EXCERPT_LENGTH = 150;

  useEffect(() => {
    const loadArticlePreview = async () => {
      try {
        setLoading(true);

        // Construct paths
        const articlePath = `/src/assets/articles/${folderName}/article.md`;
        const imageSrc = `/src/assets/articles/${folderName}/main.png`;

        // Fetch the markdown file
        const response = await fetch(articlePath);
        if (!response.ok) {
          throw new Error(`Failed to load article preview`);
        }

        const markdownText = await response.text();
        
        // Extract the first H1 as title
        const h1Match = markdownText.match(/^#\s+(.+)$/m);
        if (h1Match) {
          setTitle(h1Match[1]);
        } else {
          setTitle('Untitled Article');
        }

        // Extract first paragraph (non-heading text)
        // Remove all headings and get first substantial paragraph
        const contentWithoutHeadings = markdownText
          .replace(/^#{1,6}\s+.+$/gm, '') // Remove all headings
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to plain text
          .trim();

        // Find first paragraph
        const paragraphs = contentWithoutHeadings
          .split('\n\n')
          .filter(p => p.trim().length > 0);
        
        const firstParagraph = paragraphs[0] || '';
        
        // Truncate to max length
        let excerptText = firstParagraph.replace(/\n/g, ' ').trim();
        if (excerptText.length > MAX_EXCERPT_LENGTH) {
          excerptText = excerptText.substring(0, MAX_EXCERPT_LENGTH).trim() + '...';
        }
        
        setExcerpt(excerptText);
        setImagePath(imageSrc);
        setLoading(false);
      } catch (err) {
        console.error('Error loading article preview:', err);
        setTitle('Error loading article');
        setExcerpt('Could not load article preview');
        setLoading(false);
      }
    };

    loadArticlePreview();
  }, [folderName]);

  if (loading) {
    return (
      <div className="article-card loading">
        <div className="article-card-loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="article-card" onClick={onClick}>
      <div className="article-card-image-container">
        <img 
          src={imagePath} 
          alt={title}
          className="article-card-image"
          onError={(e) => {
            // Show placeholder if image fails to load
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      <div className="article-card-content">
        <h3 className="article-card-title">{title}</h3>
        <p className="article-card-excerpt">{excerpt}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
