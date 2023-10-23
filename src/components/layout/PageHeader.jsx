import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";
import HomeMenuBtn from "../buttons/HomeMenuBtn";

const PageHeader = ({ children, title, icon, subtitle }) => {
	return (
		<div className="px-5 py-4 bg-slate-100">
			<div className="container mx-auto ">
				<div className="flex items-center gap-2">
					<span className="p-2 bg-blue-500 flex items-center justify-center px-3 rounded-xl ">
						<FlatIcon
							icon={icon}
							className="mt-1 text-white text-xl"
						/>
					</span>
					<div className="flex flex-col">
						<h1 className="text-xl font-semibold text-primary-dark tracking-wider mb-0">
							{title}
						</h1>
						{subtitle ? (
							<span className="text-xs font-light text-slate-400 -mt-1">
								{subtitle}
							</span>
						) : (
							""
						)}
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default PageHeader;
