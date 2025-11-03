import {createBrowserRouter} from "react-router-dom";
import App from "../App";

import LoginForm from "../features/auth/components/LoginForm.tsx";
import RegisterForm from "../features/auth/components/Register.tsx";
import ForgotPassword from "../features/auth/components/ForgotPassword.tsx";



export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <LoginForm/>,
            },
            {
                path: '/login',
                element: <LoginForm/>,
            },
            {
                path: '/register',
                element: <RegisterForm/>,
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword/>,
            },
            
        ],
    },
]);

