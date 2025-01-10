import { useState} from 'react';
import VideoModal from './modals/VideoModal';
import ManualModal from './modals/ManualModal';

export default function Tutorial() {
	const [videoModalState, setVideoModalState] = useState(false);
	const [manualModalState, setManualModalState] = useState(false);

	const handleVideoModalClose = () => {
		setVideoModalState(false);
	};

	const handleManualModalClose = () => {
		setManualModalState(false);
	};

	return (
		<>
			<VideoModal isOpen={videoModalState} onClose={handleVideoModalClose} />
			<ManualModal isOpen={manualModalState} onClose={handleManualModalClose} />
			<div className="mb-7">
				<p className="text-xl font-semibold text-center">
					How would you like to know how to Time In or
				</p>
				<p className="text-xl font-semibold text-center">Time Out in The ABBA Timekeeper?</p>
			</div>
			<div className="grid items-center justify-center grid-cols-2 gap-6 justify-items-center">
				<div onClick={() => setVideoModalState(true)} 
					className={`bg-white h-full shadow-md drop-shadow-sm px-8 py-6 rounded-lg cursor-pointer w-96 flex flex-row space-x-3 justify-center items-center`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-16 h-16 text-blue-600 bi bi-play-circle-fill" viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
					</svg>
					<p className="text-lg font-semibold text-justify text-blue-500">Watch a tutorial video</p>
				</div>
				<div onClick={() => setManualModalState(true)} 
					className={`bg-white h-full shadow-md drop-shadow-sm px-8 py-6 rounded-lg cursor-pointer w-96 flex flex-row space-x-3 justify-center items-center`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-16 h-16 text-blue-600 bi bi-journals" viewBox="0 0 16 16">
						<path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2" />
						<path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0" />
					</svg>
					<p className="text-lg font-semibold text-justify text-blue-500">Read User Manual</p>
				</div>
			</div>
		</>
	)
}