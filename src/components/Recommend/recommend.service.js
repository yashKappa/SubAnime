// ===============================
// Build user preference profile
// ===============================
const buildUserProfile = (watchlist) => {
  const genreMap = {};

  watchlist.forEach((anime) => {
    if (!anime?.genres) return;

    anime.genres.forEach((genre) => {
      genreMap[genre] = (genreMap[genre] || 0) + 1;
    });
  });

  const topGenres = Object.entries(genreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);

  return { topGenres };
};

// ===============================
// Fetch recommendations from AniList
// ===============================
export const fetchRecommendations = async (watchlist) => {
  if (!watchlist || watchlist.length === 0) return [];

  const profile = buildUserProfile(watchlist);
  const watchedIds = watchlist.map((a) => a.id);

  // 🔥 GraphQL Query
  const query = `
    query ($genres: [String]) {
      Page(perPage: 15) {
        media(
          type: ANIME
          genre_in: $genres
          sort: POPULARITY_DESC
        ) {
          id
          title {
            romaji
            native
          }
          description(asHtml: false)
          averageScore
          episodes
          status
          startDate {
            year
            month
            day
          }
          genres
          coverImage {
            large
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          genres: profile.topGenres.length
            ? profile.topGenres
            : undefined,
        },
      }),
    });

    const json = await res.json();

    if (!json?.data?.Page?.media) return [];

    // ===============================
    // Normalize for Recommend.js & Add.js
    // ===============================
    return json.data.Page.media
      .filter((anime) => !watchedIds.includes(anime.id))
      .map((anime) => ({
        id: anime.id,

        // 🔥 Flattened fields (UI usage)
        title: anime.title?.romaji || "Unknown Title",
        japaneseTitle: anime.title?.native || "",
        image: anime.coverImage?.large || "",

        synopsis: anime.description || "",
        score: anime.averageScore ?? "N/A",
        episodes: anime.episodes ?? "?",
        status: anime.status || "UNKNOWN",

        aired: anime.startDate?.year
          ? `${anime.startDate.year}-${anime.startDate.month || "??"}-${
              anime.startDate.day || "??"
            }`
          : "Unknown",

        genres: anime.genres || [],

        // 🔥 AniList-compatible fields (Add.js usage)
        coverImage: {
          large: anime.coverImage?.large || "",
        },

        titleObj: {
          romaji: anime.title?.romaji || "Unknown Title",
          native: anime.title?.native || "",
        },
      }));
  } catch (error) {
    console.error("AniList recommendation error:", error);
    return [];
  }
};
