import { NavContent } from "src/app/commons/utils/layout.utils";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginRequired } from "src/app/commons/utils/security.utils";
import { SettingsComponent } from "./settings/settings.component";


export const USER_STATES: Object[] = [
    {
        name : 'dashboard',
        url  : '/dashboard/',
        views:  NavContent(DashboardComponent),
        onEnter: LoginRequired
    },
    {
        name : 'dashboard-activated',
        url  : '/dashboard/:activated',
        views:  NavContent(DashboardComponent),
        onEnter: LoginRequired
    },
    {
        name : 'settings',
        url  : '/settings/',
        views:  NavContent(SettingsComponent),
        onEnter: LoginRequired
    },

]