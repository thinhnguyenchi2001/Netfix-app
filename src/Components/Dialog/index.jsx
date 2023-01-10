import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./dialog.scss";
import Tooltip from "@mui/material/Tooltip";
import ReactPlayer from "react-player/lazy";
import { useEffect, useState } from "react";
import {
  fetchCastsMovie,
  fetchMovieDetail,
  fetchSimilarMovie,
  fetchRecommendationsMovie,
  fetchCastsTV,
  fetchTVDetail,
  fetchSimilarTV,
  fetchRecommendationsTV,
} from "../../API";
import { httpClient } from "../../httpClient";
import { useSelector } from "react-redux";

export default function ScrollDialog({ data, videoMovieData, videoTvData }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [casts, setCasts] = useState([]);
  const [detail, setDetail] = useState(null);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [recomMovie, setRecomMovie] = useState([]);
  const [accountStates, setAccountStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.app.user);
  const sessionId = useSelector((state) => state.app.session_id);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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

  const MaskFavorite = () => {
    httpClient
      .post(
        `/account/${user?.id}/favorite`,
        {
          media_type: data?.type,
          media_id: data?.id,
          favorite: !accountStates?.favorite,
        },
        {
          params: {
            session_id: sessionId,
          },
        }
      )
      .then(() => setLoading(!loading));
  };

  const MaskWatchList = () => {
    httpClient
      .post(
        `/account/${user?.id}/watchlist`,
        {
          media_type: data?.type,
          media_id: data?.id,
          watchlist: !accountStates?.watchlist,
        },
        {
          params: {
            session_id: sessionId,
          },
        }
      )
      .then(() => setLoading(!loading));
  };

  useEffect(() => {
    if (data.type === "movie") {
      const fetchAPIMovie = async () => {
        setCasts(await fetchCastsMovie(data.id));
        setDetail(await fetchMovieDetail(data.id));
        setSimilarMovie(await fetchSimilarMovie(data.id));
        setRecomMovie(await fetchRecommendationsMovie(data.id));
      };

      fetchAPIMovie();
    } else {
      const fetchAPIMovie = async () => {
        setCasts(await fetchCastsTV(data.id));
        setDetail(await fetchTVDetail(data.id));
        setSimilarMovie(await fetchSimilarTV(data.id));
        setRecomMovie(await fetchRecommendationsTV(data.id));
      };

      fetchAPIMovie();
    }

    GetAccountStates();
  }, [loading]);

  return (
    <div>
      <div className="card-item" onClick={handleClickOpen("body")}>
        <div className="group-icon-video">
          <div style={{ fontSize: "1.4rem" }} className="group-icon-support">
            <div>
              <i className="fa-regular fa-circle-play"></i>
            </div>
            <Tooltip title={user ? "" : "Login to add list"} arrow>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  MaskWatchList();
                }}
              >
                {accountStates?.watchlist ? (
                  <i class="fa-solid fa-square-plus"></i>
                ) : (
                  <i className="fa-regular fa-square-plus"></i>
                )}
              </div>
            </Tooltip>
            <Tooltip title={user ? "" : "Login to favorite"} arrow>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  MaskFavorite();
                }}
              >
                {accountStates?.favorite ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )}
              </div>
            </Tooltip>
          </div>
          <div style={{ fontSize: "1.4rem" }} className="more-icon">
            <i className="fa-solid fa-circle-chevron-down"></i>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="rate">
            Score: <span>{data?.rating || "No rating"}</span>
          </div>
          <div className="time">{data?.date || "No date"}</div>
        </div>
        <p
          className="overview"
          style={{ fontSize: "0.8rem", textAlign: "left" }}
        >
          {data?.overview ||
            "We don't have an overview translated in English. Help us expand our database by adding one."}
        </p>
        <ul className="tag">
          {detail?.genres.map((genre) => (
            <span key={genre.id}>{genre.name} </span>
          ))}
        </ul>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent
          style={{
            backgroundColor: "black",
          }}
          dividers={scroll === "paper"}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className="dialog-card">
              <ReactPlayer
                playing={true}
                width="100%"
                height="20rem"
                url={`https://www.youtube.com/watch?v=${
                  videoTvData?.key || videoMovieData?.key
                }`}
                muted={true}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { origin: "https://www.youtube.com" },
                  },
                }}
              />
              <div className="title-card">{data.title}</div>
              <div className="group-icon-video">
                <div className="group-icon-support">
                  <div>
                    <i className="fa-regular fa-circle-play"></i>
                  </div>
                  <Tooltip title={user ? "" : "Login to add list"} arrow>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        MaskWatchList();
                      }}
                    >
                      {accountStates?.watchlist ? (
                        <i class="fa-solid fa-square-plus"></i>
                      ) : (
                        <i className="fa-regular fa-square-plus"></i>
                      )}
                    </div>
                  </Tooltip>
                  <Tooltip title={user ? "" : "Login to favorite"} arrow>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        MaskFavorite();
                      }}
                    >
                      {accountStates?.favorite ? (
                        <i className="fa-solid fa-thumbs-up"></i>
                      ) : (
                        <i className="fa-regular fa-thumbs-up"></i>
                      )}
                    </div>
                  </Tooltip>
                </div>
                <div className="more-icon">
                  <i className="fa-solid fa-circle-chevron-down"></i>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="rate">
                  Score: <span>{data?.rating || "No rating"}</span>
                </div>
                <div className="time">{data?.date || "No date"}</div>
              </div>

              <div className="card-info">
                <p style={{ fontSize: "1rem", textAlign: "left" }}>
                  {data?.overview ||
                    "We don't have an overview translated in English. Help us expand our database by adding one."}
                </p>
                <div className="card-info-right">
                  <div className="card-cast">
                    Cast:{" "}
                    {casts?.slice(0, 5).map((cast, index) => (
                      <span key={index + "cast"}>{cast.name}, </span>
                    ))}
                  </div>
                  <div className="card-genres">
                    Genres:{" "}
                    {detail?.genres.map((genre, index) => (
                      <span key={index + "genre"}>{genre.name}, </span>
                    ))}
                  </div>
                  <div className="card-companies">
                    Production Companies:{" "}
                    {detail?.production_companies.map((company, index) => (
                      <span key={index + "company"}>{company.name}, </span>
                    ))}
                  </div>
                </div>
              </div>
              {similarMovie?.length > 0 && (
                <div className="similar-list-title">More Like This</div>
              )}
              <div className="similar-list">
                {similarMovie?.slice(0, 6).map((e, index) => (
                  <div key={index + "similarMovie"} className="similar-item">
                    <div className="similar-item-img">
                      <img src={e.backPoster} alt="" />
                    </div>
                    <div className="similar-item-title">{e.title}</div>
                  </div>
                ))}
              </div>
              {recomMovie?.length > 0 && (
                <div className="similar-list-title">Recommendations</div>
              )}
              <div className="similar-list">
                {recomMovie?.slice(0, 6).map((e, index) => (
                  <div key={index + "recomMovie"} className="similar-item">
                    <div className="similar-item-img">
                      <img src={e.backPoster} alt="" />
                    </div>
                    <div className="similar-item-title">{e.title}</div>
                  </div>
                ))}
              </div>
              <div className="about-list-title">About {data.title}</div>
              <div className="card-cast">
                Cast:{" "}
                {casts?.map((cast, index) => (
                  <span key={index + "cast"}>{cast.name}, </span>
                ))}
              </div>
              <div className="card-genres">
                Genres:{" "}
                {detail?.genres.map((genre, index) => (
                  <span key={index + "genre"}>{genre.name}, </span>
                ))}
              </div>
              <div className="card-companies">
                Production Companies:{" "}
                {detail?.production_companies.map((company, index) => (
                  <span key={index + "company"}>{company.name}, </span>
                ))}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
