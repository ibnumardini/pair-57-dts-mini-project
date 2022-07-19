import { HeaderMovie, Footer } from "../components";
const LayoutComponent = (props) => {
  return (
    <>
      <HeaderMovie />
      <div style={{ marginTop: "10%" }}>{props.content}</div>
      <Footer />
    </>
  );
};

export default LayoutComponent;
