/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Fade, Zoom } from "react-reveal";
import { Dialog, Transition } from "@headlessui/react";
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import Axios from "../../libs/axios";
import useClinic from "../../hooks/useClinic";
import {
	dateYYYYMMDD,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	patientFullName,
} from "../../libs/helpers";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InfoText from "../InfoText";
// [ { label: "8:00 AM - 8:30 AM", value: "8:00 AM - 8:30 AM", }, { label: "8:30 AM - 9:00 AM", value: "8:30 AM - 9:00 AM", }, { label: "9:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, { label: "10:00 AM - 10:30 AM", value: "10:00 AM - 10:30 AM", }, { label: "10:30 AM - 11:00 AM", value: "10:30 AM - 11:00 AM", }, { label: "11:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, ]
const ShowAppointmentModal = (props, ref) => {
	const { title, children, size = "modal-md" } = props;
	const [appointment, setAppointment] = useState(null);
	const [mount, setMount] = useState(0);

	const [linkURl, setLinkURL] = useState(
		`${origin}/consultation?channel=Test&token=007eJxTYPB0eaO9vEotrTPAwflN1reHeX95n5YKPl2rc9CJYevVElMFBktLi7Q0I7OktBQzS5OUpNREixQDo7Tk1DRTy9QUQ7OkOFmz1IZARob74cZMjAwQCOKzMISkFpcwMAAAYbIfig`
	);
	const [modalOpen, setModalOpen] = useState(false);
	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useEffect(() => {}, []);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		if (data) {
			setAppointment(data);
		}
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const copyLink = async () => {
		// Copy the text inside the text field
		await window.navigator.clipboard.writeText(linkURl);
		hide();

		// Alert the copied text
		alert("Copied the text: " + linkURl);
	};
	const submit = (data) => {};
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={hide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-50" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex items-center text-gray-900"
								>
									<span className="text-lg">
										Appointment Details
									</span>
									<span
										className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-200 duration-200 cursor-pointer text-red-600"
										onClick={hide}
									>
										<FlatIcon
											icon="rr-cross-small"
											className="text-lg"
										/>
									</span>
								</Dialog.Title>
								<div className="px-4 flex flex-col gap-y-3">
									<InfoText
										icon="rr-calendar"
										labelClassName="flex justify-between"
										// className="lg:col-span-12"
										title="Date "
										contentClassName="pl-2"
										value={formatDateMMDDYYYY(
											new Date(appointment?.date)
										)}
									/>
									<InfoText
										icon="rr-clock"
										labelClassName="flex justify-between"
										// className="lg:col-span-12"
										title="Start Time"
										contentClassName="pl-2"
										value={appointment?.slot?.start_time}
									/>
									<InfoText
										icon="rr-clock"
										labelClassName="flex justify-between"
										// className="lg:col-span-12"
										title="End Time"
										contentClassName="pl-2"
										value={appointment?.slot?.end_time}
									/>
									<InfoText
										icon="rr-user-md"
										labelClassName="flex justify-between"
										className="mt-5"
										title="Doctor"
										contentClassName="pl-2"
										value={appointment?.doctor?.name}
									/>
									<InfoText
										icon="rr-user"
										labelClassName="flex justify-between"
										className="mb-5"
										title="Patient"
										contentClassName="pl-2"
										value={patientFullName(
											appointment?.patient
										)}
									/>
									<InfoText
										icon="rr-notes"
										labelClassName="flex justify-between"
										// className="lg:col-span-12"
										title="Notes"
										contentClassName="pl-2"
										value={appointment?.notes}
									/>

									<div className="flex flex-col items-center justify-center">
										<span className="text-center text-sm text-slate-400">
											Virtual Consultation link
										</span>
										<input
											id="linkUrl"
											style={{
												display: "inline-block",
												overflow: "hidden",
												whiteSpace: "wrap",
											}}
											className="text- mb-4 p-4 select-all rounded-xl max-w-[100%] break-all bg-blue-50 w-full"
											value={`${linkURl}&patient=${appointment?.patient?.id}`}
											onClick={copyLink}
										/>
										<ActionBtn
											type="secondary"
											className="mx-5 mt-2 gap-3"
											onClick={() => {
												copyLink();
												// hide();
											}}
										>
											<FlatIcon icon="rr-video-plus" />
											Copy Link
										</ActionBtn>
									</div>
								</div>

								<div className="p-4 flex items-center justify-end">
									<ActionBtn
										type="success"
										className="mr-auto"
										// onClick={setAsDone}
									>
										Set as done
									</ActionBtn>
									<ActionBtn
										className="ml-auto"
										onClick={hide}
									>
										Close
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(ShowAppointmentModal);
