import { Suspense, lazy } from "react"; // use to loading , loading screen until full page is load
import { Navigate, useRoutes } from "react-router-dom";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

// layout
import MainLayout from "../layouts/main";
import DashboardLayout from "../layouts/dashboard";

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  console.log("Router");
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [{ element: <LoginPage />, path: "login" }],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));
