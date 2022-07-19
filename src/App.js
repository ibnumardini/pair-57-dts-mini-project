import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import { Home, FilmDetail, Login, Register } from "./pages";
import Cookies from "js-cookie";
import LayoutComponent from "./layout";
import NotFound from "./pages/NotFound/Index";

const App = () => {
  const RouteLogin = ({ children }) => {
    if (Cookies.get("token") === undefined) {
      return children;
    }
    return <Navigate to='/home' replace />;
    // Cookies.get("token") ? <Navigate to='/' replace /> : <Login />;
  };
  const ProtectedRoute = ({ children }) => {
    if (Cookies.get("token") === undefined) {
      return <Navigate to='/' replace />;
    }
    return children;
  };
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            Cookies.get("token") ? (
              <LayoutComponent content={<Home />} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <LayoutComponent content={<Home />} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          exact
          element={
            <RouteLogin>
              <Login />
            </RouteLogin>
          }
        />
        <Route
          path='/register'
          element={
            Cookies.get("token") ? (
              <LayoutComponent content={<Home />} />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path='/detail-film/:filmId'
          element={
            <ProtectedRoute>
              <LayoutComponent content={<FilmDetail />} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/detail-tv/:filmId'
          element={
            <ProtectedRoute>
              <LayoutComponent content={<FilmDetail tv='true' />} />
            </ProtectedRoute>
          }
        />
        <Route
          path='*'
          element={
            <ProtectedRoute>
              <LayoutComponent content={<NotFound />} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
