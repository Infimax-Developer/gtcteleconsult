const MenuTitle = ({ src, children, className }) => {
	return (
		<div
			className={`flex flex-row items-center justify-center gap-2 py-1 min-w-[108px] ${
				className || ""
			}`}
		>
			<img src={src} className="h-[20px]  object-contain" />
			<span className="text-xs font-semibold">{children}</span>
		</div>
	);
};

export default MenuTitle;
