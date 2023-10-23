import { v4 as uuidv4 } from "uuid";

const uniqID = uuidv4();

const Table = (props) => {
	const {
		loading = true,
		className = "",
		tableClassName = "",
		theadClassName = "",
		tbodyClassName = "",
		columns = [],
		data = [],
	} = props;
	return (
		<div className={`w-full table ${className}`}>
			<table className=" min-h-[128px]">
				<thead>
					<tr>
						{columns?.map((col, index) => {
							return (
								<th
									key={`${uniqID}-th-${index}`}
									className={col?.className}
								>
									{col?.header}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className="relative">
					{loading ? (
						<div className="flex items-center justify-center  absolute top-0 left-0 h-full w-full bg-white text-slate-400 bg-opacity-70 animate-pulse backdrop-blur-sm">
							Loading...
						</div>
					) : data?.length == 0 ? (
						<tr>
							<td colSpan={9999}>No data to display.</td>
						</tr>
					) : (
						data?.map((rowData, trIndex) => {
							return (
								<tr key={`${uniqID}-tr-${trIndex}`}>
									{columns?.map((col, tdIndex) => {
										return (
											<td
												key={`${uniqID}-td-${trIndex}-${tdIndex}`}
												className={col?.tdClassName}
											>
												{col?.cell
													? col?.cell(rowData)
													: rowData[col?.key]}
											</td>
										);
									})}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
