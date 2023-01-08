import { useEffect, useState } from "react";
import "./item.scss";
import ReactPlayer from "react-player/lazy";
import { fetchMovieVideos, fetchTvVideos } from "../../API";

import ScrollDialog from "../Dialog";
export const Item = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoTvData, setVideoTvData] = useState([]);
  const [videoMovieData, setVideoMovieData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (data.type === "movie") {
      const fetchAPIMovie = async () => {
        setVideoMovieData(await fetchMovieVideos(data.id));
      };

      fetchAPIMovie();
    } else {
      const fetchAPITv = async () => {
        setVideoTvData(await fetchTvVideos(data.id));
      };
      fetchAPITv();
    }
  }, [isHovered]);

  return (
    <div
      className="listItem"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsPlaying(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPlaying(false);
      }}
    >
      <div className="card">
        {<img className="card-img" src={data.backPoster} alt="" />}
        <p>{data.title}</p>
      </div>
      {isHovered && (
        <div className="trailer">
          {videoTvData?.key || videoMovieData?.key ? (
            <ReactPlayer
              playing={isPlaying}
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${
                videoTvData?.key || videoMovieData?.key
              }`}
              muted={true}
              controls={true}
              config={{
                youtube: { playerVars: { origin: "https://www.youtube.com" } },
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "300px",
                height: "140px",
              }}
            >
              No data
            </div>
          )}

          <ScrollDialog
            data={data}
            videoMovieData={videoMovieData}
            videoTvData={videoTvData}
          />
        </div>
      )}
    </div>
  );
};
