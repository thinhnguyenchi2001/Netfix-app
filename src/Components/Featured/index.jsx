import "./featured.scss";
import {
  fetchTrendingMovies,
  fetchTrendingTVs,
  fetchMovielist,
  fetchTVlist,
} from "../../API";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Featured({ type, category, genreId }) {
  const [trendingData, setTrendingData] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "movie") {
      const fetchAPI = async () => {
        setTrendingData(await fetchTrendingMovies());
        setGenres(await fetchMovielist());
      };
      fetchAPI();
    } else if (type === "tv") {
      const fetchAPI = async () => {
        setTrendingData(await fetchTrendingTVs());
        setGenres(await fetchTVlist());
      };
      fetchAPI();
    }
  }, []);

  const SelectGenres = (e) => {
    navigate(`/genres/${type}/${e.currentTarget.value}`);
  };

  return (
    <div className="featured">
      {category && (
        <div className="category">
          <span> {type === "movie" ? "Movies" : "TV Shows"}</span>
          <select onChange={(e) => SelectGenres(e)} name="genres">
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {genreId && (
        <div className="genre-title">
          {" "}
          <Link to={type === "movie" ? `/movies` : "/tv"}>
            {type === "movie" ? "Movies" : "TV Shows"} {">"}
          </Link>{" "}
          {genres?.find((element) => element.id == genreId)?.name}
        </div>
      )}

      <div className="trending-img">
        {trendingData && <img src={trendingData[0]?.backPoster} alt="" />}
      </div>
      <div className="info">
        {trendingData && <div className="title">{trendingData[0]?.title}</div>}

        <div className="buttons">
          <button className="play">Play</button>
          <button className="more">More Info</button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
