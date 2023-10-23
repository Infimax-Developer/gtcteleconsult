/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatDateMMDDYYYYHHIIA } from "../libs/helpers";
import ActionBtn from "./buttons/ActionBtn";
import VitalsForm from "./VitalsForm";
import { useForm } from "react-hook-form";

const Card = ({ title, children, icon, color }) => {
	return (
		<div className="shadow-sm rounded-xl flex items-center p-3 w-1/2 2xl:w-[calc(100%/3-24px)] border-[0.5px] border-blue-300">
			<div className="flex flex-col pb-3">
				<h3
					className="text-base font-bold text-gray-900 mb-0 text-opacity-75"
					style={{ color: color }}
				>
					{title}
				</h3>
				<div className="h-[3px] w-4/5 bg-blue-300 mb-[1px]" />
				<div className="h-[2px] w-2/5 bg-red-300 mb-3" />
				{children}
			</div>
			<div className="p-1 bg-white bg-opacity-5 rounded-xl ml-auto">
				<img
					src={`/vitals/${icon}.png`}
					className="w-10 object-contain"
				/>
			</div>
		</div>
	);
};
const PatientVitals = (props) => {
	const { vitals } = props;
	const {
		register,
		formState: { errors },
	} = useForm();
	const [update, setUpdate] = useState(false);

	return (
		<div className="flex flex-col items-start">
			<div className="flex items-center justify-between w-full">
				<div className="text-base mr-auto font-semibold text-tertiary mb-4 pb-2 border-b w-2/3">
					<span>Patient Vitals</span>
				</div>
			</div>
			{update ? (
				""
			) : (
				<div className="mb-4">
					<ActionBtn
						onClick={() => {
							setUpdate(true);
						}}
					>
						Update Vitals
					</ActionBtn>
				</div>
			)}
			{/* <p className=" px-0 text-sm">
				Last updated as of{" "}
				<b>{formatDateMMDDYYYYHHIIA(new Date(vitals?.updated_at))}</b>
			</p> */}
			{update ? (
				<div className="w-full flex-col">
					<VitalsForm register={register} errors={errors} />
					<div className="pt-4 pb-5 flex justify-start items-start">
						<ActionBtn className="w-1/2">Save</ActionBtn>
					</div>
				</div>
			) : (
				<div className="flex items-start justify-start flex-wrap gap-3 mb-3 w-full px-0">
					<Card
						color="black"
						title="Blood Pressure"
						icon="blood-pressure"
					>
						<div className="flex items-center gap-2">
							<b className="text-base text-darker">
								{vitals?.blood_systolic}
							</b>
							<span className="text-base text-placeholder">
								/
							</span>
							<b className="text-base text-darker">
								{vitals?.blood_diastolic}
							</b>
							<span className="text-placeholder text-base">
								mmHG
							</span>
						</div>
					</Card>
					<Card color="red" title="Heart Rate" icon="heart-rate">
						<div className="flex items-center gap-2">
							<b className="text-base text-darker">
								{vitals?.pulse}
							</b>
							<span className="text-placeholder text-base">
								bpm
							</span>
						</div>
					</Card>
					<Card
						color="blue"
						title="Respiratory Rate"
						icon="respiration"
					>
						<div className="flex items-center gap-2">
							<b className="text-base text-darker">
								{vitals?.respiratory}
							</b>
							<span className="text-placeholder text-base">
								bpm
							</span>
						</div>
					</Card>
					<Card
						color="darkorange"
						title="Temperature"
						icon="temperature-celcius"
					>
						<div className="flex items-center gap-2">
							<b className="text-base text-darker">
								{vitals?.temperature}
							</b>
							<span className="text-placeholder text-base">
								°C
							</span>
						</div>
					</Card>
					<Card color="green" title="Height" icon="height">
						<div className="flex items-center gap-2">
							<b className="text-base text-darker">
								{vitals?.height}
							</b>
							<span className="text-placeholder text-base">
								cm
							</span>
						</div>
					</Card>
					<Card color="brown" title="Weight" icon="weight">
						<div className="flex items-center gap-2">
							<b className="text-base text-darker">
								{vitals?.weight}
							</b>
							<span className="text-placeholder text-base">
								kg
							</span>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
};

export default PatientVitals;
