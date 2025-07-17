import React from 'react';
import styles from './PostCard.module.css';

function PostModal({ idea, onClose }) {
  const [imgError, setImgError] = React.useState(false);
  let imageUrl = (Array.isArray(idea.medium_image) && idea.medium_image[0] && idea.medium_image[0].url)
    || (Array.isArray(idea.small_image) && idea.small_image[0] && idea.small_image[0].url)
    || `https://picsum.photos/seed/${idea.id}/600/400`;
  if (imgError) imageUrl = `https://picsum.photos/seed/fallback${idea.id}/600/400`;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>×</button>
        <img
          src={imageUrl}
          alt={idea.title}
          className={styles.modalImage}
          onError={() => setImgError(true)}
        />
        <h2 className={styles.modalTitle}>{idea.title}</h2>
        <div
          className={styles.modalText}
          dangerouslySetInnerHTML={{ __html: idea.content || idea.summary || '-' }}
        />
      </div>
    </div>
  );
}

export default PostModal; 