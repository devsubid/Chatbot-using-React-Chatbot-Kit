import { Suspense, lazy } from "react";
import { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

const Chat = lazy(() => import("./page/Chat"));
const Success = lazy(() => import("./page/Success"));
const NotFound = lazy(() => import("./page/404"));

const GlobalStyle = createGlobalStyle`
  :root{
    --light-color: 241 241 241;
    --dark-color: 52 53 65;
    --primary-color: 55 107 126;
    --secondary-color: 62 166 255;
    --tertiary-color: 25 195 125;
    --success-color: 3 179 10;
    --like-color: 16 110 190;
    --font-poppins: 'Poppins', system-ui, sans-serif;
    scroll-behavior: smooth;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
  html {
    color-scheme: light;
  }
  html, body {
    overflow-x: hidden;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-poppins);
    outline: none;
  }
  body {
    position: relative;
    background-color: rgb(var(--light-color));
    color: rgb(var(--dark-color));
    min-height: 100vh;
    display: grid;
    place-items: center;
  }
  .container {
    margin-inline: auto;
    width: min(90%, 70rem);
  }
  a {
    text-decoration: none;
    color: inherit;
    transition: 0.15s;
  }
  input{
    background-color: transparent;
  }
  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    user-select: none;
  }
  & span.loader {
    margin-bottom: 2rem;
    width: 1rem;
    height: 1rem;
    border: 2px solid #FFF;
    border-bottom-color: rgb(var(--dark-color));
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
  }
  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
  #root {
    width: 100%;
    height: 100%;
  }
`;

const App = () => {
  const location = useLocation();
  return (
    <>
      <GlobalStyle />
      <Suspense
        fallback={
          <div
            className="loader-container"
            style={{
              height: "100vh",
              width: "100vw",
              display: "grid",
              placeItems: "center",
            }}
          >
            <span className="loader"></span>
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Chat />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
};

export default App;
