import { useState, useEffect } from "react";
import {
  fetchMoviesNowPlaying,
  fetchTvsNowPlaying,
  fetchTrendingMovies,
  fetchTrendingTVs,
} from "../../API";
import "./toplist.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TopItem } from "../TopItem";

export default function TopList({ type }) {
  const [trendingList, setTrendingList] = useState([]);

  const [slider, setSlider] = useState(null);

  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    // slidesToShow: 5,
    // // centerMode: true,
    // slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  useEffect(() => {
    if (type === "movie") {
      const fetchAPI = async () => {
        setTrendingList(await fetchTrendingMovies());
      };
      fetchAPI();
    }
    if (type === "tv") {
      const fetchAPI = async () => {
        setTrendingList(await fetchTrendingTVs());
      };
      fetchAPI();
    }
  }, []);

  return (
    <>
      <div className="top-list">
        <div className="list-title">
          {type === "movie"
            ? "Top 10 Movies in VietNam Today"
            : "Top 10 TV Shows in VietNam Today"}
        </div>
        <div className="list-trending">
          <Slider ref={(e) => setSlider(e)} {...settings}>
            {trendingList?.slice(0, 10).map((e, index) => (
              <div key={e.id}>
                <TopItem data={e} index={index} />
              </div>
            ))}
          </Slider>
          ;
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
    </>
  );
}
