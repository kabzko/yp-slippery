import React, { useContext, useEffect, useState } from "react";
import Saly3 from "../../../../../assets/Saly-3.png";
import classNames from "../../../../../helpers/classNames";
import useLogSync from '../hooks/useLogSync';
import { LogsContext } from "../../../../contexts";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	dates: {
		dateFrom: string;
		dateTo: string;
	};
	setDates: React.Dispatch<React.SetStateAction<{
		dateFrom: string;
		dateTo: string;
	}>>;
	selectedCloudBasedType: string;
}

export default function SyncLoading({ isOpen, onClose, dates, selectedCloudBasedType }: Props) {
	const [progress, setProgress] = useState(100);
	const { setLogs } = useContext(LogsContext)
	const { logs } = useLogSync(selectedCloudBasedType, dates.dateFrom, dates.dateTo);

	useEffect(() => {
		console.log(dates, selectedCloudBasedType)
	},[dates, selectedCloudBasedType])

	// useEffect(() => {
	// 	if(!isLoading){
	// 		setLogs((prevLogs) => [...prevLogs, ...logs]);
	// 	}
	// },[isLoading])

	const renderText = () => {
		if (progress === 100) {
			return (
				<>
					<div className="text-base font-semibold text-center text-wrap">
						<p>We've successfully synced your timekeeping data from</p>
						<p>your previous payroll software to YAHSHUA Payroll.</p>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className="text-base font-semibold text-center text-wrap">
						<p>We're syncing your timekeeping data from</p>
						<p>your previous payroll software....</p>
					</div>
				</>
			);
		}
	}

	const handleContinue = () => {
		setLogs((prevLogs) => [...prevLogs, ...logs]);
		onClose()
	}

	useEffect(() => {
		if (isOpen) {
			const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 1)); // Increase progress (adjust speed as needed)
      }, 24); // Adjust the interval duration (milliseconds) for smoother animation

      return () => clearInterval(interval);
		}
	}, [isOpen]);

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
								<div className="flex flex-col items-center justify-center w-full pb-4 space-y-6 pt-11 px-28">
									<div className="">
										<img src={Saly3} className="w-full h-48" alt="Woman riding a rocket" />
									</div>
									<div className="relative w-full h-6 bg-gray-200 rounded-r-md rounded-l-md">
										{/* for testing the animation for progress */}
										{/* <div className="custom-progress-animation absolute top-0 left-0 h-full bg-gradient-to-r from-[#4EF5FF] to-[#2757ED] rounded-r-md rounded-l-md" /> x
										<div className="custom-regress-animation absolute top-0 right-0 h-full bg-gradient-to-r from-[#4EF5FF] to-[#2757ED] opacity-10 rounded-l-md rounded-r-md"/> 
										<div className="absolute w-8 h-8 transform translate-y-1/2 bg-white border-4 border-blue-500 rounded-full custom-marker-animation -top-5 ring-4 ring-white" />  */}

										<div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4EF5FF] to-[#2757ED] rounded-r-md rounded-l-md" style={{ width: `${progress}%` }} />
										<div className="absolute top-0 right-0 h-full bg-gradient-to-r from-[#4EF5FF] to-[#2757ED] opacity-10 rounded-l-md rounded-r-md" style={{ width: `${100 - progress}%` }} />
										<div className="absolute w-8 h-8 transform translate-y-1/2 bg-white border-4 border-blue-500 rounded-full -top-5 ring-4 ring-white" style={{ left: `calc(${progress}% - 1rem)` }} />
									</div>
									<div>{renderText()}</div>
								</div>
								<div className="flex flex-row justify-center mt-2 space-x-48">
									<button type="button" onClick={handleContinue} className={classNames('', progress === 100 ? 'bg-blue-600 text-white w-44 rounded-lg py-3 uppercase text-xs' : 'hidden')}>
										Continue
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
