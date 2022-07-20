import { HeaderMovie, Footer } from "../components";
const LayoutComponent = (props) => {
  return (
    <>
      <HeaderMovie />
      <div style={{ marginTop: "7%" }}>{props.content}</div>
      <Footer />
    </>
  );
};

export default LayoutComponent;
