// src/pages/HomePage.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams({
          'page[number]': 1,
          'page[size]': 10,
          'append[]': 'small_image',
          'append[]': 'medium_image',
          'sort': '-published_at'
        }).toString();

        const response = await axios.get(`/api/ideas?${params}`);
        setIdeas(response.data.data); // Asumsi data artikel ada di response.data.data
      } catch (err) {
        console.error("Error fetching ideas:", err);
        setError("Failed to fetch ideas. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  if (loading) return <div>Loading ideas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Latest Ideas</h1>
      {ideas.map(idea => (
        <div key={idea.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{idea.title}</h2>
          <p>{idea.content.substring(0, 100)}...</p>
          {idea.small_image && idea.small_image[0] && idea.small_image[0].url && (
            <img src={idea.small_image[0].url} alt={idea.title} style={{ maxWidth: '100px', height: 'auto' }} />
          )}
          <p>Published at: {new Date(idea.published_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;