import { patientFullName } from "../../libs/helpers";
import Img from "../Img";

const PatientMenu = ({ patient, active = false, ...rest }) => {
	return (
		<div
			className={`outline-none bg-slate-50 rounded-xl p-3 flex items-center gap-3 hover:bg-white cursor-pointer duration-300 border-2 border-slate-100 hover:border-blue-500 hover:shadow-lg ${
				active ? "bg-white !border-blue-500 shadow-lg " : ""
			}`}
			{...rest}
		>
			<Img
				src={""}
				type="user"
				name={patientFullName(patient)}
				className="h-11 w-11 rounded-full object-contain"
			/>
			<div className="flex flex-col">
				<span className="text-base text-slate-600 font-semibold">
					{patientFullName(patient)}
				</span>
				<span className="text-xs text-slate-400">Male</span>
				<span className="text-xs text-slate-400">15 yrs old.</span>
			</div>
		</div>
	);
};

export default PatientMenu;
