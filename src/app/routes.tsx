import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AppLayout from "../components/layout/AppLayout.tsx";
import ResponsiveLayout from "../components/layout/ResponsiveLayout.tsx";

import LoginForm from "../features/auth/components/LoginForm.tsx";
import RegisterForm from "../features/auth/components/Register.tsx";
import ForgotPassword from "../features/auth/components/ForgotPassword.tsx";
import ChangePassword from "../features/auth/components/ChangePassword.tsx";
import Confirm from "../features/auth/components/Confirm.tsx";

import SearchCard from "../features/Dashboard/SearchCard.tsx";
import Collection from "../features/Dashboard/Collection.tsx";
import Profile from "../features/Dashboard/Profile.tsx";
import CardDetail from "../features/Dashboard/CardDetail.tsx";


import PrivateRoute from "./PrivateRoute.tsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <LoginForm />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/changePassword',
        element: <ChangePassword />,
      },
      { path: "/confirm", 
        element: <Confirm />,
      },
        {
          element: <ResponsiveLayout />,
          children: [
            { path: "recherche", element: <SearchCard /> },
            { path: "collection", element: <Collection /> },
            { path: "profile", element: <Profile /> },
            { path: "carteDetail/:id", element: <CardDetail /> },
          ],
        },
        
      
      

      // ✅ Routes protégées
      // {
      //   element: <PrivateRoute />,
      //   children: [
      //   {
      //     element: <ResponsiveLayout />,
      //     children: [
      //       { path: "recherche", element: <SearchCard /> },
      //       { path: "collection", element: <Collection /> },
      //       { path: "profile", element: <Profile /> },
      //     ],
      //   },
      //   ]
      // }
    ],
  },
]);
