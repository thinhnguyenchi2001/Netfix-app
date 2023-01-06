import ReactPlayer from "react-player";

export default function Video({ keyVideo }) {
  console.log(keyVideo);
  return (
    <ReactPlayer
      className="container-fluid"
      url={"https://www.youtube.com/watch?v=" + `${keyVideo}`}
      playing="true"
      width="100%"
      height="140px"
    ></ReactPlayer>
  );
}
