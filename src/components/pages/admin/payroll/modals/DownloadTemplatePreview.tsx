import { useEffect, useState } from "react";
import { MdUnfoldMore } from "react-icons/md";
import axios from "axios";
import toast from 'react-hot-toast';
import CustomToast from "@/components/Toast/CustomToast";
import classNames from "@/helpers/classNames";

interface TemplatePreviewProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function TemplatePreview({ isOpen, onClose }: TemplatePreviewProps) {
	const [typeClick, setTypeClickState] = useState({
		one: true,
		two: false
	})

	useEffect(() => {
		if (!isOpen) setTypeClickState({ one: true, two: false })
	}, [isOpen])

	const handleDownload = async () => {
		const endpoint = typeClick.one ? 'https://yp3.yahshuasolutions.com/api/daily-logs/csv/' : '';
		try {
			if(endpoint !== ''){
				const response = await axios.get(endpoint, { responseType: 'blob' });
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', typeClick.one ? 'dailyLogs1.csv' : 'dailyLogs2.csv');
				document.body.appendChild(link);
				link.click();
			}

			toast.custom(() => <CustomToast message={`Successfully downloaded template.`} type='success' />, {
				duration: 4000
			})
		} catch (error) {
			console.error("Error", error);
			throw new Error('Error downloading template. Please try again.');
		}
	}

