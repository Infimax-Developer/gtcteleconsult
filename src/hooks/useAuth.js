import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setStorage, getStorage } from "../libs/storage";
import Axios from "../libs/axios";
Axios.defaults.headers.common["Authorization"] = `Bearer ${getStorage(
	"token"
)}`;
export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
	let navigate = useNavigate();
	let params = useParams();

	const {
		data: user,
		error,
		mutate,
	} = useSWR(
		"/v1/profile/me",
		() =>
			Axios.get("/v1/profile/me")
				.then((res) => {
					console.log("res.data", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					mutate("/v1/profile/me");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
		}
	);

	const csrf = () => Axios.get("/sanctum/csrf-cookie");

	const register = async ({ setErrors, ...props }) => {
		await csrf();
		setErrors([]);
		Axios.post("/register", props)
			.then(() => mutate())
			.catch((error) => {
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const login = async ({ data, setErrors, setStatus }) => {
		console.log("login", data);
		// return "";
		await Axios.post("/login", data)
			.then(async (result) => {
				if (result?.data?.msg == "account-invalid") {
					setErrors({});
					throw new Error("account-invalid");
				} else {
					setStatus("success");
					if (result.data[0].token) {
						await setStorage("token", result.data[0].token);
						Axios.defaults.headers.common[
							"Authorization"
						] = `Bearer ${result.data[0].token}`;
						await setStorage("user", result.data[0].user);
						await setStorage("type", result.data[0].type);
						setTimeout(() => {
							setTimeout(() => {
								toast.success("Login success");
							}, 100);
							navigate("/");
						}, 2500);
					}
				}
				// mutate();
			})
			.catch((error) => {
				// toast.error("Login failed! Please check your credentials.");
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const forgotPassword = async ({ setErrors, setStatus, email }) => {
		await csrf();
		setErrors([]);
		setStatus(null);
		Axios.post("/forgot-password", { email })
			.then((response) => setStatus(response.data.status))
			.catch((error) => {
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const resetPassword = async ({ setErrors, setStatus, ...props }) => {
		await csrf();
		setErrors([]);
		setStatus(null);
		Axios.post("/reset-password", { token: params.token, ...props })
			.then((response) =>
				navigate(`/login?reset=${btoa(response.data.status)}`)
			)
			.catch((error) => {
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const resendEmailVerification = ({ setStatus }) => {
		Axios.post("/email/verification-notification").then((response) =>
			setStatus(response.data.status)
		);
	};

	const logout = async () => {
		// await Axios.post("/logout");
		mutate();

		if (typeof window == "object") {
			window.localStorage.clear();
			window.location.pathname = "/login";
		}
		return true;
	};

	useEffect(() => {
		console.log("useruseruseruser", user, error, middleware);
		if (middleware === "guest" && redirectIfAuthenticated && user)
			navigate(redirectIfAuthenticated);

		let time1 = setTimeout(() => {
			if (middleware === "auth" && error) logout();
		}, 500);
		return () => {
			clearTimeout(time1);
		};
	}, [user, error]);

	return {
		user,
		register,
		login,
		forgotPassword,
		resetPassword,
		resendEmailVerification,
		logout,
		mutate,
	};
};
