import { useForm } from "react-hook-form";
import ActionBtn from "../../components/buttons/ActionBtn";
import LayoutContainer from "../../components/container/LayoutContainer";
import TextInput from "../../components/inputs/TextInput";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "../../libs/axios";

const Login = () => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");
	// const [password, setPassword] = useState("");
	const { login } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/",
	});

	const setErrors = (data) => {
		console.log("errorserrors", data);
		setError("username", {
			type: "manual",
			message: "The provided credentials are incorrect.",
		});
		setLoading(false);
	};
	const submit = async (data) => {
		setLoading(true);
		console.log("submit", data);
		// clearErrors();
		try {
			await login({ data: data, setStatus, setErrors });
			console.log("status", status);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (err) {
			console.log("err", err);
			setLoading(false);
			toast.error("Login failed! Please check your credentials.");
		}
	};
	return (
		<LayoutContainer>
			<ToastContainer />
			<div className=" z-20 mx-auto w-4/5 lg:w-[448px] p-11 border bg-white shadow-lg shadow-[rgba(0,0,0,0.1)] rounded-xl flex flex-col items-center">
				<img
					src="/logo.png"
					alt="gtc-logo"
					className="w-[144px] mb-2"
				/>
				<h5 className="text-primary-darker font-bold uppercase mb-5 ">
					Login form
				</h5>
				<TextInput
					className="w-full mb-4"
					label="Username"
					placeholder="Input username"
					id="username"
					register={register("username", {
						required: "This field is required",
					})}
					error={errors?.username?.message}
				/>
				<TextInput
					className="w-full mb-6"
					label="Password"
					placeholder="Input password"
					type="password"
					error={errors?.password?.message}
					register={register("password", {
						required: "This field is required",
					})}
				/>
				<ActionBtn
					type="primary-dark"
					className="w-full "
					loading={loading}
					onClick={handleSubmit(submit)}
				>
					Login
				</ActionBtn>
			</div>
		</LayoutContainer>
	);
};

export default Login;