	return (
		<>
			{isOpen && (
				<div className="absolute z-50 block">
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
							<div className="fixed inset-0 transition-opacity">
								<div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
							</div>
							<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
							<div className="inline-block w-11/12 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:pb-6 sm:max-w-screen-sm min-w-max">
								<div className="flex justify-between w-full p-5">
									<div className=""></div>
									<p className="items-center self-center flex-auto my-2 text-xl font-semibold text-center">What template do you want to use? 🧐</p>
									<button type="button" onClick={onClose} className="items-end self-center rounded-full bg-[#A3AEBD] h-6 w-6 ml-auto">
										<svg className="text-white inline-flex items-center text-center h-2.5"
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
												fill="white"
											/>
										</svg>
									</button>
								</div>
								<div className="flex flex-row items-stretch justify-center w-full h-full px-6">
									<div className="grid gap-7">
										<div onClick={() => setTypeClickState({ one: true, two: false })} className={classNames("flex flex-col justify-center cursor-pointer bg-white pl-6 py-5 pr-10", typeClick.one ? 'border-y border-l border-blue-600 rounded-bl-lg rounded-l-lg rounded-tl-lg z-50 border-r-1 border-r-white' : '')}>
											<div className="relative flex items-center justify-center">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={classNames("bi bi-calendar4 w-12 h-12", typeClick.one ? 'text-blue-700' : 'text-[#C7C7C7]')} viewBox="0 0 16 16">
													<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
												</svg>
												<div className={classNames("absolute -bottom-1 right-2 text-xs rounded-full h-6 w-6 flex items-center justify-center outline-4 outline-offset-0 outline text-center outline-white text-white", typeClick.one ? 'bg-blue-600' : 'bg-[#C7C7C7]')}>
													1
												</div>
											</div>
											<p className={classNames("my-4 text-center font-semibold", typeClick.one ? 'text-slate-900' : 'text-[#C7C7C7]')}>Daily Logs 1</p>
											<button disabled={!typeClick.one} onClick={handleDownload} className={classNames("py-1.5 px-2.5 rounded text-white", typeClick.one ? 'bg-blue-600' : 'bg-[#C7C7C7]')}>Download</button>
										</div>
										<div onClick={() => setTypeClickState({ one: false, two: true })} className={classNames("flex flex-col justify-center cursor-pointer bg-white pl-6 py-5 pr-10", typeClick.two ? 'border-y border-l border-blue-600 rounded-bl-lg rounded-l-lg rounded-tl-lg z-50 border-r-1 border-r-white' : '')}>
											<div className="relative flex items-center justify-center">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={classNames("bi bi-calendar4 w-12 h-12", typeClick.two ? 'text-blue-700' : 'text-[#C7C7C7]')} viewBox="0 0 16 16">
													<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
												</svg>
												<div className={classNames("absolute -bottom-1 right-2 text-xs rounded-full h-6 w-6 flex items-center justify-center outline-4 outline-offset-0 outline text-center outline-white text-white", typeClick.two ? 'bg-blue-600' : 'bg-[#C7C7C7]')}>
													2
												</div>
											</div>
											<p className={classNames("my-4 text-center font-semibold", typeClick.two ? 'text-slate-900' : 'text-[#C7C7C7]')}>Daily Logs 2</p>
											<button disabled={!typeClick.two} onClick={handleDownload} className={classNames("py-1.5 px-2.5 rounded text-white", typeClick.two ? 'bg-blue-600' : 'bg-[#C7C7C7]')}>Download</button>
										</div>
									</div>
									{previewTable(typeClick)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

const previewTable = (typeClick: any) => {
	const sampleA = [
		{
			id: 1,
			date: "2024-05-01", 
			type: "C/In",
			employee_id: "101",
			time: "May 1, 2024 | 08:30 AM",
		},
		{
			id: 2,
			date: "2024-05-01", 
			type: "C/In",
			employee_id: "101",
			time: "May 1, 2024 | 08:30 AM",
		},
		{
			id: 3,
			date: "2024-05-01", 
			type: "I",
			employee_id: "101",
			time: "08:30 AM",
		},
		{
			id: 4,
			date: "2024-05-01", 
			type: "O",
			employee_id: "101",
			time: "08:30 AM",
		}
	]

	const sampleB = [
		{
			id: 1,
			date: "2024-05-01", 
			employee_id: "101",
			time_in_1: "08:30:02 AM",
			time_out_1: "",
			time_in_2: "",
			time_out_2: "05:53:27 PM",
		},
		{
			id: 2,
			date: "2024-05-01", 
			employee_id: "101",
			time_in_1: "08:30:02 AM",
			time_out_1: "12:30:00 PM",
			time_in_2: "01:00:02 PM",
			time_out_2: "05:53:27 PM",
		},
		{
			id: 3,
			date: "2024-05-01", 
			employee_id: "101",
			time_in_1: "08:30:02 AM",
			time_out_1: "",
			time_in_2: "",
			time_out_2: "05:53:27 PM",
		},
		{
			id: 4,
			date: "2024-05-01", 
			employee_id: "101",
			time_in_1: "08:30:02 AM",
			time_out_1: "12:30:00 PM",
			time_in_2: "01:00:02 PM",
			time_out_2: "05:53:27 PM",
		}
	]
	return (
		<>
			<div className={classNames("overflow-y-auto max-h-96 self-stretch border-blue-700 border-t border-b rounded-br-lg rounded-tr-lg px-6 rounded-r-lg border-r border-l z-30 -ml-px", typeClick.one ? 'rounded-b-lg rounded-t-none' : 'rounded-b-none rounded-t-lg')}>
				<p className="items-start self-start my-3 text-lg font-semibold">Template Preview</p>
				<table className="w-full table-auto">
						<thead className="sticky top-0 text-xs uppercase border-b-2">
							{typeClick.one ? (
								<tr className="bg-[#F9F9F9]">
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">Date</p>
											<span className="text-blue-600"><MdUnfoldMore className="w-4 h-4" /></span>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">Employee ID</p>
											<span className="text-blue-600"><MdUnfoldMore className="w-4 h-4" /></span>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">Type</p>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">Time</p>
										</div>
									</th>
								</tr>
							) : (
								<tr className="bg-[#F9F9F9]">
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">Date</p>
											<span className="text-blue-600"><MdUnfoldMore className="w-4 h-4" /></span>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">Employee ID</p>
											<span className="text-blue-600"><MdUnfoldMore className="w-4 h-4" /></span>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">IN</p>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">OUT</p>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">IN</p>
										</div>
									</th>
									<th className="th-outer">
										<div className="flex flex-row justify-center items-center space-x-1.5">
											<p className="text-xs font-semibold">OUT</p>
										</div>
									</th>
								</tr>
							)}
						</thead>
						<tbody>
							{typeClick.one ? (sampleA.map((item: any) => (
								<tr id={item.id} className="z-10 p-4 text-center border-b border-blue-gray-50">
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.employee_id}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.type}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.time}
										</p>
									</td>
								</tr>
							))) : (sampleB.map((item: any) => (
								<tr id={item.id} className="z-10 p-4 text-center border-b border-blue-gray-50">
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.employee_id}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.time_in_1}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.time_out_1}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.time_in_2}
										</p>
									</td>
									<td className="p-4 text-center border-b border-blue-gray-50">
										<p className="text-xs font-normal text-blue-gray-900">
											{item.time_out_2}
										</p>
									</td>
								</tr>
							)))}
						</tbody>
					</table>
			</div>
		</>
	)
}
