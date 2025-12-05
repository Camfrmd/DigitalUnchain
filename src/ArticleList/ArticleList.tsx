import React, { useState } from 'react';
import ArticleCard from './ArticleCard/ArticleCard';
import ArticleReader from './ArticleReader/ArticleReader';
import './ArticleList.css';

// Import article folders dynamically
// For now, we'll use a static list. In a real app, you'd use import.meta.glob
// or fetch a directory listing from the server
const articleFolders = ['deployment']; // Add more folder names as you create articles

const ArticleList: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const handleCardClick = (folderName: string) => {
    setSelectedArticle(folderName);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="article-list-container">
        <button className="back-button" onClick={handleBackToList}>
          ← Back to Articles
        </button>
        <ArticleReader folderName={selectedArticle} />
      </div>
    );
  }

  return (
    <div className="article-list-container">
      <h1 className="article-list-title">Articles</h1>
      <div className="article-list-grid">
        {articleFolders.map((folderName) => (
          <ArticleCard
            key={folderName}
            folderName={folderName}
            onClick={() => handleCardClick(folderName)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
