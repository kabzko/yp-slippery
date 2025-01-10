import { useState, useContext } from "react";
import CreateEmployeeModal from "./modals/CreateEmployeeModal";
import { EmployeeRegistrationContext } from "../../../contexts";

export default function CreateBtn() {
	const [createModalState, setCreateModalState] = useState(false)
	const { step } = useContext(EmployeeRegistrationContext)

	const handleOpen = () => {
		if (step === 1) setCreateModalState(true)
	}

	const handleClose = () => {
		if (step === 1) setCreateModalState(false);
	}

	return (
		<>
			<CreateEmployeeModal isOpen={createModalState} onClose={handleClose} />
			{step === 1 && (
				<button onClick={handleOpen} className="py-2.5 bg-blue-500 text-white rounded-lg px-9">
					Create
				</button>
			)}
		</>
	)
}