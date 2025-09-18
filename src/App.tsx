import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./components/Routers/Routes";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
