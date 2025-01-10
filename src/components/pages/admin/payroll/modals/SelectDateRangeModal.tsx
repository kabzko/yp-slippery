import React from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	setManageAccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dates: {
		dateFrom: string;
		dateTo: string;
	};
	setDates: React.Dispatch<React.SetStateAction<{
		dateFrom: string;
		dateTo: string;
	}>>;
}

export default function SelectDateRange({ isOpen, onClose, setManageAccessOpen, dates, setDates }: Props) {
	const setDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedDate = e.target.value;
		setDates(prev => ({ ...prev, dateFrom: selectedDate }))
	}

	const setDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedDate = e.target.value;
		const startDate = dates.dateFrom;

		const selectedDateObj = new Date(selectedDate);
		const startDateObj = new Date(startDate);

		if (selectedDateObj < startDateObj) {
			setDates(prev => ({ ...prev, dateTo: startDate }));
		} else {
			setDates(prev => ({ ...prev, dateTo: selectedDate }));
		}
	}

	const handleSyncButton = () => {
		setManageAccessOpen(true);
		onClose();
	}

	const datesNotSet = dates.dateFrom === '' || dates.dateTo === '';
	const text = () => {
		if (datesNotSet) return 'Invalid dates';
		else return 'Sync Payroll Logs';
	}

	return (
		<>
			{isOpen && (
				<div className="absolute z-40 block">
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
							<div className="fixed inset-0 transition-opacity">
								<div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
							</div>
							<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
							<div className="inline-block w-11/12 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:pb-6 sm:max-w-screen-sm min-w-max">
								<div className="flex justify-between w-full p-5">
									<div className=""></div>
									<p className="items-center self-center flex-auto my-2 text-xl font-semibold text-center">
										Choose timekeeping date range to sync.
									</p>
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
								<div className="flex flex-col items-stretch justify-center w-full h-full space-y-5 px-14">
									<div className="flex flex-row items-center justify-between space-x-14">
										<div className="w-full">
											<label className="font-semibold" htmlFor="start">Date From</label>
											<input className="input-text-modal" value={dates.dateFrom} type="date" placeholder="Select date:" id="start" name="trip-start"
												onChange={setDateFrom} min="2001-01-01" max={new Date().toISOString().split('T')[0]}
											/>
										</div>
										<div className="w-full">
											<label className="font-semibold" htmlFor="start">Date To</label>
											<input className="input-text-modal" value={dates.dateTo} type="date" placeholder="Select date:" id="start" name="trip-start"
												onChange={setDateTo} min="2001-01-01" max={new Date().toISOString().split('T')[0]}
											/>
										</div>
									</div>
									<div className="flex flex-row items-center justify-between">
										<button onClick={onClose} className="px-10 py-3 text-blue-600 bg-white rounded outline-blue-600 outline outline-1">
											Cancel
										</button>
										<button disabled={datesNotSet} onClick={handleSyncButton} className="px-10 py-3 text-white bg-blue-600 rounded disabled:bg-red-500 disabled:cursor-wait">
											{text()}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
