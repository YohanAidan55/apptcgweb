import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../features/home/Home.tsx";
import Home2 from "../features/home2/Home2.tsx";
import LoginForm from "../features/auth/components/LoginForm.tsx";
import AppLayout from "../components/layout/AppLayout.tsx";
import PrivateRoute from "../core/guard/PrivateRoute.tsx";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <LoginForm/>,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        element: <AppLayout />,
                        children: [
                            {
                                path: 'home',
                                element: <Home />,
                            },
                            {
                                path: 'home2',
                                element: <Home2 />,
                            }
                        ]
                    }
                ]
            }
        ],
    },
]);

