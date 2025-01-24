import toast from 'react-hot-toast';
import CustomToast from '@/components/Toast/CustomToast';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function PlsDownload({ isOpen, onClose }: Props) {
	
	const showToast = (message: string, type: string) => {
		toast.custom(() => <CustomToast message={message} type={type} />, {
			duration: 4000,
		});
	};

	const handleDownload = (windows: boolean) => {
		if(windows){
		}else{
		}
		showToast("Successfully downloaded app apk.", "success");
	}

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
								<div className="flex justify-between w-full p-5">
									<div className=""></div>
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
									<div className="flex flex-col items-center justify-center">
										<div className="text-xl font-semibold text-center text-wrap">
											<p>Please download <span className="text-blue-600">The ABBA Biometric</span></p>
											<p><span className="text-blue-600">Integration App</span> to import your Daily</p>
											<p>Logs from your biometrics.</p>
										</div>
										<div className="flex items-center justify-center py-5 mt-6 rounded-md px-7 outline outline-1 outline-blue-700 w-max">
											<svg className="w-16 h-16 text-[#2757ED]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a28.076 28.076 0 0 1-1.091 9M7.231 4.37a8.994 8.994 0 0 1 12.88 3.73M2.958 15S3 14.577 3 12a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088A5.98 5.98 0 0 1 18 12a30 30 0 0 1-.464 6.232M6 12a6 6 0 0 1 9.352-4.974M4 21a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M7.5 19.336C9 17.092 9 14.845 9 12a3 3 0 1 1 6 0c0 .749 0 1.521-.031 2.311M12 12c0 3 0 6-2 9" />
											</svg>
										</div>
									</div>
									<div className="flex flex-col items-center space-y-4">
										<div onClick={() => { handleDownload(false) }} className='bg-blue-600 text-white w-60 rounded-lg py-3 uppercase text-xs flex justify-center items-center gap-2.5 cursor-pointer'>
											<p>Download for Mac</p>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-apple" viewBox="0 0 16 16">
												<path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
												<path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
											</svg>
										</div>
										<div onClick={() => { handleDownload(true) }} className='bg-white text-blue-600 outline-1 outline-blue-600 outline w-60 rounded-lg py-3 uppercase text-xs flex justify-center items-center gap-2.5 cursor-pointer'>
										<p>Download for Windows</p>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-windows" viewBox="0 0 16 16">
												<path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z" />
											</svg>
										</div>
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

