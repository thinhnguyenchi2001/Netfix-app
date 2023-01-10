import axios from "axios";

axios.defaults.timeout = 1000;
const apiKey = "85b8f8fbb0481197657035bf84174e27";
const url = "https://api.themoviedb.org/3";
const nowMoviesPlayingUrl = `${url}/movie/now_playing`;
const nowTvsPlayingUrl = `${url}/tv/airing_today`;
const topratedMovieUrl = `${url}/movie/top_rated`;
const topratedTvUrl = `${url}/tv/top_rated`;
const movieUrl = `${url}/movie`;
const tvUrl = `${url}/tv`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const tvsUrl = `${url}/discover/tv`;
const personUrl = `${url}/trending/person/week`;
const tvPopularUrl = `${url}/tv/popular`;
const moviePopularUrl = `${url}/movie/popular`;
const trendingMovieUrl = `${url}/trending/movie/week`;
const trendingTvUrl = `${url}/trending/tv/week`;

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(trendingMovieUrl, {
      params: {
        api_key: apiKey,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
      type: "movie",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchTrendingTVs = async () => {
  try {
    const { data } = await axios.get(trendingTvUrl, {
      params: {
        api_key: apiKey,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["first_air_date"],
      type: "tv",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchTVsPopular = async (page) => {
  try {
    const { data } = await axios.get(tvPopularUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["first_air_date"],
      type: "tv",
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchMoviesPopular = async (page) => {
  try {
    const { data } = await axios.get(moviePopularUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
      type: "movie",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchMoviesNowPlaying = async (page) => {
  try {
    const { data } = await axios.get(nowMoviesPlayingUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
      type: "movie",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchTvsNowPlaying = async (page) => {
  try {
    const { data } = await axios.get(nowTvsPlayingUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["first_air_date"],
      type: "tv",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchGenre = async (page) => {
  try {
    const { data } = await axios.get(genreUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });
    const modifiedData = data["genres"].map((g) => ({
      id: g["id"],
      name: g["name"],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchMovieByGenre = async (genre_id, page) => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
        with_genres: genre_id,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
      type: "movie",
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchTVByGenre = async (genre_id, page) => {
  try {
    const { data } = await axios.get(tvsUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
        with_genres: genre_id,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
      type: "tv",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchMovieBySearch = async (input, page) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/multi",
      {
        params: {
          api_key: apiKey,
          language: "en_US",
          page: page,
          query: input,
          include_adult: false,
        },
      }
    );
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"] || m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"] || m["first_air_date"],
      type: m["media_type"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchPersons = async () => {
  try {
    const { data } = await axios.get(personUrl, {
      params: {
        api_key: apiKey,
      },
    });
    const modifiedData = data["results"].map((p) => ({
      id: p["id"],
      popularity: p["popularity"],
      name: p["name"],
      profileImg: "https://image.tmdb.org/t/p/w200" + p["profile_path"],
      known: p["known_for_department"],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchTopratedMovie = async (page) => {
  try {
    const { data } = await axios.get(topratedMovieUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
      type: "movie",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchTopratedTv = async (page) => {
  try {
    const { data } = await axios.get(topratedTvUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["first_air_date"],
      type: "tv",
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    return data;
  } catch (error) {}
};

export const fetchTVDetail = async (id) => {
  try {
    const { data } = await axios.get(`${tvUrl}/${id}`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    return data;
  } catch (error) {}
};

export const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return data["results"][data["results"].length - 1];
  } catch (error) {}
};

export const fetchTvVideos = async (id) => {
  try {
    const { data } = await axios.get(`${tvUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return data["results"][data["results"].length - 1];
  } catch (error) {}
};

export const fetchMovielist = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        params: {
          api_key: apiKey,
          language: "en-US",
        },
      }
    );
    return data["genres"];
  } catch (error) {}
};

export const fetchTVlist = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list`,
      {
        params: {
          api_key: apiKey,
          language: "en-US",
        },
      }
    );
    return data["genres"];
  } catch (error) {}
};

export const fetchCastsMovie = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    const modifiedData = data["cast"].map((c) => ({
      id: c["cast_id"],
      character: c["character"],
      name: c["name"],
      img: "https://image.tmdb.org/t/p/w200" + c["profile_path"],
      media: c["media"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchCastsTV = async (id) => {
  try {
    const { data } = await axios.get(`${tvUrl}/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    const modifiedData = data["cast"].map((c) => ({
      id: c["cast_id"],
      character: c["character"],
      name: c["name"],
      img: "https://image.tmdb.org/t/p/w200" + c["profile_path"],
      media: c["media"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchSimilarMovie = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchSimilarTV = async (id) => {
  try {
    const { data } = await axios.get(`${tvUrl}/${id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchRecommendationsMovie = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/recommendations`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchRecommendationsTV = async (id) => {
  try {
    const { data } = await axios.get(`${tvUrl}/${id}/recommendations`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      date: m["release_date"],
    }));

    return modifiedData;
  } catch (error) {}
};
