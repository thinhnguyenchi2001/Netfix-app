import { useEffect, useState } from "react";
import { Item } from "../../Components/Item";
import { fetchMovieByGenre, fetchMovielist, fetchTVlist } from "../../API";
import { useParams } from "react-router-dom";
import "./genres.scss";
import Navbar from "../../Components/Navbar";
import Featured from "../../Components/Featured";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const Genres = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const genreId = params.id;
  const type = params.type;
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);

  const [skeletonList, setSkeletonList] = useState([]);

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
  });

  useEffect(() => {
    window.addEventListener("resize", changeSkeleton);
    return () => window.removeEventListener("resize", changeSkeleton);
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchMovieByGenre(genreId, page);
      setData((pre) => [...pre, ...data]);
    };
    fetchAPI();
  }, [page]);

  const fetchData = () => {
    setTimeout(() => setPage(page + 1), 2500);
  };

  useEffect(() => {
    if (type === "movie") {
      const fetchAPI = async () => {
        setGenres(await fetchMovielist());
      };
      fetchAPI();
    } else if (type === "tv") {
      const fetchAPI = async () => {
        setGenres(await fetchTVlist());
      };
      fetchAPI();
    }
  }, []);

  return (
    <div className="genres-page">
      <Navbar />
      {data.length > 0 && (
        <Featured genreId={genreId} type={type} category={false} />
      )}

      <div className="row">
        {/* <div className="genre-title">
          {" "}
          <Link to={type === "movie" ? `/movies` : "/tvs"}>
            {type === "movie" ? "Movies" : "TV Shows"} {">"}
          </Link>{" "}
          {genres?.find((element) => element.id == genreId)?.name}
        </div> */}

        <InfiniteScroll
          style={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: "4rem",
            overflow: "unset",
          }}
          dataLength={data.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={
            data.length > 0 && (
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
                    key={index + "genre-page"}
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
          {data.length > 0 ? (
            <div className="list-genres">
              {data?.map((e) => (
                <div className="genre-item" key={e.id}>
                  <Item data={e} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data" style={{ backgroundColor: "black" }}>
              No data
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
