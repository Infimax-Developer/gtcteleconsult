const DefaultBtn = ({ children, ...rest }) => {
	return <div {...rest}>{children}</div>;
};
const LinkBtn = ({ children, ...rest }) => {
	return <div {...rest}>{children}</div>;
};
const ActionBtn = (props) => {
	const {
		behavior,
		type = "primary",
		children,
		size = "md",
		disabled = false,
		loading = false,
		className = "",
		...rest
	} = props;
	const renderSize = () => {
		switch (size) {
			case "sm":
				return "py-1 text-xs px-2";
			case "md":
				return "py-2 text-sm px-4";

			default:
				return "py-3 px-2";
		}
	};
	const renderType = () => {
		let disabledClass = "";
		if (disabled) {
			disabledClass = ` focus:bg-slate-500 opacity-50 !text-black pointer-events-none`;
		}
		switch (type) {
			case "primary":
				return `bg-primary-dark hover:bg-primary-darker focus:bg-primary-dark text-white ${disabledClass}`;

			case "primary-dark":
				return `bg-primary-darker hover:bg-primary-darker focus:bg-primary-darker text-white ${disabledClass}`;

			case "disabled":
				return `bg-slate-500 hover:bg-slate-700 focus:bg-slate-500 !text-black pointer-events-none ${disabledClass}`;

			case "foreground":
				return `bg-slate-100 hover:bg-slate-300 focus:bg-slate-300 text-slate-500 ${disabledClass}`;

			default:
				return `bg-primary hover:bg-primary-darker focus:bg-primary-dark text-white ${disabledClass}`;
		}
	};
	const btnClassName = () => {
		return `duration-200 flex items-center justify-center rounded-lg cursor-pointer ${renderSize()} ${renderType()}`;
	};
	return behavior == "link" ? (
		<LinkBtn
			className={` ${btnClassName()} ${className} ${
				loading ? "pointer-events-none opacity-50" : ""
			}`}
			{...rest}
		>
			{loading ? "Loading..." : children}
		</LinkBtn>
	) : (
		<DefaultBtn
			className={` ${btnClassName()} ${className} ${
				loading ? "pointer-events-none opacity-50" : ""
			}`}
			{...rest}
		>
			{loading ? "Loading..." : children}
		</DefaultBtn>
	);
};

export default ActionBtn;
