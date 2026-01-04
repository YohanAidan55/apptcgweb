import {ReactRouterAppProvider} from "@toolpad/core/react-router";
import { Outlet } from "react-router-dom";
import CustomThemeProvider from "@/theme/ThemeContext";


const NavbarTitle = {
    title: 'TCG WEB',
    homeUrl: '/home'
}
function App() {
  return (
    <ReactRouterAppProvider branding={NavbarTitle}>
      <CustomThemeProvider>  
        <Outlet />
      </CustomThemeProvider> 
    </ReactRouterAppProvider>
  );
}

export default App;