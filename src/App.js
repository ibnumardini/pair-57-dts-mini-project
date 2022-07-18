import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Home, FilmDetail } from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-film/:filmId" element={<FilmDetail />} />
        <Route path="/detail-tv/:filmId" element={<FilmDetail tv="true" />} />
      </Routes>
    </>
  );
};

export default App;
