import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";
import { db, app } from "./firebase"; // Ensure correct path to Firebase setup file
import "./App.css";

function App() {
  const slides = [
    {
      image: "tanjiro.png",
      title: "Tanjiro Kamado",
      description: "A kind-hearted boy who became a demon slayer to save his sister and avenge his family.",
      funFact: "Tanjiro has an exceptional sense of smell, allowing him to detect demons and sense emotions.",
      role: "Main Protagonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "Zenitsu.png",
      title: "Zenitsu Agatsuma",
      description: "A cowardly demon slayer with incredible lightning-fast abilities.",
      funFact: "Zenitsu can only use one form of Thunder Breathing, but he has mastered it to perfection.",
      role: "Support Character",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "nezuko.png",
      title: "Nezuko Kamado",
      description: "Tanjiro's sister who transformed into a demon but retains her humanity.",
      funFact: "Nezuko can shrink and grow in size, making her a versatile fighter.",
      role: "Deuteragonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "inosuke.png",
      title: "Inosuke Hashibira",
      description: "A wild and headstrong demon slayer who wears a boar mask.",
      funFact: "Inosuke was raised by boars, which explains his wild and animalistic behavior.",
      role: "Comic Relief / Fighter",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "group.png",
      title: "The Team",
      description: "The team of demon slayers working together to defeat evil.",
      funFact: "Despite their differences, the team shares a strong bond built on trust and loyalty.",
      role: "Team Unity",
      genres: ["Action, ", "Adventure"]
    }
  ]

  const head = [
    {
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6e5f72102808543.5fed3c28a58f1.png",
    },
    {
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/175e71102113513.615599d6ececa.jpg",
    },
    {
      image: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/171996434/original/7d1910b22e8d48f0a5943720de36edfe192a9561/do-unique-looking-anime-and-manga-header.png",
    },
    {
      image: "https://i.ytimg.com/vi/rCUMGGstZH8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBdOUYVCwE-iUprhNVEiEI2CDkbjA",
    },
    {
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/348748105464265.6246a95fbd546.png",
    },
    {
      image: "https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1f25ruruaasbttn1sc2nqfdr610.png",
    },
    {
      image: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/281937653/original/62b1e25649708fe297eb4a6473a9cf75f3bc9fc2/an-amazing-anime-header-or-banner-for-you.png",
    },
    {
      image: "https://i.pinimg.com/originals/9c/a2/16/9ca216e583387233da57628917f090cf.jpg",
    }
  ];

  const cardContainerRef = useRef(null);
  const [lastIndexSlides, setLastIndexSlides] = useState(0); // Track last visited slideshow index
  const [currentIndexSlides, setCurrentIndexSlides] = useState(lastIndexSlides); // Use lastIndexSlides to restore the slide
  const [currentIndexHead, setCurrentIndexHead] = useState(0);

  // State to store movies data
  const [movies, setMovies] = useState([]);

  // Fetch movies data from Firestore
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const db = getFirestore(app); // Get Firestore instance
        const moviesCollection = collection(db, "movies"); // Reference to the 'movies' collection
        const movieSnapshot = await getDocs(moviesCollection); // Get the documents from the collection
        const movieList = movieSnapshot.docs.map(doc => doc.data()); // Map docs to data
        setMovies(movieList); // Set movies data to state
      } catch (error) {
        console.error("Error fetching movies data:", error);
      }
    };

    fetchMovies(); // Call the function to fetch movies
  }, []); // Empty dependency array to run only on component mount

  // First slideshow for `slides` (showing 5 images)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexSlides((prevIndex) => (prevIndex + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Second slideshow for `head` (showing 3 images)
  useEffect(() => {
    const intervalHead = setInterval(() => {
      setCurrentIndexHead((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);

    return () => clearInterval(intervalHead);
  }, []);


  return (
    <div className="App">
      <nav>
        <ul>
          <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="Logo" />
            SubAnime
          </div>
          <li className="custom-btn btn-5">
            <span>Home</span>
          </li>
          <li className="custom-btn btn-5">
            <span>Contact</span>
          </li>
          <li className="custom-btn btn-5">
            <span>Product</span>
          </li>
          <li className="custom-btn btn-5">
            <span>About</span>
          </li>
        </ul>
      </nav>

      {/* First Slideshow - Slides */}
      <div className="slideshow">
        <div className="text-container">
          {slides.slice(0, 5).map((slide, index) => (
            <div
              key={index}
              className={`text ${currentIndexSlides === index ? "active" : "inactive"}`}
            >
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <p><strong>Fun Fact:</strong> {slide.funFact}</p>
              <p><strong>Role:</strong> {slide.role}</p>
              <p><strong>Genres:</strong> {slide.genres}</p>
              <button className="custom-btn btn-12">
                <span>Click!</span>
                <span>Read More</span>
              </button>
            </div>
          ))}
        </div>
        <div className="back-image-container">
          {slides.slice(0, 5).map((slide, index) => (
            <img
              key={index}
              src={process.env.PUBLIC_URL + "/" + slide.image}
              alt={`Slide ${index + 1}`}
              className={currentIndexSlides === index ? "active" : "inactive"}
            />
          ))}
        </div>
      </div>

      {/* Second Slideshow - Top Airing (Head images) */}
      <div className="top" ref={cardContainerRef}>
        <div className="head">
          {head.slice(0, 8).map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Head Slide ${index + 1}`}
              className={currentIndexHead === index ? "active" : "inactive"}
              style={{
                opacity: currentIndexHead === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }}
            />
          ))}
        </div>
      </div>

      <div className="movies-section">
        <h1>Movies</h1>
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={index} className="movie-card">
                <img src={movie.image} alt={movie.title} />
                <h3>{movie.title}</h3>

                {/* Description and other details */}
                <div className="description">
                  <h2>{movie.title}</h2>
                  <p className="card-rating">⭐ 9.0</p>
                  <p><span>Description:</span> {movie.description}</p>
                  <p><span>Fun Fact:</span> {movie.funFact}</p>
                  <p><span>Role:</span> {movie.role}</p>
                  <p><span>Genres:</span> {movie.genres.join(', ')}</p>

                  <div className='content'>
                    <span className="cta" href="#">
                      <span>More Details</span>
                      <span>
                        <svg
                          width="30px"
                          height="20px"
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
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </div>
      </div>


      <footer className="footer">
        <div className="footer-container">
          {/* Anime Categories */}
          <h1>Top Anime List</h1>
          <div className="anime-categories-row">
            <div className="category">
              <h4>Shonen</h4>
              <div>1. Attack on Titan</div>
              <div>2. Naruto</div>
              <div>3. One Piece</div>
              <div>4. Demon Slayer</div>
              <div>5. My Hero Academia</div>
            </div>
            <div className="category">
              <h4>Seinen</h4>
              <div>1. Vinland Saga</div>
              <div>2. Tokyo Revengers</div>
              <div>3. Cowboy Bebop</div>
              <div>4. Berserk</div>
              <div>5. Monster</div>
            </div>
            <div className="category">
              <h4>Fantasy</h4>
              <div>1. Sword Art Online</div>
              <div>2. Black Clover</div>
              <div>3. Re:Zero</div>
              <div>4. Fairy Tail</div>
              <div>5. Dr. Stone</div>
            </div>
            <div className="category">
              <h4>Classic</h4>
              <div>1. Death Note</div>
              <div>2. Fullmetal Alchemist</div>
              <div>3. Hunter x Hunter</div>
              <div>4. Code Geass</div>
              <div>5. Bleach</div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="footer-sections-row">
            {/* Top Websites */}
            <div className="footer-section">
              <h3>Top Websites</h3>
              <div><a href="https://www.crunchyroll.com" target="_blank" rel="noreferrer">Crunchyroll</a></div>
              <div><a href="https://www.funimation.com" target="_blank" rel="noreferrer">Funimation</a></div>
              <div><a href="https://www.netflix.com" target="_blank" rel="noreferrer">Netflix</a></div>
              <div><a href="https://www.hulu.com" target="_blank" rel="noreferrer">Hulu</a></div>
              <div><a href="https://www.amazon.com/prime-video" target="_blank" rel="noreferrer">Prime Video</a></div>
            </div>

            {/* Contact Information */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: support@subanime.com</p>
              <p>Phone: +1-234-567-890</p>
              <p>Address: 123 Anime St, Tokyo, Japan</p>
            </div>

            {/* Social Media Links */}
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-media-icons">
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1000px-Instagram_logo_2022.svg.png" alt="Instagram" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" />
                </a>
                <a href="https://www.Reddit.com" target="_blank" rel="noreferrer">
                  <img src="https://as1.ftcdn.net/jpg/03/16/75/24/1000_F_316752482_SmCu3yMoMV7rMensP4IWCIx3FRrjNKvg.jpg" alt="Reddit" />
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="footer-section">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for the latest anime updates and news.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="quick-links">
              <a href="/about">About Us</a> |
              <a href="/privacy-policy">Privacy Policy</a> |
              <a href="/terms">Terms of Service</a> |
              <a href="/feedback">Feedback</a>
            </div>
            <p>&copy; {new Date().getFullYear()} SubAnime. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};


export default App;