import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register, Login, Chat, SetAvatar } from "./pages";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/register"
						element={<Register />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/setAvatar"
						element={<SetAvatar />}
					/>
					<Route
						path="/"
						element={<Chat />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
