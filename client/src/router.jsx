import About from "./Components/About";
import Owner from "./Components/Owner";

import BidRequests from "./Components/BidRequests";
import Cart from "./Components/Cart";
import Category from "./Components/Category";
import Chooseform from "./Components/Chooseform";
import Commissions from "./Components/Messages";
import Error from "./Components/Error";
import GuestLayout from "./Layout/GuestLayout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Productitem from "./Components/Productitem";
import Search from "./Components/Search";
import Signup from "./Components/Signup";
import Uploadform from "./Components/Uploadform";
import UserLayout from "./Layout/UserLayout";
import Workshop from "./Components/Offers";
import Workshopform from "./Components/OffersForm";
import { createBrowserRouter } from "react-router-dom";
import OffersForm from "./Components/OffersForm";
import Offers from "./Components/Offers";
import AdminLogin from "./Components/Admin/Login";
import AdminLayout from "./Layout/AdminLayout";
import AdminDashboard from "./Components/Admin/Dashboard";
import ProductsManager from "./Components/Admin/Products";
import BidsManager from "./Components/Admin/Bids";
import GalleryManager from "./Components/Admin/Gallery";
import MessagesManager from "./Components/Admin/Messages";
import OffersManager from "./Components/Admin/Offers";
import ReviewManager from "./Components/Admin/Reviews";
import AuthManager from "./Components/Admin/Auths";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:type",
        element: <Category />,
      },
      {
        path: "/ownerprofile/:owner_email",
        element: <Owner />,
      },

      {
        path: "/chooseform",
        element: <Chooseform />,
      },
      {
        path: "/uploadform",
        element: <Uploadform />,
      },
      {
        path: "/bidrequests",
        element: <BidRequests />,
      },
      {
        path: "/commissions",
        element: <Commissions />,
      },
      {
        path: "/offersform",
        element: <OffersForm />,
      },
      {
        path: "/overview/:id",
        element: <Productitem />,
      },

      {
        path: "/offers/:id",
        element: <Offers />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <ProductsManager />,
      },
      {
        path: "products",
        element: <ProductsManager />,
      },
      {
        path: "bids",
        element: <BidsManager />,
      },
      {
        path: "gallery",
        element: <GalleryManager />,
      },
      {
        path: "messages",
        element: <MessagesManager />,
      },
      {
        path: "offers",
        element: <OffersManager />,
      },
      {
        path: "reviews",
        element: <ReviewManager />,
      },
      {
        path: "auths",
        element: <AuthManager />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);
export default router;
