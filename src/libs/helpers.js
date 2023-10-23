const week_day = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const months_short = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const calculateAge = (dateToFormat) => {
	if (dateToFormat) {
		var today = new Date();
		var birthDate = new Date(dateToFormat);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	} else {
		return "";
	}
};
const formatDate = (dateToFormat) => {
	if (dateToFormat) {
		let date = new Date(dateToFormat);
		return (
			months[date.getMonth()] +
			" " +
			date.getDate() +
			", " +
			date.getFullYear()
		);
	}
	return "";
};

const getWeekDay = (date) => {
	let d = new Date();

	if (date) {
		d = new Date(date);
	}
	return week_day[d.getDay()];
};
const formatDateTime = (dateToFormat) => {
	if (dateToFormat) {
		let date = new Date(dateToFormat);
		return (
			months[date.getMonth()] +
			" " +
			date.getDate() +
			", " +
			date.getFullYear() +
			" " +
			(date.getHours() == 0 ? "12" : date.getHours()) +
			":" +
			date.getMinutes() +
			(date.getHours() > 12 ? " PM" : " AM")
		);
	}
	return "";
};

const replaceFname = (text) => {
	if (text) {
		return text.includes("Ivan Krister") ? "John" : text;
	}
	return "";
};
const replaceMname = (text) => {
	if (text) {
		return text.includes("Bungabong") ? "B." : text;
	}
	return "";
};
const replaceLname = (text) => {
	if (text) {
		return text.includes("Garcia") ? "Dean" : text;
	}
	return "";
};

const localArraySearch = (
	data /* DATA LIST */,
	keyword /* Search keyword */
) => {
	return data.filter((item) => {
		let obj_array = Object.keys(item).map((key) => {
			return String(item[key]).toLowerCase();
		});

		return obj_array.join(" ").includes(String(keyword).toLowerCase());
	});
};

const isBase64 = (dataURI) => {
	return dataURI.indexOf("base64");
};
const dataURItoBlob = (dataURI) => {
	if (dataURI == "" || typeof dataURI === "undefined") return "";
	let byteString;
	if (dataURI.split(",")[0].indexOf("base64") >= 0)
		byteString = atob(dataURI.split(",")[1]);
	else byteString = unescape(dataURI.split(",")[1]);
	let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
	let ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	const randomKey =
		Math.random().toString(36).substring(2, 12) +
		Math.random().toString(36).substring(2, 15);

	const type = mimeString.split("/").pop();
	const blobResult = new Blob([ia], {
		type: mimeString,
	});
	blobResult.name = `PATIENT-AVATAR-${randomKey}.${type}`;
	blobResult.hashName = blobResult.name;
	// blobResult.type = type
	return blobResult;
};

