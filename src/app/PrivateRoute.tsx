import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    // Récupération du token depuis le localStorage
    const token = localStorage.getItem('token');

    // Vérification si le token existe et est valide
    if (!token) {
        // Redirection vers la page de login si pas de token
        return <Navigate to="/" replace />;
    }

    // Si le token existe, on affiche les routes enfants
    return <Outlet />;
};

export default PrivateRoute;