import React, { useState, useEffect, useRef } from "react";
import './fetch.css';
import SearchBox from "./SearchBox";

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


  return (
  <>
    <div  ref={gotiRef}></div>
    <div className="top" > 
        <h1>Search Anime</h1>

<SearchBox
  search={search}
  setSearch={setSearch}
  onSearch={() => {
    setCurrentPage(1);
    fetchAnimeData(1);
  }}
/>



    <div className="goti">
      {isLoading ? (
        <p className="load">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajax_loader_metal_512.gif/250px-Ajax_loader_metal_512.gif" alt="loading_Img"/>
          Loading...
        </p>
      ) : (
        <div className="git">
          
            {animeList && animeList.length > 0 ? (
            <div className="anime-list">
              {animeList.map((anime) => (
                <div className="anime-item" key={anime.id}>
                  <img src={anime.coverImage.large} alt={anime.title.romaji} />
                  <p className="epo">
                      <strong>Epo: {anime.episodes || "N/A"}</strong>
                    </p>
                  <h3>{anime.title.romaji}</h3>
                  <div className="tooltip">
                    <h4>
                      {anime.title.romaji || anime.title.english || anime.title.native}
                    </h4>
                    <p className="icon">
                      <strong>Score:</strong> {anime.averageScore || "N/A"} <i class="fa-solid fa-star"></i>
                    </p>
                    <p>
                      <strong>Synopsis:</strong>{" "}
                      {anime.description
                        ? anime.description.slice(0, 150) + "..."
                        : "No synopsis available."}
                    </p>
                    <p>
                      <strong>Japanese:</strong> {anime.title.native || "N/A"}
                    </p>
                    <p>
                      <strong>Aired:</strong> {anime.startDate ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : "N/A"}
                    </p>
                    <p>
                      <strong>Episodes:</strong> {anime.episodes || "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong> {anime.status || "N/A"}
                    </p>
                    <p className="genres">
                      <strong>Genres:</strong> {anime.genres?.join(", ") || "N/A"}
                    </p>

                    <div className='content'>
                      <span className="cta" href="#">
                        <span className='watch'>Watch Now</span>
                        <span>
                          <svg
                            width="20px"
                            height="15px"
                            viewBox="0 0 66 43"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <path
                                className="one"
                                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                className="two"
                                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                className="three"
                                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                fill="#FFFFFF"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  <i class="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button onClick={handleNextPage} disabled={!hasNextPage}>
                  Next <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ) : (
            <p className="load">No anime found.</p>
          )}
        </div>
      )}

    </div>
    </div>
    </>
  );
};

export default AnimeFetcher;
