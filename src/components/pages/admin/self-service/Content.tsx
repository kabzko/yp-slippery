import React, { useState, useEffect, useContext } from "react";
import Schedule from "./schedule/Schedule";
import Division from "./division/Division";
import Section from "./section/Section";
import Unit from "./Unit/Unit";
import SubUnit from "./subunit/SubUnit";
import Stepper from "./stepper/Stepper";
import StepperButtons from "./stepper/Button";
import Location from "./location/Location";
import { SelfServiceContext, ProgressIndicatorContext } from "@/components/contexts";
import backgroundImage from "@/assets/YPS-OB_bg.png";
import { getOptimizedBackgroundUrl } from '@/config/images';

const Content = () => {
	const [step, setStep] = useState(1);
	const [selectedRows, setSelectedRows] = useState([]) as any[];
	const { progressState, progressDispatch } = useContext(ProgressIndicatorContext);  
	const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

	useEffect(() => {
		const industry = localStorage.getItem('industry');
		setSelectedIndustry(industry);
	}, []);

	const handleNext = () => {
		if (selectedIndustry === '3') {
			if (step < 6) {
				setStep(step + 1);
			} else {
				setStep(1);
			}
		} else {
			if (step < 2) {
				setStep(step + 1);
			} else {
				setStep(1);
			}
		}

		progressDispatch({
			type: 'UPDATE_STEP',
			payload: {
				step: `step${step + 1}`, 
				progress: (step + 1) * 10, 
				inputs: {}, 
			},
		});
	};

	const handleBack = () => {
		setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
	};

	const optimizedBgUrl = getOptimizedBackgroundUrl(backgroundImage);

	return (
		<SelfServiceContext.Provider value={{ selectedRows, setSelectedRows, step, setStep }}>
			<div className="flex flex-col h-screen">
				<Stepper step={step} />
				<div 
					className="flex flex-col content-center justify-center py-5 bg-fixed bg-center bg-no-repeat bg-cover xl:px-40 gap-y-5 bg-origin-content" 
					style={{ 
						height: 'inherit', 
						alignItems: 'center', 
						backgroundImage: `url(${optimizedBgUrl})`, 
						backgroundSize: 'cover', 
						backgroundPosition: 'center',
					}}
				>
					{/* Display overall progress */}
					{/* <div>
						<p>Overall Progress: {overallProgress}%</p>
					</div> */}

					{step === 1 && <Location />}
					{step === 2 && <Schedule />}
					{selectedIndustry === '3' && step >= 3 && step <= 6 && (
						<>
							{step === 3 && <Division />}
							{step === 4 && <Section />}
							{step === 5 && <Unit />}
							{step === 6 && <SubUnit />}
						</>
					)}
				</div>
				<StepperButtons onBack={handleBack} onNext={handleNext} step={step} />
			</div>
		</SelfServiceContext.Provider>
	);
};

export default Content;
