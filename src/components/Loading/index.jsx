import ReactLoading from "react-loading";

import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <ReactLoading type="bubbles" color="#fff" width="100px" />
        <span>Loading, sabar ya.</span>
      </div>
    </>
  );
};

export default Loading;
