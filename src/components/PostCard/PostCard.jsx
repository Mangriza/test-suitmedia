// src/components/PostCard/PostCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PostCard.module.css';

function PostCard({ idea }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = React.useState(false);
  const truncateTitle = (title, maxLines = 3) => {
    const lineHeight = 1.2; 
    const maxHeight = maxLines * lineHeight; 

    return title; 
  };

  const formattedDate = new Date(idea.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let imageUrl = (Array.isArray(idea.medium_image) && idea.medium_image[0] && idea.medium_image[0].url)
    || (Array.isArray(idea.small_image) && idea.small_image[0] && idea.small_image[0].url)
    || `https://picsum.photos/seed/${idea.id}/400/300`;

  return (
    <div className={styles.card} onClick={() => navigate(`/detail/${idea.id}`)} style={{cursor:'pointer'}}>
      <div className={styles.imageWrapper}>
        {imgError ? (
          <img
            src={`https://picsum.photos/seed/fallback${idea.id}/400/300`}
            alt="Dummy"
            className={styles.cardImage}
            style={{position: 'relative', width: '100%', height: 'auto', objectFit: 'cover', background: '#f3f3f3'}}
          />
        ) : (
          <img
            src={imageUrl}
            alt={idea.title}
            className={styles.cardImage}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{position: 'relative', width: '100%', height: 'auto', objectFit: 'cover', background: '#f3f3f3'}}
          />
        )}
      </div>
      <div className={styles.cardContent}>
        <p className={styles.publishedDate}>{formattedDate}</p>
        <h3 className={styles.cardTitle}>{idea.title}</h3>
      </div>
    </div>
  );
}

export default PostCard;