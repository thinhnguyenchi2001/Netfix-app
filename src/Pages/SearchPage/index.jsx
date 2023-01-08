import { useEffect, useState } from "react";
import { Item } from "../../Components/Item";
import { fetchMovieBySearch } from "../../API";
import { useParams } from "react-router-dom";
import "./searchpage.scss";
import Navbar from "../../Components/Navbar";
import Featured from "../../Components/Featured";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const SearchPage = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const input = params.input;
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
      const data = await fetchMovieBySearch(input, page);
      setData((pre) => [...pre, ...data]);
    };
    fetchAPI();
  }, [page]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchMovieBySearch(input, 1);
      setData([...data]);
    };
    fetchAPI();
  }, [input]);

  const fetchData = () => {
    setTimeout(() => setPage(page + 1), 2500);
  };

  return (
    <div className="search-page">
      <Navbar />
      {/* <Featured type={type} category={false} /> */}

      <div className="row">
        <div className="searchpage-title">
          <Link to="/">Search</Link> {">"} {input}
        </div>
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
                {skeletonList.map((e, index) => (
                  <Box
                    key={index + "search-page"}
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
          {data?.length > 0 ? (
            <div className="list-search">
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
