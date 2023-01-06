import Featured from "../../Components/Featured";
import Navbar from "../../Components/Navbar";
import TopList from "../../Components/TopList";
import { ListItems } from "../../Components/ListItems";
import "./home.scss";

export const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Featured type="movie" category={false} />
      <TopList type="movie" />
      <ListItems title="Trending Now" type="movies-trending" />
      <ListItems title="Top Rated Moives" type="movies-rated" />
      <ListItems title="Top Popular Moives" type="movies-popular" />

      <TopList type="tv" />
      <ListItems title="TV Comdies" type="tvs-trending" />
      <ListItems title="Top Rated TV Shows" type="tvs-rated" />
      <ListItems title="Top Popular TV Shows" type="tvs-popular" />
    </div>
  );
};
