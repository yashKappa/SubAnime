import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import RemoveFromWatchlist from "./remove";
import PopUp from "../PopUp";
import "./WatchList.css";
import "../Search/fetch.css";
import { onAuthStateChanged } from "firebase/auth";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupMsg, setPopupMsg] = useState("");
  const gotiRef = useRef(null);
  
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setWatchlist([]);
      setLoading(false);
      return;
    }

    try {
      const ref = doc(db, "Anime", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setWatchlist(snap.data().watchlist || []);
      } else {
        setWatchlist([]);
      }
    } catch (err) {
      console.error("Error fetching watchlist", err);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

  useEffect(() => {
    if (watchlist.length) {
      gotiRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [watchlist]);

  // 🔥 REMOVE FUNCTION
  const handleRemove = async (animeId) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const ref = doc(db, "Anime", user.uid);

    const updatedList = watchlist.filter(
      (item) => item.id !== animeId
    );

    await updateDoc(ref, { watchlist: updatedList });
    setWatchlist(updatedList);

    // ✅ force popup every time
    setPopupMsg("");
    setTimeout(() => {
      setPopupMsg("Removed from WatchList ❌");
    }, 10);

  } catch (err) {
    console.error("Remove error:", err);
  }
};

const handleMouseEnter = (e) => {
  const tooltip = e.currentTarget.querySelector(".new-anime-tooltip");
  if (tooltip) {
    tooltip.scrollTop = 0; // 🔥 reset scroll on hover
  }
};

  
return (
  <>
    {popupMsg && (
      <PopUp message={popupMsg} onClose={() => setPopupMsg("")} />
    )}

    <div ref={gotiRef}></div>

    <div className="new-upcoming-anime-container watch">
      <div className="top">
        <h1>My WatchList</h1>
      </div>

      {/* 🔥 SAME LOADING STYLE AS UPCOMING */}
      {loading ? (
        <p className="load">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajax_loader_metal_512.gif/250px-Ajax_loader_metal_512.gif"
            alt="loading"
          />
          Loading...
        </p>
      ) : watchlist.length === 0 ? (
        <p className="load">No anime found in your Watchlist 📭</p>
      ) : (
        <>
          <div className="new-anime-grid">
           {watchlist.map((anime) => (
  <div
    key={anime.id}
    className="new-anime-card"
    onMouseEnter={handleMouseEnter}
  >
    <img
      src={anime.image}
      alt={anime.title}
      className="new-anime-poster"
    />

    <h3 className="new-anime-title">
      {anime.title}
    </h3>

    <div className="new-anime-tooltip">
      <h2>{anime.title}</h2>

      <p>
        <strong>Synopsis:</strong>{" "}
        {anime.description || "No synopsis available"}
      </p>

      <p>
        <strong>Synopsis:</strong>{" "}
        {anime.synopsis || "No synopsis available"}
      </p>

      <p>
        <strong>Episodes:</strong>{" "}
        {anime.episodes || "?"}
      </p>

      <p>
        <strong>Genres:</strong>{" "}
        {anime.genres?.slice(0, 3).join(", ")}
      </p>

      <RemoveFromWatchlist
        onRemove={() => handleRemove(anime.id)}
      />
    </div>
  </div>
))}

          </div>
        </>
      )}
    </div>
  </>
);
}

export default WatchList;
