interface VideoModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
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
							<div className="inline-block overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-zinc-900 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
								<div className="flex justify-end w-full p-5">
									<button type="button" onClick={onClose}>
										<svg className="text-white"
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
								<div className="items-center justify-center w-full px-10 sm:mt-4 sm:flex sm:flex-row-reverse">
									<div style={{ width: "100%", height: "300px", overflow: "hidden" }}>
										<video className="w-full h-full" controls preload="none">
											<source src="https://ik.imagekit.io/ikmedia/example_video.mp4" />
											Your browser does not support the video tag.
										</video>
									</div>
								</div>
								<div className="items-center justify-center w-full px-10 my-2 sm:mt-4 sm:flex sm:flex-row-reverse">
									<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
										<button type="button" onClick={onClose}
											className="justify-center w-full px-12 py-4 -mt-10 text-base font-bold leading-6 text-blue-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md shadow-sm hover:bg-blue-500 hover:text-white drop-shadow-xl focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5 ring-offset-1 ring-1 ring-offset-blue-800">
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
