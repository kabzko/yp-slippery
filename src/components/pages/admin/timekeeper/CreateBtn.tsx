import { useState, useContext } from "react";
import CreateFormModal from "./modals/CreateForm";
import { TimekeeperContext } from "../../../contexts";

export default function CreateBtn() {
	const [createModalState, setCreateModalState] = useState(false)
	// const { step, accessType, hybridTableType } = useContext(TimekeeperContext)

	const handleOpen = () => {
		setCreateModalState(true)
	}

	const handleClose = () => {
		setCreateModalState(false);
	}

	/* useEffect(() => {
		console.log(createModalState)
	},[createModalState]) */

	return (
		<>
			<CreateFormModal isOpen={createModalState} onClose={handleClose} />
			{/* {!(accessType === '1to1' || (accessType === 'Hybrid' && hybridTableType === '1to1')) ? (
				<button onClick={handleOpen} className="py-2.5 bg-blue-500 text-white rounded px-9">
					Create
				</button>
			): null} */}
			<button onClick={handleOpen} className="py-2.5 bg-blue-500 text-white rounded px-9">
				Create
			</button>
		</>
	)
}