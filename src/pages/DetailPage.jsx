import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdea = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/ideas/${id}?append[]=medium_image&append[]=small_image`);
        setIdea(response.data.data);
      } catch (err) {
        setError('Gagal memuat detail.');
      } finally {
        setLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  if (loading) return <div style={{padding:32}}>Loading...</div>;
  if (error) return <div style={{padding:32, color:'red'}}>{error}</div>;
  if (!idea) return <div style={{padding:32}}>Data tidak ditemukan.</div>;

  const imageUrl = (Array.isArray(idea.medium_image) && idea.medium_image[0] && idea.medium_image[0].url)
    || (Array.isArray(idea.small_image) && idea.small_image[0] && idea.small_image[0].url)
    || 'https://via.placeholder.com/800x600?text=No+Image';

  return (
    <div style={{maxWidth:800, margin:'40px auto', padding:'0 16px'}}>
      <img src={imageUrl} alt={idea.title} style={{width:'100%',height:'auto',borderRadius:16,boxShadow:'0 4px 24px rgba(0,0,0,0.12)',marginBottom:32}} />
      <h1 style={{marginBottom:16}}>{idea.title}</h1>
      <div style={{color:'#888',marginBottom:24}}>{new Date(idea.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      <div style={{fontSize:'1.15em',lineHeight:1.7}}>{idea.content || idea.summary || '-'}</div>
    </div>
  );
}

export default DetailPage; 