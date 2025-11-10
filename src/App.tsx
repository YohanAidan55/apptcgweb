import './App.css'
import {ReactRouterAppProvider} from "@toolpad/core/react-router";
import type {Navigation} from "@toolpad/core";
import DashboardIcon from '@mui/icons-material/Dashboard';
import {store} from "./business/store.ts";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";


const navigation: Navigation = [
    {
        segment: 'home',
        title: 'Home',
        icon: <DashboardIcon/>
    },
    {
        segment: 'home2',
        title: 'Home2',
        icon: <DashboardIcon/>
    }
]

const NavbarTitle = {
    title: 'TCG WEB',
    homeUrl: '/home'
}
function App() {
  return (
    <ReactRouterAppProvider
      navigation={navigation}
      branding={NavbarTitle}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App
