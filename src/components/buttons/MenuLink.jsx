import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";

const MenuLink = ({ active = false, to = "", icon, text, ...rest }) => {
	return (
		<Link to={to} {...rest}>
			<div
				className={`bg-primary-dark bg-opacity-0 hover:bg-opacity-20 cursor-pointer p-4 flex items-center text-white gap-3 duration-200 ${
					active ? "!bg-opacity-50" : ""
				}`}
			>
				<span className="flex items-center">
					<FlatIcon icon={icon} />
				</span>
				<span className="text-sm">{text}</span>
			</div>
		</Link>
	);
};

export default MenuLink;
