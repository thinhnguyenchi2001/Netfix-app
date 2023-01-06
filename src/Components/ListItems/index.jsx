import { useState, useEffect } from "react";
import {
  fetchTrendingTVs,
  fetchTrendingMovies,
  fetchTVsPopular,
  fetchMoviesPopular,
  fetchTopratedTv,
  fetchTopratedMovie,
  fetchTvsNowPlaying,
  fetchMoviesNowPlaying,
} from "../../API";
import "./listItems.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Item } from "../Item";
export const ListItems = ({ type, title }) => {
  const [data, setData] = useState([]);

  const [slider, setSlider] = useState(null);

  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (type === "movies-trending") {
      const fetchAPI = async () => {
        setData(await fetchMoviesNowPlaying());
      };
      fetchAPI();
    } else if (type === "tvs-trending") {
      const fetchAPI = async () => {
        setData(await fetchTvsNowPlaying());
      };
      fetchAPI();
    } else if (type === "tvs-popular") {
      const fetchAPI = async () => {
        setData(await fetchTVsPopular());
      };
      fetchAPI();
    } else if (type === "movies-popular") {
      const fetchAPI = async () => {
        setData(await fetchMoviesPopular());
      };
      fetchAPI();
    } else if (type === "tvs-rated") {
      const fetchAPI = async () => {
        setData(await fetchTopratedTv());
      };
      fetchAPI();
    } else if (type === "movies-rated") {
      const fetchAPI = async () => {
        setData(await fetchTopratedMovie());
      };
      fetchAPI();
    }
  }, []);
  return (
    <div className="row">
      <div className="list-title">{title}</div>
      <div className="list-items">
        <Slider ref={(e) => setSlider(e)} {...settings}>
          {data?.slice(0, 20).map((e) => (
            <div key={e.id}>
              <Item data={e} />
            </div>
          ))}
        </Slider>
        <div className="arrows" style={{ textAlign: "center" }}>
          <button className="button-pre" onClick={previous}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="button-next" onClick={next}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
