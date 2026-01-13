    import React, { useEffect, useState, useRef } from "react";
    import { auth, db } from "../firebase";
    import { doc, getDoc } from "firebase/firestore";
    import { onAuthStateChanged } from "firebase/auth";
    import { fetchRecommendations } from "./recommend.service";
    import "../Search/fetch.css";
    import "../responsive.css";
    import AddToWatchlist from "../Search/Add";

    const Recommend = () => {
      const [recommendations, setRecommendations] = useState([]);
      const [loading, setLoading] = useState(true);
      const gotiRef = useRef(null);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            setRecommendations([]);
            setLoading(false);
            return;
          }

          try {
            const ref = doc(db, "Anime", user.uid);
            const snap = await getDoc(ref);

            if (!snap.exists()) {
              setRecommendations([]);
              return;
            }

            const watchlist = snap.data().watchlist || [];
            if (watchlist.length === 0) {
              setRecommendations([]);
              return;
            }

            const data = await fetchRecommendations(watchlist);
            setRecommendations(data);
          } catch (err) {
            console.error("Recommendation error:", err);
          } finally {
            setLoading(false);
          }
        });

        return () => unsubscribe();
      }, []);

      useEffect(() => {
        if (recommendations.length) {
          gotiRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }, [recommendations]);

      return (
        <>
          <div ref={gotiRef}></div>

          <div className="new-upcoming-anime-container watch">
            <div className="top">
              <h1>Recommended For You</h1>
            </div>

            {/* 🔥 SAME LOADING UI */}
            {loading ? (
              <p className="load">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajax_loader_metal_512.gif/250px-Ajax_loader_metal_512.gif"
                  alt="loading"
                />
                Finding anime you’ll love ❤️
              </p>
            ) : recommendations.length === 0 ? (
              <p className="load">
                No recommendations yet 🤔  
                <br />
                Add anime to your Watchlist!
              </p>
            ) : (
              <div className="new-anime-grid">
                {recommendations.map((anime) => (
                  <div key={anime.id} className="new-anime-card">
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

      <p><strong>Score:</strong> {anime.score || "N/A"}</p>

      <p>
        <strong>Synopsis:</strong>{" "}
        {anime.synopsis
          ? anime.synopsis.slice(0, 180) + "..."
          : "No synopsis available"}
      </p>
      

      <p><strong>Japanese:</strong> {anime.japaneseTitle}</p>

      <p><strong>Aired:</strong> {anime.aired}</p>

      <p><strong>Episodes:</strong> {anime.episodes || "?"}</p>

      <p><strong>Status:</strong> {anime.status}</p>

      <p>
        <strong>Genres:</strong>{" "}
        {anime.genres?.join(", ")}
      </p>
                        <AddToWatchlist anime={anime} />

    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      );
    };

    export default Recommend;
