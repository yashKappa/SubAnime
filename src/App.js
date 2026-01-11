import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import AnimeFetcher from "./components/Search/AnimeFetcher"
import UpcomingAnime from './components/UpComing/UpComing';
import SideShow from './components/SideShow/SideShow';
import AuthModal from "./components/Auth/AuthModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase";

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
  const [lastIndexSlides] = useState(0);
  const [currentIndexSlides, setCurrentIndexSlides] = useState(lastIndexSlides);
  const [currentIndexHead, setCurrentIndexHead] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

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

      <span className='navbar'>
          <li>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `custom-btn btn-5 ${isActive ? "active" : ""}`
        }
      >
        <span>Home</span>
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/Search"
        className={({ isActive }) =>
          `custom-btn btn-5 ${isActive ? "active" : ""}`
        }
      >
        <span>Search</span>
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/UpComing"
        className={({ isActive }) =>
          `custom-btn btn-5 ${isActive ? "active" : ""}`
        }
      >
        <span>Up Coming</span>
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/TopAiring"
        className={({ isActive }) =>
          `custom-btn btn-5 ${isActive ? "active" : ""}`
        }
      >
        <span>TopAiring</span>
      </NavLink>
    </li>
    </span>

    <div className='login'>
<li>
  {user ? (
    <span className="user-info">
      Hello, {user.displayName || user.username}
    </span>
  ) : (
    <button className="custom-btn btn-5" onClick={() => setShowAuth(true)}>
      <span>Login</span>
    </button>
  )}
</li>
</div>
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

      <Routes>
  <Route path="/" element={<AnimeFetcher />} />
  <Route path="/Search" element={<AnimeFetcher />} />
  <Route path="/UpComing" element={<UpcomingAnime />} />
  <Route path="/TopAiring" element={<SideShow />} />
</Routes>
      
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      
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