const uploadImage = (fileData, onProgress, cancelToken) => {
	const config = {
		cancelToken,
		headers: {
			"content-type": "multipart/form-data",
		},

		onUploadProgress: (progressEvent) => onProgress(progressEvent),
	};

	const form = new FormData();
	const file = dataURItoBlob(fileData);
	form.append("name", file.name);
	form.append("type", file.type);
	form.append("size", file.size);
	form.append("image", file, file.name);

	return axios
		.post(uri, form, config)
		.then((result) => {
			console.log(result);
			return Promise.resolve(result);
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};
function calculateAgeV2(date) {
	//date *new Date(date)
	var ageDifMs = Date.now() - date;
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}
function calculateAgeV3(birthDate) {
	if (birthDate?.length == 0) return "-";
	let date = new Date(birthDate);
	//new Date(birthdate)
	var ageDifMs = Date.now() - date.getTime();
	var ageDate = new Date(ageDifMs);
	return (
		Math.abs(ageDate.getUTCFullYear() - 1970) + " yrs old"
		// Math.abs(ageDate.getUTCMonth()) +
		// " months"
	);
}
const dateToday = () => {
	let date = new Date();
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `${
		months[date.getMonth()]
	} ${date?.getDate()}, ${date?.getFullYear()} ${
		date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()
	}:${date?.getMinutes()} ${date?.getHours() >= 12 ? "PM" : "AM"}`;
};

const dateYYYYMMDD = () => {
	let d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(d.getDate()).padStart(2, "0")}`;
};
const timeHHII = () => {
	let date = new Date();
	return `${String(date?.getHours()).padStart(2, "0")}:${date?.getMinutes()}`;
};

const dateMMDDYYYY = () => {
	let d = new Date();
	return `${String(d.getDate()).padStart(2, "0")}-${String(
		d.getMonth() + 1
	).padStart(2, "0")}-${d.getFullYear()}`;
};
const dateMMDDYYYYHHIIA = (d = new Date()) => {
	return `${String(d.getDate()).padStart(2, "0")}-${String(
		d.getMonth() + 1
	).padStart(2, "0")}-${d.getFullYear()} ${
		date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()
	}:${date?.getMinutes()} ${date?.getHours() >= 12 ? "PM" : "AM"}`;
};

const formatDateMMDDYYYY = (date) => {
	return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
		2,
		"0"
	)}, ${date.getFullYear()}`;
};
const formatDateMMDDYYYYHHIIA = (date) => {
	return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
		2,
		"0"
	)}, ${date.getFullYear()} ${
		date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()
	}:${date?.getMinutes()} ${date?.getHours() >= 12 ? "PM" : "AM"}`;
};

const getDateCurrentTimeHHII = () => {
	let date = new Date();
	return `${
		date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()
	}:${date?.getMinutes()} ${date?.getHours() >= 12 ? "PM" : "AM"}`;
};
const patientMI = (patient) => {
	return patient?.middle?.length > 0
		? `${String(patient?.middle).substring(0, 1)}.`
		: "";
};
const patientFullName = (patient) => {
	let f = patient?.firstname || "";
	let m =
		patient?.middlename?.length > 0
			? `${String(patient?.middlename).substring(0, 1)}.`
			: patient?.middle?.length > 0
			? `${String(patient?.middle).substring(0, 1)}.`
			: "";
	let l = patient?.lastname || "";
	return `${f} ${m} ${l}`;
};

const patientAddress = (patient) => {
	let purok = patient?.purokData?.name ? patient?.purokData?.name + ", " : "";
	let brgy = patient?.barangayData?.name
		? patient?.barangayData?.name + ", "
		: "";
	let mun = patient?.municipalityData?.name
		? patient?.municipalityData?.name + ", "
		: "";
	let city = "Sarangani";
	return `${purok}${brgy}${mun}${city}`;
};

const getAbsoluteDiff = (val1, val2) => {
	return Math.abs(val1) - Math.abs(val2);
};

const isEvenNumber = (val) => {
	return val % 2;
};

const tConvert = (time_, add = 0) => {
	// Check correct time format and split into components
	let hr = String(parseInt(time_.toString().substr(0, 2)) + add).padStart(
		2,
		"0"
	);
	let time = `${hr}${time_.toString().substr(2, 3)}`;
	time = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

	if (time.length > 1) {
		// If time format correct
		time = time.slice(1); // Remove full string match value
		time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(""); // return adjusted time or original string
};

const getErrors = (errors, setError) => {
	if (
		(errors !== undefined || errors !== null) &&
		errors === Object(errors)
	) {
		for (let key in errors) {
			if (errors.hasOwnProperty(key)) {
				setError(key, {
					type: "manual",
					message: errors[key],
				});
			}
		}
	}
};
const formatCurrency = (number, currencyCode = "USD") => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currencyCode,
	})
		.formatToParts(number)
		.map((part) => {
			if (part.type === "currency") {
				return "";
			}
			return part.value;
		})
		.join("");
};

const getSumObj = (obj, objName) => {
	let total = 0;
	obj?.map((data) => {
		total += data[objName];
	});
	return formatCurrency(total);
};
const getBirthDayYYYYMMDD = (bday) => {
	if (bday == "UNKNOWN") {
		return "";
	}
	if (bday?.length > 0) {
		let str = String(bday).replace(/\-/g, "");
		return str;
	}
	return "";
};
const getStringArray = (data) => {
	if (data == "UNKNOWN") {
		return "";
	}
	if (data?.length > 0) {
		let a = String(data).replace(/\-/g, "");
		let str = String(data);
		return str;
	}
	return "";
};
const motherMaindenName = (str) => {
	if (str == "UNKNOWN") {
		return "";
	}
	if (str?.length > 0) {
		if (str.includes(" ,")) {
			str = str.replace(" ,", " ");
		}
		if (str.includes(",")) {
			str = str.replace(",", " ");
		}
		return str.split(" ");
	}
	return "";
};
export {
	getSumObj,
	formatCurrency,
	months,
	formatDate,
	calculateAge,
	replaceFname,
	replaceMname,
	replaceLname,
	localArraySearch,
	dataURItoBlob,
	isBase64,
	formatDateTime,
	calculateAgeV2,
	dateToday,
	getDateCurrentTimeHHII,
	dateYYYYMMDD,
	dateMMDDYYYY,
	dateMMDDYYYYHHIIA,
	months_short,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	calculateAgeV3,
	patientFullName,
	getWeekDay,
	getAbsoluteDiff,
	timeHHII,
	isEvenNumber,
	tConvert,
	getErrors,
	patientAddress,
	patientMI,
	getBirthDayYYYYMMDD,
	getStringArray,
	motherMaindenName,
};
