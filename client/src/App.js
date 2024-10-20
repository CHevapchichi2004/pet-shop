import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
	const isAuth = false;
	return (
		<Router>
			<Routes>
				{isAuth
					? privateRoutes.map((e) => (
							<Route path={`${e.path}`} element={e.component} exact />
					  ))
					: null}

				{publicRoutes.map((e) => (
					<Route path={`${e.path}`} element={e.component} exact />
				))}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
