interface ManualModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ManualModal({ isOpen, onClose }: ManualModalProps) {
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
							<div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
								<div className="flex justify-between w-full p-5 bg-blue-600">
									<h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
										User Manual: How to Time In or Time Out
									</h3>
									<button type="button" onClick={onClose}>
										<svg
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
								<div className="items-center justify-start w-full px-5 pt-5 pb-0 h-96">
									<iframe className="w-full h-full" src="https://pdfobject.com/pdf/sample.pdf"></iframe>
								</div>
								<div className="items-center justify-center w-full px-10 my-2 sm:mt-4 sm:flex sm:flex-row-reverse">
									<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
										<button type="button" onClick={onClose}
											className="justify-center w-full px-12 py-4 -mt-10 text-base font-bold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md shadow-sm drop-shadow-xl focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
											Continue
										</button>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
