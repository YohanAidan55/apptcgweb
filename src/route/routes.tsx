import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AppLayout from "../components/layout/AppLayout.tsx";

import LoginForm from "../features/auth/components/LoginForm.tsx";
import RegisterForm from "../features/auth/components/Register.tsx";
import ForgotPassword from "../features/auth/components/ForgotPassword.tsx";
import ChangePassword from "../features/auth/components/ChangePassword.tsx";
import Confirm from "../features/auth/components/Confirm.tsx";

import PrivateRoute from "../core/guard/PrivateRoute.tsx";

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
        element: <Confirm /> 
      },

      // ✅ Routes protégées
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: '/home',
                element: <div>Home page</div>,
              }
            ]
          }
        ]
      }
    ],
  },
]);
