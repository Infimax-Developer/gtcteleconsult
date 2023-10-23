import Axios from "../libs/axios";

const useClinic = () => {
	const getDoctors = () => {
		return Axios.get(`/v1/clinic/doctors`);
	};
	const getTimeSlots = ({ doctor_id, date }) => {
		//2023-10-20
		return Axios.get(
			`/v1/telemedicine/schedules?doctor_id=${doctor_id}&date=${date}`
		);
	};
	const bookSchedule = (formData) => {
		//2023-10-20
		return Axios.get(`/v1/telemedicine/booked`, formData);
	};
	return {
		getDoctors,
		getTimeSlots,
		bookSchedule,
	};
};

export default useClinic;
