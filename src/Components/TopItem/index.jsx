import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { fetchMovieVideos, fetchTvVideos } from "../../API";
import ScrollDialog from "../Dialog";
import { httpClient } from "../../httpClient";
import { useSelector } from "react-redux";

import "./topitem.scss";
export const TopItem = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoTvData, setVideoTvData] = useState([]);
  const [videoMovieData, setVideoMovieData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const sessionId = useSelector((state) => state.app.session_id);
  const [accountStates, setAccountStates] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetAccountStates = () => {
    if (data.type === "tv") {
      httpClient
        .get(`/tv/${data.id}/account_states`, {
          params: {
            session_id: sessionId,
          },
        })
        .then((response) => setAccountStates(response.data));
    }

    if (data.type === "movie") {
      httpClient
        .get(`/movie/${data.id}/account_states`, {
          params: {
            session_id: sessionId,
          },
        })
        .then((response) => setAccountStates(response.data));
    }
  };

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
    sessionId && GetAccountStates();
  }, [isHovered, loading]);

  return (
    <div
      className="item-trending"
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
        <img className="card-img" src={data?.poster} alt="" />
        {/* <p>{data.title}</p> */}
        <div className="rank">
          <img
            src={`https://top10.netflix.com/images/big_numbers/${
              index + 1
            }.png`}
            alt=""
          />
        </div>
      </div>
      {isHovered && (
        <div className="trailer">
          {videoTvData?.key || videoMovieData?.key ? (
            <ReactPlayer
              loop={true}
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
            loading={loading}
            setLoading={setLoading}
            accountStates={accountStates}
            data={data}
            videoMovieData={videoMovieData}
            videoTvData={videoTvData}
          />
        </div>
      )}
    </div>
  );
};
