import "./App.css"
import Main from "./pages/main/main"
import Video from "./pages/video/video"
import { videoLoader } from "../src/utils/function"

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  useParams,

} from "react-router-dom"
import Quiz from "./pages/quiz/quiz"
import ErrorPage from "./pages/video/error"

const App = () => {

  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    {
      path: "/video",
      element: <Video />,
      loader: videoLoader,
      errorElement: <ErrorPage />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
  ])


  return <RouterProvider router={router} />
}

export default App



