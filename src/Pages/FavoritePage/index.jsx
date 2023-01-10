import Featured from "../../Components/Featured";
import Navbar from "../../Components/Navbar";
import TopList from "../../Components/TopList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { fetchMoviesNowPlaying } from "../../API";
import { Item } from "../../Components/Item";
import "./favorite_page.scss";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { httpClient } from "../../httpClient";

export const FavoritePage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [moviesData, setMoviesData] = useState([]);
  const [tvData, setTVData] = useState([]);
  const sessionId = useSelector((state) => state.app.session_id);
  const user = useSelector((state) => state.app.user);
  const posterUrl = "https://image.tmdb.org/t/p/original/";
  const [skeletonList, setSkeletonList] = useState([]);

  const fetchData = () => {
    setTimeout(() => setPage(page + 1), 2500);
  };

  const getDataFavorite = () => {
    httpClient
      .get(`/account/${user?.id}/favorite/movies`, {
        params: {
          page: page,
          language: "en-US",
          session_id: sessionId,
        },
      })
      .then((response) =>
        setMoviesData(
          response.data.results.map((m) => ({
            id: m["id"],
            backPoster: m["backdrop_path"]
              ? posterUrl + m["backdrop_path"]
              : "",
            popularity: m["popularith"],
            title: m["title"],
            poster: m["poster_path"] ? posterUrl + m["poster_path"] : "",
            overview: m["overview"],
            rating: m["vote_average"],
            date: m["release_date"],
            type: "movie",
          }))
        )
      );

    httpClient
      .get(`/account/${user?.id}/favorite/tv`, {
        params: {
          page: page,
          language: "en-US",
          session_id: sessionId,
        },
      })
      .then((response) =>
        setTVData(
          response.data.results.map((m) => ({
            id: m["id"],
            backPoster: m["backdrop_path"]
              ? posterUrl + m["backdrop_path"]
              : "",
            popularity: m["popularith"],
            title: m["title"],
            poster: m["poster_path"] ? posterUrl + m["poster_path"] : "",
            overview: m["overview"],
            rating: m["vote_average"],
            date: m["release_date"],
            type: "tv",
          }))
        )
      );
  };

  const changeSkeleton = () => {
    if (window.innerWidth <= 992 && window.innerWidth > 768) {
      setSkeletonList(new Array(4).fill());
    } else if (window.innerWidth <= 768 && window.innerWidth > 600) {
      setSkeletonList(new Array(3).fill());
    } else if (window.innerWidth <= 600) {
      setSkeletonList(new Array(2).fill());
    } else {
      setSkeletonList(new Array(5).fill());
    }
  };

  useEffect(() => {
    changeSkeleton();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", changeSkeleton, { passive: true });
    return () => window.removeEventListener("resize", changeSkeleton);
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      getDataFavorite();
      const data = [...tvData, ...moviesData];
      setData((pre) => [...pre, ...data]);
    };
    fetchAPI();
  }, [page]);

  return (
    <div className="movies-page">
      <Navbar />
      <Featured type="movie" category={false} />

      <div className="row">
        <div className="list-title">Favorite list</div>
        <div className="list-movies">
          {/* {data.slice(0, 20).map((e) => (
            <div className="movie-item" key={e.id}>
              <Item data={e} />
            </div>
          ))} */}
          <InfiniteScroll
            style={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: "4rem",
              overflow: "unset",
            }}
            dataLength={data?.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={
              data?.length >= 20 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    columnGap: "0.4rem",
                    marginBottom: "3rem",
                  }}
                >
                  {skeletonList.map((e, index) => (
                    <Box
                      key={index + "movie-page"}
                      style={{ flex: 1, borderRadius: "4px" }}
                    >
                      <Skeleton
                        sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        height={160}
                      />
                      <Skeleton
                        sx={{ bgcolor: "grey.900" }}
                        height={30}
                        width="100%"
                      />
                    </Box>
                  ))}
                </div>
              )
            }
            endMessage={
              <div style={{ color: "white", margin: "1rem auto" }}>
                Yay! You have seen it all
              </div>
            }
          >
            {data?.map((e, index) => (
              <div className="movie-item" key={e.id + index}>
                <Item data={e} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
