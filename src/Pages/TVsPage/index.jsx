import Featured from "../../Components/Featured";
import Navbar from "../../Components/Navbar";
import TopList from "../../Components/TopList";
import { useEffect, useState } from "react";
import { fetchTvsNowPlaying } from "../../API";
import { Item } from "../../Components/Item";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

import "./tvs_page.scss";
export const TVsPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchTvsNowPlaying(page);
      setData((pre) => [...pre, ...data]);
    };
    fetchAPI();
  }, [page]);

  const fetchData = () => {
    setTimeout(() => setPage(page + 1), 2500);
  };
  return (
    <div className="tvs-page">
      <Navbar />
      <Featured type="tv" category={true} />
      <TopList type="tv" />
      <div className="row">
        <div className="list-title">TV Shows</div>
        <div className="list-tvs">
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
            {data?.map((e) => (
              <div className="tv-item" key={e.id}>
                <Item data={e} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
