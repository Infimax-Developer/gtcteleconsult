/* eslint-disable react/prop-types */
import FlatIcon from "../../components/FlatIcon";
import Img from "../../components/Img";
import PatientAppointments from "../../components/PatientAppointments";
import PatientPrescriptions from "../../components/PatientPrescriptions";
import PatientProfileDetails from "../../components/PatientProfileDetails";
import PatientVitals from "../../components/PatientVitals";
import TabGroup from "../../components/TabGroup";
import MenuTitle from "../../components/buttons/MenuTitle";
import { calculateAge, formatDate } from "../../libs/helpers";

const PatientProfile = (props) => {
	const { patient } = props;
	return (
		<div className="flex flex-col">
			<div className="flex flex-col lg:flex-row gap-4 items-center px-4 pt-4 border-b justify- md:justify-start bg-slate-50 p-4 h-full">
				<div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
					<Img
						type="user"
						name={`${patient?.lastname}-${patient?.firstname}-${patient?.middle}`}
						src={patient?.avatar || ""}
						className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-full"
						alt=""
						id="user-image-sample"
						key={`key-${patient?.id}-${patient?.avatar}`}
					/>
				</div>
				<div className="flex flex-col pl-4">
					<h6
						className={`text-left text-2xl mb-1 font-semibold flex items-center ${
							patient?.gender == "Male"
								? "text-blue-800"
								: "text-pink-800"
						} mb-0`}
					>
						{`${patient?.lastname}, ${patient?.firstname} ${
							patient?.middle || ""
						}`}
					</h6>
					<div className="flex gap-6 mb-2">
						<div className="flex items-center gap-2 text-base">
							<FlatIcon
								icon="rr-calendar-clock"
								className="text-base"
							/>
							<span>
								{calculateAge(patient?.birthday)} yrs. old
							</span>
						</div>
						<div className="flex items-center gap-2 text-base">
							<FlatIcon
								icon="rr-calendar"
								className="text-base"
							/>
							<span>{formatDate(patient?.birthday)}</span>
						</div>
					</div>
					<div className="flex gap-4 mb-2">
						<div className="flex items-center gap-2 text-base">
							<FlatIcon
								icon="rr-venus-mars"
								className="text-base"
							/>
							{patient?.gender == "Male" ? (
								<span className="text-blue-700">Male</span>
							) : (
								<span className="text-pink-700">Female</span>
							)}
						</div>
					</div>
				</div>
			</div>
			<div>
				<TabGroup
					tabClassName={`py-3 bg-slate-100 border-b`}
					contents={[
						{
							title: (
								<MenuTitle src="/profile.png">
									Profile
								</MenuTitle>
							),

							content: (
								<PatientProfileDetails patient={patient} />
							),
						},

						{
							title: (
								<MenuTitle src="/patient.png">
									Appointments
								</MenuTitle>
							),
							content: <PatientAppointments patient={patient} />,
						},
						{
							title: (
								<MenuTitle src="/vitals/vitals.png">
									Vital signs
								</MenuTitle>
							),

							content: <PatientVitals patient={patient} />,
						},
						{
							title: (
								<MenuTitle src="/healthcare.png">
									Prescriptions
								</MenuTitle>
							),
							content: <PatientPrescriptions patient={patient} />,
						},
						// {
						// 	title: (
						// 		<MenuTitle src="/healthcare.png">
						// 			Releasing
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<RhuReleasing
						// 			patient={patient}
						// 			setPatient={setPatient}
						// 		/>
						// 	),
						// },
					]}
				/>
			</div>
		</div>
	);
};

export default PatientProfile;
