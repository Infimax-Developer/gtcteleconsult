import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";
import { useAuth } from "../../hooks/useAuth";
import ActionBtn from "../buttons/ActionBtn";
import Img from "../Img";

const Header = () => {
	const { user, logout } = useAuth();
	return (
		<div className="bg-primary">
			<div className="h-[52px] w-full bg-primary-dark bg-opacity-60 flex items-center z-10 px-5">
				<div className="container mx-auto flex items-center">
					<span className="text-lg font-light -mt-1 text-white">
						{user?.type}
					</span>

					<div className="ml-auto flex items-center gap-2 text-white cursor-pointer ">
						<ActionBtn
							type="foreground"
							onClick={logout}
							className="gap-2 bg-opacity-10 !text-blue-100 text- rounded-xl"
						>
							Logout
							<FlatIcon icon="rr-sign-out-alt" />
						</ActionBtn>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
