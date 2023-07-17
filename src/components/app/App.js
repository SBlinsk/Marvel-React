import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Spinner from "../spinner/Spinner1";

const MainPage = lazy(() => import("../pages/singleComicLayout/mainPage"));
const ComicsPage = lazy(() => import("../pages/singleComicLayout/ComicsPage"));
const Page404 = lazy(() => import("../pages/singleComicLayout//404"));
// const SingleComicPage = lazy(() =>
//   import("../pages/singleComicLayout/SingleComicPage")
// );
const SinglePage = lazy(() => import("../pages/singleCharLayout/SinglePage"));
const SingleCharLayout = lazy(() =>
  import("../pages/singleCharLayout/SingleCharLayout")
);
const SingleComicLayout = lazy(() =>
  import("../pages/singleComicLayout/singleComicLayout")
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
        <Suspense fallback={<Spinner/>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={SingleComicLayout} dataType="comic" />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharLayout}
                    dataType="character"
                  />
                }
              />
              <Route path="*" element={<Page404 />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </ErrorBoundary>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
