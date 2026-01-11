import React, { useEffect, useState } from "react";
import axios from "axios";

const NewFetch = () => {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch upcoming anime
  useEffect(() => {
    const fetchUpcomingAnime = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/seasons/upcoming");
        setAnimeData(response.data.data); // Jikan API returns data in a 'data' property
        setLoading(false);
      } catch (err) {
        console.error("Error fetching upcoming anime:", err);
        setError("Failed to fetch upcoming anime data.");
        setLoading(false);
      }
    };

    fetchUpcomingAnime();
  }, []);

  if (loading) return <p className="new-loading-message">Loading...</p>;
  if (error) return <p className="new-error-message">{error}</p>;

  return (
    <section id="new-upcoming-anime-section">
      <div className="new-anime-grid">
        {animeData.slice(0, 15).map((anime) => (
          <div className="new-anime-card" key={anime.mal_id}>
            {/* Anime Image */}
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="new-anime-poster"
            />
            {/* Anime Title */}
            <div className="new-anime-title">{anime.title}</div>
            {/* Tooltip */}
            <div className="new-anime-tooltip">
              <p>
                <strong>Status:</strong> {anime.status || "Upcoming"}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {anime.aired?.from
                  ? new Date(anime.aired.from).toLocaleDateString()
                  : "TBA"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewFetch;
