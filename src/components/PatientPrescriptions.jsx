/* eslint-disable react/prop-types */
import useDataTable from "../hooks/useDataTable";
import FlatIcon from "./FlatIcon";
import ActionBtn from "./buttons/ActionBtn";
import Pagination from "./table/Pagination";
import Table from "./table/Table";

const PatientPrescriptions = (props) => {
	const { patient } = props;
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
		url: `/v1/clinic/appointments/${patient?.id}`,
	});
	return (
		<div className="flex flex-col items-start">
			<h5 className="text-base font-semibold text-tertiary mb- border-b w-2/3 pb-2">
				Patient Prescriptions
			</h5>
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
							return formatDateMMDDYYYYHHIIA(
								new Date(data?.created_at)
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
						tdClassName: "text-center flex items-center",
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
		</div>
	);
};

export default PatientPrescriptions;
