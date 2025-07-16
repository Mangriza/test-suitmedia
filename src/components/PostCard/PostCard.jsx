// src/components/PostCard/PostCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PostCard.module.css';

function PostCard({ idea }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = React.useState(false);
  // Fungsi untuk membatasi judul maksimal 3 baris dan menambahkan ellipsis
  const truncateTitle = (title, maxLines = 3) => {
    // Estimasi tinggi baris, bisa disesuaikan dengan line-height CSS
    const lineHeight = 1.2; // Misalnya 1.2em
    const maxHeight = maxLines * lineHeight; // Total tinggi yang diizinkan

    // Karena kita tidak bisa langsung mendeteksi baris di JS,
    // kita gunakan teknik CSS untuk ellipsis multi-line.
    // Fungsi ini lebih untuk memastikan judul tidak terlalu panjang di JS
    // jika CSS ellipsis tidak bekerja sempurna atau untuk preview teks.
    // Namun, untuk ellipsis multi-line paling efektif di CSS.
    return title; // Kita akan mengandalkan CSS untuk multi-line ellipsis
  };

  const formattedDate = new Date(idea.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Pilih gambar terbaik yang tersedia, prioritaskan medium_image
  let imageUrl = (Array.isArray(idea.medium_image) && idea.medium_image[0] && idea.medium_image[0].url)
    || (Array.isArray(idea.small_image) && idea.small_image[0] && idea.small_image[0].url)
    || 'https://placehold.co/400x300?text=No+Image';
  if (imageUrl.startsWith('https://assets.suitdev.com')) {
    imageUrl = imageUrl.replace('https://assets.suitdev.com', '/image-proxy');
  }

  return (
    <div className={styles.card} onClick={() => navigate(`/detail/${idea.id}`)} style={{cursor:'pointer'}}>
      <div className={styles.imageWrapper}>
        {imgError ? (
          <div style={{fontSize:'10px',color:'#aaa',wordBreak:'break-all',textAlign:'center',padding:'8px'}}>{imageUrl}</div>
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