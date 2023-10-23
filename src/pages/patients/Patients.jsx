import { useEffect, useState } from "react";
import AppLayout from "../../components/container/AppLayout";
import PageHeader from "../../components/layout/PageHeader";
import TextInput from "../../components/inputs/TextInput";
import PatientMenu from "../../components/buttons/PatientMenu";
import Pagination from "../../components/table/Pagination";
import LoadingScreen from "../../components/loading-screens/LoadingScreen";
import useDataTable from "../../hooks/useDataTable";
import PatientProfile from "./Patientprofile";
import { Fade } from "react-reveal";

const Patients = () => {
	const {
		data: patients,
		setData: setPatients,
		loading,
		page,
		setPage,
		meta,
		filters,
		paginate,
		setPaginate,
		setFilters,
	} = useDataTable({
		url: `/v1/patients`,
	});
	const [patient, setPatient] = useState(null);
	useEffect(() => {
		setPaginate(5);
	}, []);
	return (
		<AppLayout>
			<PageHeader
				title="Patients"
				subtitle={`View patients`}
				icon="rr-clipboard-user"
			/>
			<div className="p-5 ">
				<div className="grid grid-cols-1 lg:grid-cols-12">
					<div className=" lg:col-span-4 xl:col-span-3 flex flex-col gap-y-4">
						<div className="pr-5">
							<TextInput
								iconLeft={"rr-search"}
								placeholder="Search patient..."
								onChange={(e) => {
									setFilters((prevFilters) => ({
										...prevFilters,
										keyword: e.target.value,
									}));
								}}
							/>
						</div>
						<div className="flex flex-col gap-y-4 relative">
							{loading ? <LoadingScreen /> : ""}
							<div className="flex flex-col gap-y-4 max-h-[calc(100vh-328px)] overflow-auto pr-5">
								{patients?.map((patientData) => {
									return (
										<PatientMenu
											onClick={() => {
												console.log(
													"setPatient",
													patientData
												);
												setPatient(patientData);
											}}
											patient={patientData}
											active={
												patientData?.id == patient?.id
											}
											key={`patient-${patientData?.id}`}
										/>
									);
								})}
							</div>
							<Pagination
								setPageSize={setPaginate}
								page={page}
								setPage={setPage}
								pageCount={meta?.last_page}
							/>
						</div>
					</div>
					<div className=" lg:col-span-8 xl:col-span-9">
						{patient ? (
							<Fade key={`patient-profile-${patient?.id}`}>
								<PatientProfile patient={patient} />
							</Fade>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default Patients;
