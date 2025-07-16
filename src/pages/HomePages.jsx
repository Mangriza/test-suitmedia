// src/pages/HomePage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard/PostCard';
import styles from './HomePage.module.css';

function HomePage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('-published_at');
  const [totalItems, setTotalItems] = useState(0);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    params.set('page[number]', currentPage);
    params.set('page[size]', itemsPerPage);
    params.append('append[]', 'small_image');
    params.append('append[]', 'medium_image');
    params.set('sort', sortBy);
    const paramsString = params.toString();
    try {
      const response = await axios.get(`/api/ideas?${paramsString}`);
      setIdeas(response.data.data);
      setTotalItems(response.data.meta.total);
    } catch (err) {
      console.error("Error fetching ideas:", err);
      setError("Failed to fetch ideas. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, sortBy]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(maxPageButtons / 2));
  if (endPage - startPage + 1 < maxPageButtons) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPageButtons + 1);
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  const renderPageButtons = () => (
    <>
      {startPage > 1 && (
        <>
          <button onClick={() => setCurrentPage(1)}>1</button>
          {startPage > 2 && <span>...</span>}
        </>
      )}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={number === currentPage ? styles.activePage : ''}
        >
          {number}
        </button>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
        </>
      )}
    </>
  );

  if (loading) return <div className={styles.loadingState}>Loading ideas...</div>;
  if (error) return <div className={styles.errorState}>Error: {error}</div>;

  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.pageTitle}>Our Latest Ideas</h1>
      <div className={styles.controlsRow}>
        <span className={styles.paginationInfo}>
          Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </span>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label htmlFor="sortBy">Sort By:</label>
            <select id="sortBy" value={sortBy} onChange={handleSortChange}>
              <option value="-published_at">Terbaru</option>
              <option value="published_at">Terlama</option>
            </select>
          </div>
          <div className={styles.controlGroup}>
            <label htmlFor="itemsPerPage">Show:</label>
            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.postGrid}>
        {ideas.map(idea => (
          <PostCard key={idea.id} idea={idea} />
        ))}
        {Array.from({ length: (4 - (ideas.length % 4)) % 4 }).map((_, idx) => (
          <div key={`dummy-${idx}`} className={`${styles.card} dummy`} style={{visibility:'hidden'}} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageButtons()}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;