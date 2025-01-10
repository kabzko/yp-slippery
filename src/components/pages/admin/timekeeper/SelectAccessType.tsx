import { useContext } from "react";
import { TimekeeperContext } from "../../../contexts";

export default function SelectAccessType() {
	const { setAccessType, accessType, setStep } = useContext(TimekeeperContext);
	
	const selectedClass = (accessType: string, type: string) => {
		if (accessType === type) {
			return 'ring-2 ring-blue-400 drop-shadow-md';
		} else {
			return 'outline outline-1 outline-slate-300';
		}
	}

	const handleSelectedType = (type: string) => {
		setAccessType(type)
		setStep(2)
	}

	return (
		<>
			<div className="mb-7">
				<p className="text-xl font-semibold text-center">
					Please select the type of account to access
				</p>
				<p className="text-xl font-semibold text-center">the ABBA timekeeper.</p>
			</div>
			<div className="grid items-center justify-center gap-6 justify-items-center">
				<div onClick={() => handleSelectedType("1toM")} className={`bg-white h-full px-8 py-6 rounded-lg ${selectedClass(accessType, "1toM")} cursor-pointer w-96 space-y-3`}>
					<p className="text-lg font-semibold text-blue-600">1 is to Many (1 device for all)</p>
					<p className="text-justify">Multiple users may time in or time out to one account. This is mostly useful for those who are mounting The ABBA Timekeeper on a specific area in the office or work place.</p>
				</div>
				<div onClick={() => handleSelectedType("1to1")} className={`bg-white h-full px-8 py-6 rounded-lg ${selectedClass(accessType, "1to1")} cursor-pointer w-96 space-y-3`}>
					<p className="text-lg font-semibold text-blue-600">1 is to 1 (Individual)</p>
					<p className="text-justify">Only one user can time in or time out to one account. This is mostly useful for employee who work on field daily.</p>
				</div>
				<div onClick={() => handleSelectedType("Hybrid")} className={`bg-white h-full px-8 py-6 rounded-lg ${selectedClass(accessType, "Hybrid")} cursor-pointer w-96 space-y-3 self-center col-span-2`}>
					<p className="text-lg font-semibold text-blue-600">Hybrid (1 is to Many + 1 is to 1)</p>
					<p className="text-justify">Flexible time in or time out for users. They can time in or time out in a stationed device or time in or time out on their personal device in an authorized location.</p>
				</div>
			</div>
		</>
	)
}