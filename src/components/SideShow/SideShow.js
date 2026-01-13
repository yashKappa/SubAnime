import React, { useState, useEffect, useRef } from "react";
import "./side_show.css";
import "../Search/fetch.css";      // reuse existing grid styles
import "../responsive.css";

function SideShow() {
  const gotiRef = useRef(null);
  const [currentSection, setCurrentSection] = useState("Weekly");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnime = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/top/anime?filter=airing&page=${page}`
      );
      const data = await res.json();
      setFilteredMovies(data.data.slice(0, 13));
    } catch (error) {
      console.error("API Error:", error);
    }
    setLoading(false);
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    const page = section === "Weekly" ? 1 : section === "Monthly" ? 2 : 3;
    fetchAnime(page);
  };

  useEffect(() => {
    fetchAnime(1);
  }, []);

  useEffect(() => {
    gotiRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSection]);

  return (
    <>
      <div ref={gotiRef}></div>

      <div className="new-upcoming-anime-container">
        <div className="top">
          <h1>Top Airing</h1>

          <div className="set">
            {["Weekly", "Monthly", "All"].map((section) => (
              <button
                key={section}
                className={`Sidebtn ${
                  currentSection === section ? "active" : ""
                }`}
                onClick={() => handleSectionChange(section)}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="load">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajax_loader_metal_512.gif/250px-Ajax_loader_metal_512.gif"
              alt="loading"
            />
            Loading Top Airing...
          </p>
        ) : (
          <div className="new-anime-grid">
            {filteredMovies.map((anime) => (
              <div key={anime.mal_id} className="new-anime-card">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="new-anime-poster"
                />

                <h3 className="new-anime-title">{anime.title}</h3>

                {/* 🔥 SAME TOOLTIP UI */}
                <div className="new-anime-tooltip">
                  <h2>{anime.title}</h2>

                  <p>
                    <strong>Synopsis:</strong> {anime.synopsis}
                  </p>

                  <p>
                    <strong>Status:</strong> {anime.status}
                  </p>

                  <p>
                    <strong>Genres:</strong>{" "}
                    {anime.genres.map((g) => g.name).join(", ")}
                  </p>

                  <p>
                    <strong>Score:</strong> {anime.score || "N/A"}
                  </p>

                  <p>
                    <strong>Episodes:</strong> {anime.episodes || "?"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SideShow;
