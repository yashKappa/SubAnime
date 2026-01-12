// Extract preferences from watchlist
const buildUserProfile = (watchlist) => {
  const genreMap = {};

  watchlist.forEach((anime) => {
    anime.genres?.forEach((g) => {
      genreMap[g] = (genreMap[g] || 0) + 1;
    });
  });

  const topGenres = Object.entries(genreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);

  return { topGenres };
};

// Fetch from AniList GraphQL
export const fetchRecommendations = async (watchlist) => {
  const profile = buildUserProfile(watchlist);
  const watchedIds = watchlist.map((a) => a.id);

  const query = `
    query ($genres: [String]) {
      Page(perPage: 15) {
        media(
          type: ANIME,
          genre_in: $genres,
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

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { genres: profile.topGenres },
    }),
  });

  const json = await res.json();

  return json.data.Page.media
    .filter((a) => !watchedIds.includes(a.id))
    .map((a) => ({
      id: a.id,
      title: a.title.romaji,
      japaneseTitle: a.title.native,
      image: a.coverImage.large,
      synopsis: a.description,
      score: a.averageScore,
      episodes: a.episodes,
      status: a.status,
      aired: a.startDate?.year
        ? `${a.startDate.year}-${a.startDate.month}-${a.startDate.day}`
        : "Unknown",
      genres: a.genres,
    }));
};
