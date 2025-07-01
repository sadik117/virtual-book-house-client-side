import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ErrorPage from "../pages/ErrorPage";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import PrivateRoute from "./PrivateRoute";
import Bookshelf from "../pages/Bookshelf";
import BookDetails from "../pages/BookDetails";
import UserProfile from "../pages/UserProfile";
import AllBooksTable from "../pages/AllBooksTable";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
        hydrateFallbackElement: (
          <p className="justify-center items-center mx-120 my-50">
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
          </p>
        )
      },
      {
        path: "/bookshelf",
        Component: Bookshelf,
      },
      {
        path: "/all-books-table",
        Component: AllBooksTable
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/viewDetails/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
        hydrateFallbackElement: (
          <p className="justify-center items-center mx-120 my-50">
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
          </p>
        )
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
        hydrateFallbackElement: (
          <p className="justify-center items-center mx-120 my-50">
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
          </p>
        )
      },
      {
        path: "/auth",
        children: [
          {
            path: "/auth/login",
            Component: Login,
          },
          {
            path: "/auth/register",
            Component: Registration,
          },
        ],
      },
    ],
  },
]);
