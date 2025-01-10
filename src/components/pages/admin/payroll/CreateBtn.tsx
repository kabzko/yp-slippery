import { useState } from "react";
import CreateFormModal from "./modals/CreateForm";

export default function CreateBtn() {
	const [createModalState, setCreateModalState] = useState(false)

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
			<div className="relative group">
				<button onClick={handleOpen} className="py-2.5 bg-blue-500 text-white rounded-lg px-9">
					Create
				</button>
				<span className="absolute z-10 w-56 scale-0 rounded-lg bg-[#344960] p-4 text-xs text-white group-hover:scale-100 flex -top-4 -left-60">
					<p className="text-xs font-normal text-left">
						To manually add logs, click create button.
					</p>
					<div className="absolute w-3 h-3 bg-[#344960] transform rotate-45 bottom-5 -right-1.5"></div>
				</span>
			</div>
		</>
	)
}