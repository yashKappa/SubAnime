import React, { useState, useEffect, useRef } from "react";
import "./side_show.css";

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

      // limit to 13 items
      setFilteredMovies(data.data.slice(0, 13));
    } catch (error) {
      console.error("API Error:", error);
    }
    setLoading(false);
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);

    const page =
      section === "Weekly" ? 1 :
      section === "Monthly" ? 2 : 3;

    fetchAnime(page);
  };

  // initial load
  useEffect(() => {
    fetchAnime(1);
  }, []);

  // scroll to top on section change
  useEffect(() => {
    gotiRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSection]);

  return (
    <>
      <div ref={gotiRef}></div>

      <div className="Side">
        <div className="movie-card-container">

          <div className="top">
            <h1>Top Airing</h1>
          </div>

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

          {loading ? (
            <p className="load">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajax_loader_metal_512.gif/250px-Ajax_loader_metal_512.gif" alt="loading_Img"/>
          Loading...
        </p>
          ) : (
            <div className="movie-card-wrapper">
              {filteredMovies.map((anime) => (
                <div key={anime.mal_id} className="movie-card">
                  <div className="movie-card-image">
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="movie-card-img"
                    />
                    <span className="sideData">
                      <h2 className="movie-title">{anime.title}</h2>
                      <p>
                        <strong>Status:</strong> {anime.status}
                      </p>
                      <p>
                        <strong>Genres:</strong>{" "}
                        {anime.genres.map(g => g.name).join(", ")}
                      </p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default SideShow;
