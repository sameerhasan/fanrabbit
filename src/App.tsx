import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { MainPage } from "./pages";

import { PrivateRoutes } from "./guard";

import { Auth, Layout } from "./components";

import routes from "./routes";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route element={<MainPage />} path={routes.index} />
        </Route>
      </Route>
      <Route element={<Auth />} path={routes.auth} />
      {/* <Route
        element={<ChangePasswordPage />}
        path={routes.changePasswordPage}
      /> */}
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
