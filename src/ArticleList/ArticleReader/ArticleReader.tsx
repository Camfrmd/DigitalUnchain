import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ArticleReader.css';

interface ArticleReaderProps {
  folderName: string;
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ folderName }) => {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [imagePath, setImagePath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError('');

        // Construct paths
        const articlePath = `/src/ArticleList/articles/${folderName}/article.md`;
        const imageSrc = `/src/ArticleList/articles/${folderName}/main.png`;

        // Fetch the markdown file
        const response = await fetch(articlePath);
        if (!response.ok) {
          throw new Error(`Failed to load article: ${response.statusText}`);
        }

        const markdownText = await response.text();
        
        // Extract the first H1 as title
        const h1Match = markdownText.match(/^#\s+(.+)$/m);
        if (h1Match) {
          setTitle(h1Match[1]);
          // Remove the first H1 from the content since we'll display it separately
          const contentWithoutTitle = markdownText.replace(/^#\s+.+$/m, '').trim();
          setContent(contentWithoutTitle);
        } else {
          setTitle('Untitled Article');
          setContent(markdownText);
        }

        setImagePath(imageSrc);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
        setLoading(false);
      }
    };

    loadArticle();
  }, [folderName]);

  if (loading) {
    return <div className="article-reader loading">Loading article...</div>;
  }

  if (error) {
    return <div className="article-reader error">Error: {error}</div>;
  }

  return (
    <article className="article-reader">
      <div className="article-header">
        <img 
          src={imagePath} 
          alt={title}
          className="article-main-image"
          onError={(e) => {
            // Hide image if it fails to load
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <h1 className="article-title">{title}</h1>
      </div>
      
      <div className="article-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleReader;
