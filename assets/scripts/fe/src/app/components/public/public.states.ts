import { ContentOnly } from "src/app/commons/utils/layout.utils";
import { LoginComponent } from "./login/login.component";
import { Disconnect, Deactivate } from "src/app/commons/utils/security.utils";
import { RegisterComponent } from "./register/register.component";


export const PUBLIC_STATES: Object[] = [
    {
        name: 'login',
        url : '/login/',
        views: ContentOnly(LoginComponent),
        params: { next: window.location.pathname }
    },
    {
        name    : 'register-login',
        url     : '/login/:new',
        views: ContentOnly(LoginComponent),
        params: { next: window.location.pathname }
    },
    {
        name    : 'logout',
        url     : '/logout/',
        onEnter : Disconnect
    },
    {
        name    : 'log-out',
        url     : '/logout/',
        onEnter : Deactivate
    },
    {
        name    : 'log-in',
        url     : '/login/:deactivate',
        views: ContentOnly(LoginComponent),
        params: { next: window.location.pathname }
    },
    {
        name    : 'register',
        url     : '/register/',
        views: ContentOnly(RegisterComponent),
        params: { next: window.location.pathname }
    },
];
