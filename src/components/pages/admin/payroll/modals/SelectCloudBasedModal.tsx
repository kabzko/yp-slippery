import PayrollPH from "../../../../../assets/payroll-ph-img.png";
import SproutSolutions from "../../../../../assets/sprout-solutions-logo.png";
import Zoho from "../../../../../assets/zoho-payroll.png";
import ADP from "../../../../../assets/ADP-Logo.png";

type CloudBasedType = {
	payroll: boolean;
	adp: boolean;
	sprout: boolean;
	zoho: boolean;
}

interface Props {
	isOpen: boolean;
	onClose: () => void;
	setCloudBasedType: React.Dispatch<React.SetStateAction<CloudBasedType>>;
	cloudBasedType: CloudBasedType;
	setDateRangeModalState: React.Dispatch<React.SetStateAction<boolean>>;
	dateRangeModal: boolean;
}

export default function SelectCloudBased({ isOpen, onClose, cloudBasedType, setCloudBasedType, dateRangeModal, setDateRangeModalState }: Props) {
	const handleView = (type: keyof CloudBasedType) => {
		setCloudBasedType({
			payroll: false,
			adp: false,
			sprout: false,
			zoho: false,
			[type]: true
		});
	}

	const selectedClass = (type: keyof CloudBasedType) => {
		if (cloudBasedType[type]) {
			return 'ring-2 ring-blue-400 drop-shadow-md';
		} else {
			return 'outline outline-1 outline-slate-300';
		}
	}

	return (
		<>
			{(isOpen && !dateRangeModal) && (
				<div className="absolute z-20 block">
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
							<div className="fixed inset-0 transition-opacity">
								<div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
							</div>
							<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
							<div className="inline-block w-11/12 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:pb-6 sm:max-w-screen-sm min-w-max">
								<div className="flex justify-between w-full p-5">
									<div className=""></div>
									<p className="items-center self-center flex-auto my-2 text-xl font-semibold text-center">Select Cloud-based Payroll you previously used.</p>
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
									<div className="grid content-center justify-center grid-cols-4 gap-3 justify-items-stretch">
										<div onClick={() => { handleView('payroll') }} className={`bg-white cursor-pointer px-5 outline text-center outline-1 outline-[#878787] rounded-xl space-y-6 h-48 grid grid-rows-2 items-center content-center ${selectedClass('payroll')}`}>
											<div className="row-start-1 pt-10">
												<img src={PayrollPH} className="w-36 h-9" alt="Payroll.ph logo" />
											</div>
											<p className="row-start-2 font-semibold">Payroll.ph</p>
										</div>
										<div onClick={() => { handleView('adp') }} className={`bg-white cursor-pointer px-5 outline text-center outline-1 outline-[#878787] rounded-xl space-y-6 h-48 grid grid-rows-2 items-center content-center ${selectedClass('adp')}`}>
											<div className="row-start-1 pt-9">
												<img src={ADP} className="h-16 w-36" alt="ADP® IHCM logo" />
											</div>
											<p className="row-start-2 font-semibold">ADP® IHCM</p>
										</div>
										<div onClick={() => { handleView('sprout') }} className={`bg-white cursor-pointer px-5 outline text-center outline-1 outline-[#878787] rounded-xl space-y-6 h-48 grid grid-rows-2 items-center content-center ${selectedClass('sprout')}`}>
											<div className="row-start-1 pt-8">
												<img src={SproutSolutions} className="h-20 w-36" alt="Sprout Solutions logo" />
											</div>
											<p className="row-start-2 font-semibold">Sprout Solutions</p>
										</div>
										<div onClick={() => { handleView('zoho') }} className={`bg-white cursor-pointer px-5 outline text-center outline-1 outline-[#878787] rounded-xl space-y-6 h-48 grid grid-rows-2 items-center content-center ${selectedClass('zoho')}`}>
											<div className="row-start-1 pt-12 justify-self-center">
												<img src={Zoho} className="w-20 h-20" alt="Zoho Payroll logo" />
											</div>
											<p className="row-start-2 font-semibold">Zoho Payroll</p>
										</div>
									</div>
									<div className="self-center">
										<button onClick={() => { setDateRangeModalState(true) }} className="px-10 py-3 text-white bg-blue-600 rounded">
											Sync Payroll Logs
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