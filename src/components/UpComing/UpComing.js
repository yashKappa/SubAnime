import React, { useState, useEffect, useRef } from "react";
import "./UpComing.css";

const UpcomingAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // pagination
  const [hasNextPage, setHasNextPage] = useState(true); // to disable next button if no more pages

  const gotiRef = useRef(null);

  const fetchAnime = async (currentPage) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/seasons/upcoming?page=${currentPage}`
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      if (data.data.length === 0) {
        setHasNextPage(false);
        return;
      } else {
        setHasNextPage(true);
      }

      // limit to 10 anime per page
      setAnimeList(data.data.slice(0, 10));
    } catch (err) {
      setError("Failed to fetch upcoming anime.");
    } finally {
      setLoading(false);
    }
  };

  // fetch on page load and page change
  useEffect(() => {
    fetchAnime(page);
  }, [page]);

  // scroll to top when page changes
  useEffect(() => {
    gotiRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <>
      <div ref={gotiRef}></div>

      <div className="top">
        <h1>Up Coming</h1>
      </div>

      <div className="new-upcoming-anime-container">
        {loading ? (
          <p className="load">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajax_loader_metal_512.gif/250px-Ajax_loader_metal_512.gif" alt="loading_Img"/>
          Loading...
        </p>
        ) : error ? (
          <p className="load">{error}</p>
        ) : (
          <>
            <div className="new-anime-grid">
              {animeList.map((anime) => (
                <div key={anime.mal_id} className="new-anime-card">
                  <img
                    src={anime.images?.jpg?.image_url || "/fallback-image.png"}
                    alt={anime.title || "No title"}
                    className="new-anime-poster"
                  />
                  <h3 className="new-anime-title">{anime.title || "No title"}</h3>
                  <div className="new-anime-tooltip">
                    <p><strong>Name:</strong> {anime.title || "No title"}</p>
                    <p><strong>Status:</strong> {anime.status || "Unknown"}</p>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {anime.aired?.from ? anime.aired.from.split("T")[0] : "TBA"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="new-view-more">
              <button onClick={handlePrev} disabled={page === 1}>
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <span>Page {page}</span>
              <button onClick={handleNext} disabled={!hasNextPage}>
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UpcomingAnime;
