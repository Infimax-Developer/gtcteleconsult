/* eslint-disable react/prop-types */
import { useRef } from "react";
import useDataTable from "../hooks/useDataTable";
import { formatDateMMDDYYYY, formatDateMMDDYYYYHHIIA } from "../libs/helpers";
import FlatIcon from "./FlatIcon";
import ActionBtn from "./buttons/ActionBtn";
import Pagination from "./table/Pagination";
import Table from "./table/Table";
import NewAppointmentModal from "./modal/NewAppointmentModal";
import { v4 as uuidv4 } from "uuid";
const uniq_id = uuidv4();
const PatientAppointments = (props) => {
	const { patient } = props;
	const appointmentRef = useRef(null);
	const {
		page,
		setPage,
		meta,
		setMeta,
		loading,
		setLoading,
		paginate,
		setPaginate,
		data,
		setData,
		column,
		setColumn,
		direction,
		setDirection,
		filters,
		setFilters,
	} = useDataTable({
		url: `/v1/telemedicine/getPatientSchedules`,
		defaultFilters: {
			patient_id: patient?.id,
			key: uniq_id,
		},
	});
	return (
		<div className="flex flex-col items-start">
			<div className="border-b w-full flex items-center pb-2">
				<span className="text-base font-semibold text-tertiary">
					Patient Appointments
				</span>
				<ActionBtn
					className=" ml-5 h-6 text-xs gap-2 !w-[128px]"
					onClick={() => {
						appointmentRef?.current?.show(patient);
					}}
				>
					<FlatIcon icon="rr-plus" /> Create new
				</ActionBtn>
			</div>
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Date and time",
						className: "text-left",
						tdClassName: "text-left",
						key: "date",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className="text-slate-800 font-[500] flex items-center ">
										<span className="-mb-[2px] mr-2">
											<FlatIcon icon="rr-calendar" />
										</span>
										{formatDateMMDDYYYY(
											new Date(data?.date)
										)}
									</span>
									<div className="flex items-center">
										<span className="-mb-[2px] mr-2">
											<FlatIcon icon="rr-clock" />
										</span>
										<span>{data?.slot?.start_time}</span>
										<span className="mx-2">-</span>
										<span>{data?.slot?.end_time}</span>
									</div>
								</div>
							);
						},
					},
					{
						header: "Doctor",
						className: "text-left",
						tdClassName: "text-left",
						key: "doctor",
						cell: (data) => {
							return data?.doctor?.name;
						},
					},
					{
						header: "Status",
						className: "text-left",
						tdClassName: "text-left",
						key: "status",
					},
					{
						header: "Action",
						className: "",
						tdClassName: "text-center",
						key: "action",
						cell: (data) => {
							return (
								<div className="w-full flex items-center">
									<ActionBtn className="!w-11 mx-auto">
										<FlatIcon icon="rr-eye" />
									</ActionBtn>
								</div>
							);
						},
					},
				]}
				data={data}
			/>
			<Pagination
				page={page}
				setPage={setPage}
				pageCount={meta?.last_page}
				pageSize={paginate}
				setPageSize={setPaginate}
			/>
			<NewAppointmentModal
				ref={appointmentRef}
				onSuccessCallBack={() => {
					setFilters((prevFilters) => ({
						...prevFilters,
						key: uuidv4(),
					}));
				}}
			/>
		</div>
	);
};

export default PatientAppointments;
