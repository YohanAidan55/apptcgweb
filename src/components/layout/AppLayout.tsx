import { DashboardLayout } from '@toolpad/core'
import {IconButton, Tooltip, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export function NavBarActions() {
    return (
        <>
            <div>
              <Tooltip title="Logout">
                  <IconButton onClick={() => {}}>
                      <LogoutIcon aria-label="logout" />
                  </IconButton>
              </Tooltip>
            </div>
        </>
    )
}

export function NavBarFooter() {
    return (
        <>
            <Typography variant="body2" color="text.secondary" align="center">
                ortho web
            </Typography>
        </>
    )
}

/**
 * DashboardLayout (Toolpad/Core)
 *
 * Uses @toolpad/core DashboardLayout to provide a standardized app shell.
 * Location: components/layout/appLayout/DashboardLayout.tsx
 */



import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
      <DashboardLayout
          slots={{
              toolbarActions: NavBarActions,
              sidebarFooter: NavBarFooter,
          }}
          sidebarExpandedWidth="15%"
      >
          <Outlet />
      </DashboardLayout>
  )
}
