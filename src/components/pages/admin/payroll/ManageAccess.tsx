import {  useEffect, useState } from "react";
import PayrollPH from "../../../../assets/payroll-ph-img.png";
import SproutSolutions from "../../../../assets/sprout-solutions-logo.png";
import Zoho from "../../../../assets/zoho-payroll.png";
import ADP from "../../../../assets/ADP-Logo.png";
import YPO from "../../../../assets/yahshua-payroll-logo.png"

type CloudBasedType = {
	payroll: boolean;
	adp: boolean;
	sprout: boolean;
	zoho: boolean;
}

interface Props {
	isOpen: boolean;
	onClose: () => void;
	cloudBasedType: CloudBasedType;
	handleSyncLoadingOpen: () => void;
}

export default function ManageAccess({ isOpen, onClose, cloudBasedType, handleSyncLoadingOpen }: Props) {
	const [text, setText] = useState('');
	const renderLogo = () => {
		if (cloudBasedType.payroll) {
			return <img src={PayrollPH} className="w-full h-6" alt="Payroll.ph logo" />
		} else if (cloudBasedType.adp) {
			return <img src={ADP} className="w-10 h-6" alt="ADP® IHCM logo" />
		} else if (cloudBasedType.sprout) {
			return <img src={SproutSolutions} className="w-full h-11" alt="Sprout Solutions logo" />
		} else if (cloudBasedType.zoho) {
			return <img src={Zoho} className="w-9 h-9" alt="Zoho Payroll logo" />
		} else {
			return null
		}
	}

	useEffect(() => {
		if (cloudBasedType.payroll) {
			setText('Payroll.ph Account')
		} else if (cloudBasedType.adp) {
			setText('ADP® IHCM Account');
		} else if (cloudBasedType.sprout) {
			setText('Sprout Solutions Account')
		} else if (cloudBasedType.zoho) {
			setText('Zoho Payroll Account')
		} else {
			setText('')
		}
	}, [cloudBasedType])

	return (
		<>
			{(isOpen) && (
				<div className="absolute z-50 block">
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex flex-col items-center content-center justify-center min-h-screen text-center bg-fixed bg-center bg-no-repeat bg-cover bg-origin-content" style={{ height: 'inherit', alignItems: 'center', backgroundImage: `url('/media/YPS-OB_bg.png')` }}>
							<div className="relative p-5 transition-all transform bg-white rounded-lg shadow-xl w-fit -left-80">
								{renderLogo()}
							</div>
							<div className="inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:max-w-screen-sm min-w-min h-max">
								<div className="w-full h-full py-10 px-14">
									<div className="flex flex-col self-center space-y-3">
										<p className="mb-3.5 font-semibold text-xl">Hey, YAHSHUA Creatives Studio! 👋</p>
										<div className="flex flex-row space-x-5">
											<div className="py-6 pl-12 rounded-lg outline outline-1 pr-9">
												<img src={YPO} className="w-20 h-20" alt="Zoho Payroll logo" />
											</div>
											<article className="self-center text-3xl font-semibold text-wrap">
												<p>YAHSHUA Payroll wants</p>
												<p>access to your {text}</p>
											</article>
										</div>
										<div className="pb-5 text-wrap">
											<p className="my-3 text-xl font-semibold">Make sure that you trust YAHSHUA Payroll</p>
											<p>You may be sharing sensitive info with this site or app. Find out how YAHSHUA Payroll will handle your data by reviewing its <span className="text-blue-600">terms of service</span> and <span className="text-blue-600">privacy policies</span>. You can always see or remove access in your account.</p>
										</div>
										<div className="flex flex-row justify-between space-x-48">
											<button type="button" onClick={onClose} className="bg-white w-full rounded-lg outline outline-1 outline-blue-600 py-3.5">
												Cancel
											</button>
											<button type="button" onClick={handleSyncLoadingOpen} className="bg-blue-600 w-full rounded-lg py-3.5 text-white hover:bg-blue-700">
												Continue
											</button>
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