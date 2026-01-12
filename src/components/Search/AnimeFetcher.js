import React, { useState, useEffect, useRef } from "react";
import './fetch.css';
import SearchBox from "./SearchBox";
import AddToWatchlist from "./Add";

const AnimeFetcher = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const gotiRef = useRef(null);
const [search, setSearch] = useState("");

  const fetchAnimeData = async (page = 1, perPage = 20) => {
    const url = "https://graphql.anilist.co";
   const query = `
query (
  $page: Int,
  $perPage: Int,
  $search: String,
  $genre: String,
  $status: MediaStatus,
  $score: Int
) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      currentPage
      hasNextPage
    }
    media(
      type: ANIME
      search: $search
      genre: $genre
      status: $status
      averageScore_greater: $score
    ) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        large
      }
      genres
      averageScore
      startDate {
        year
        month
        day
      }
      status
      episodes
    }
  }
}
`;


   const variables = {
  page,
  perPage,
  search: search || null, // ✅ THIS WAS MISSING
};


    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        console.error("GraphQL Errors:", data.errors);
        setIsLoading(false);
        return;
      }

      const pageData = data.data.Page; // Extract Page object
      setAnimeList(pageData.media);
      setHasNextPage(pageData.pageInfo.hasNextPage);
      setCurrentPage(pageData.pageInfo.currentPage);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
  fetchAnimeData(currentPage);

  // 🔥 Scroll to top of goti div
  if (gotiRef.current) {
    gotiRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [currentPage]);

const handleMouseEnter = (e) => {
  const tooltip = e.currentTarget.querySelector(".new-anime-tooltip");
  if (tooltip) {
    tooltip.scrollTop = 0; // 🔥 reset scroll on hover
  }
};

return (
  <>
    <div ref={gotiRef}></div>

    <div className="new-upcoming-anime-container">
      <div className="top">
        <h1>Search Anime</h1>

        <SearchBox
          search={search}
          setSearch={setSearch}
          onSearch={() => {
            setCurrentPage(1);
            fetchAnimeData(1);
          }}
        />
      </div>

      {/* 🔥 SAME LOADING STYLE */}
      {isLoading ? (
        <p className="load">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajax_loader_metal_512.gif/250px-Ajax_loader_metal_512.gif"
            alt="loading"
          />
          Loading...
        </p>
      ) : animeList && animeList.length > 0 ? (
        <>
          <div className="new-anime-grid">
            {animeList.map((anime) => (
               <div
    key={anime.id}
    className="new-anime-card"
    onMouseEnter={handleMouseEnter}
  >
              <div key={anime.id} className="new-anime-card">
                <img
                  src={anime.coverImage.large}
                  alt={anime.title.romaji}
                  className="new-anime-poster"
                />

                <h3 className="new-anime-title">
                  {anime.title.romaji}
                </h3>

                {/* 🔥 SAME TOOLTIP DESIGN */}
                <div className="new-anime-tooltip">
                  <h2>
                    {anime.title.romaji ||
                      anime.title.english ||
                      anime.title.native}
                  </h2>

                  <p>
                    <strong>Score:</strong>{" "}
                    {anime.averageScore || "N/A"} ⭐
                  </p>

                  <p>
                    <strong>Synopsis:</strong>{" "}
                    {anime.description
                      ? anime.description.slice(0, 180) + "..."
                      : "No synopsis available"}
                  </p>

                  <p>
                    <strong>Japanese:</strong>{" "}
                    {anime.title.native || "N/A"}
                  </p>

                  <p>
                    <strong>Aired:</strong>{" "}
                    {anime.startDate?.year
                      ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Episodes:</strong>{" "}
                    {anime.episodes || "N/A"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {anime.status || "N/A"}
                  </p>

                  <p>
                    <strong>Genres:</strong>{" "}
                    {anime.genres?.join(", ") || "N/A"}
                  </p>

                  <AddToWatchlist anime={anime} />
                </div>
              </div>
              </div>
            ))}
          </div>

          {/* 🔥 SAME PAGINATION STYLE */}
          <div className="new-view-more">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-arrow-left"></i> Previous
            </button>

            <span>Page {currentPage}</span>

            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </>
      ) : (
        <p className="load">No anime found 📭</p>
      )}
    </div>
  </>
);

};

export default AnimeFetcher;
