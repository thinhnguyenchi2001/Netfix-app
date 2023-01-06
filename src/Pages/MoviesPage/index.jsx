import Featured from "../../Components/Featured";
import Navbar from "../../Components/Navbar";
import TopList from "../../Components/TopList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { fetchMoviesNowPlaying } from "../../API";
import { Item } from "../../Components/Item";
import "./movies_page.scss";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const MoviesPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchMoviesNowPlaying(page);
      setData((pre) => [...pre, ...data]);
    };
    fetchAPI();
  }, [page]);

  const fetchData = () => {
    setTimeout(() => setPage(page + 1), 2500);
  };

  return (
    <div className="movies-page">
      <Navbar />
      <Featured type="movie" category={true} />
      <TopList type="movie" />
      <div className="row">
        <div className="list-title">Movies</div>
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
            dataLength={data.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={
              data.length >= 20 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    columnGap: "0.4rem",
                    marginBottom: "3rem",
                  }}
                >
                  <Box style={{ flex: 1, borderRadius: "4px" }}>
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
                  <Box style={{ flex: 1, borderRadius: "4px" }}>
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
                  <Box style={{ flex: 1, borderRadius: "4px" }}>
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
                  <Box style={{ flex: 1, borderRadius: "4px" }}>
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

                  <Box style={{ flex: 1, borderRadius: "4px" }}>
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
