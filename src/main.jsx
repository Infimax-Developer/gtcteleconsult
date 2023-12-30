import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/login.jsx";
import Patients from "./pages/patients/Patients.jsx";
import axios from "./libs/axios.js";
import { getStorage } from "./libs/storage";
import { toast } from "react-toastify";
import PatientConsultation from "./pages/consultation/PatientConsultation.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Appointments from "./pages/appointments/Appointments.jsx";
import MyAccount from "./pages/my-account/MyAccount.jsx";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
axios.interceptors.request.use(
	async function (config) {
		const token = await getStorage("token");
		console.log("axios.interceptors.request");
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
const removeSession = () => {
	if (!window.location.pathname.includes("login")) {
		setTimeout(() => {
			toast.error(
				"Session expired! Login to your credentails to continue."
			);
		}, 500);
		window.localStorage.clear();
		window.location.pathname = "/login";
	}
};
axios.interceptors.response.use(
	(response) => {
		if (response.status === 500) {
			toast.error("Unable to connect to server!");
			return Promise.reject({ response });
		}

		return response;
	},
	(error) => {
		if (error.response) {
			const code = error.response.status;

			switch (parseInt(code)) {
				case 401:
				case 403:
					removeSession();
					break;

				case 500:
					toast.error("Internal server error");
					break;
			}

			if (error.response && error.response.data) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error.message);
	}
);
const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path: "/virtual-consultation",
		element: <App />,
	},
	{
		path: "/appointments",
		element: <Appointments />,
	},
	{
		path: "/patients",
		element: <Patients />,
	},
	{
		path: "/my-account",
		element: <MyAccount />,
	},
	{
		path: "/consultation",
		element: <PatientConsultation />,
	},
]);

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
