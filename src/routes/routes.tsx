import { createBrowserRouter } from "react-router";
import { ApiEndpoint } from "../enum";
import Home from "../components/Home";
import App from "../App";
import AddUser from "../components/AddUser";

export const router = createBrowserRouter([
  {
    path: ApiEndpoint.HOME,
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: ApiEndpoint.ADD_USER,
        Component: AddUser,
      },
    ],
  },
]);
