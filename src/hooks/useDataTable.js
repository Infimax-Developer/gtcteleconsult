import { useEffect, useState } from "react";
import Axios from "../libs/axios";

const useDataTable = (props) => {
	const { url = "", defaultFilters } = props;
	const [loading, setLoading] = useState(true);
	const [paginate, setPaginate] = useState(10);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState(null);
	const [data, setData] = useState([]);

	const [column, setColumn] = useState("");
	const [direction, setDirection] = useState("");
	const [filters, setFilters] = useState(defaultFilters || {});
	let stringFilters = JSON.stringify(filters);
	const transformFilters = () => {
		let str = "";
		Object.keys(filters).map((key, index) => {
			str += `${index == 0 ? "" : "&"}${key}=${filters[key]}`;
		});
		return str;
	};
	useEffect(() => {
		let t = setTimeout(() => {
			// console.log("useEffecttttttt", page, paginate, stringFilters);
			fetchData();
		}, 250);
		return () => {
			clearTimeout(t);
		};
	}, [page, paginate, stringFilters]);
	const fetchData = () => {
		setLoading(true);
		Axios.get(
			`${url}?page=${page}&paginate=${paginate}&${transformFilters()}`
		)
			.then((res) => {
				setData(res?.data?.data);
				setMeta(res?.data?.meta);
				setLoading(false);
			})
			.catch((e) => {
				console.log("error loading", e, e?.message);
				setLoading(false);
			});
	};

	return {
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
	};
};

export default useDataTable;
