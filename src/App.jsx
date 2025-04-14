import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Play from "./components/Play";
import Create from "./components/Create";
import Friends from "./components/Friends";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      // Add more routes here later
    ],
  },
  {
    path: "/play",
    element: <Play />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
