import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import Device from "./pages/Device";
import Shop from "./pages/Shop";

export const privateRoutes = [
	{ path: "/admin", component: <Admin /> },
	{ path: "/basket", component: <Basket /> },
];

export const publicRoutes = [
	{ path: "/auth", component: <Auth /> },
	{ path: "/device", component: <Device /> },
	{ path: "/", component: <Shop /> },
];
