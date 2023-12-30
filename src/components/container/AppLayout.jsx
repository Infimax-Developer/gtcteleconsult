import { Link, useLocation, useNavigation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../layout/Header";
import FlatIcon from "../FlatIcon";
import MenuLink from "../buttons/MenuLink";
import { useEffect, useState } from "react";
import Img from "../Img";
import { ToastContainer } from "react-toastify";
const AppLayout = (props) => {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const { children } = props;
	useEffect(() => {
		console.log("routerrouter", location);
	}, []);
	const isActive = (name) => {
		if (name == "/") {
			return location?.pathname == "/";
		}
		return location?.pathname?.includes(name);
	};
	return (
		<div className="w-full flex">
			<span
				className={`absolute z-30 top-[10px] duration-200 cursor-pointer lg:hidden shadow shadow-blue-500 rounded bg-white h-8 w-8 flex items-center justify-center ${
					sidebarOpen ? "left-[244px]" : "left-[12px] rotate-180"
				}`}
				onClick={() => {
					setSidebarOpen((prevOpen) => !prevOpen);
				}}
			>
				<FlatIcon
					icon="rr-arrow-left-from-line"
					className="text-blue-500 text-xs -mt-[-2px]"
				/>
			</span>
			<div
				className={`absolute lg:relative  duration-200 h-[100dvh] border-r-[0.1px] lg:!border-r-[0px] shadow-white lg:!left-0 w-[256px] z-20 overflow-auto bg-primary ${
					!sidebarOpen ? "left-[-256px]" : "left-0"
				}`}
			>
				<div className="h-[52px] bg-primary-dark bg-opacity-60 flex items-center justify- pl-2">
					<Link to="/" className=" cursor-pointer ">
						<div className="h-[44px] flex gap-1 items-center mr-auto">
							<img
								src="/logo.png"
								alt="logo"
								className="h-[44px] w-[44px]"
							/>
							<span
								className="text-xl font- text-white tracking-wider"
								// style={{ textShadow: "1px 1px 2px black" }}
							>
								GTC Teleconsult
							</span>
						</div>
					</Link>
				</div>
				<div className="shadow-[1px_0px_0px_0px] shadow-[#50789d]">
					<div className="mb- flex flex-col justify-center items-center gap-2 bg-primary-dark bg-opacity-10 py-4">
						<Img
							src={user?.avatar}
							type="user"
							name={user?.name}
							className="h-14 w-14 rounded-full border border-blue-500"
						/>
						<div className="flex flex-col">
							<span className="text-sm font- text-white">
								{user?.name}
							</span>
						</div>
					</div>
					<div className="flex flex-col h-[calc(100dvh-208px)]">
						<MenuLink
							to="/"
							active={isActive("/")}
							icon="rr-dashboard"
							text="Dashboard"
						/>
						<MenuLink
							to="/patients"
							active={isActive("/patients")}
							icon="rr-users"
							text="Patients"
						/>
						{user?.type?.includes("doctor") ||
						user?.type?.includes("DOC") ? (
							<>
								<MenuLink
									to="/appointments"
									active={isActive("/appointments")}
									icon="rr-calendar"
									text="Appointments"
								/>
								<MenuLink
									to="/virtual-consultation"
									active={isActive("/virtual-consultation")}
									icon="rr-camera"
									text="Virtual Consultation"
								/>
							</>
						) : (
							""
						)}

						<MenuLink
							to="/my-account"
							active={isActive("/my-account")}
							icon="rr-user"
							text="My Account"
						/>
					</div>
					<div className="flex items-center mt-auto justify-center pb-2">
						<span className="text-white text-xs font-light">
							POWERED BY GTC
						</span>
					</div>
				</div>
			</div>
			<div className="relative bg-white bg-opacity-80 h-[100dvh] w-full lg:w-[calc(100vw-256px)] ">
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
				<div className="overflow-auto relative h-[calc(100vh-64px)]">
					{children}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default AppLayout;
