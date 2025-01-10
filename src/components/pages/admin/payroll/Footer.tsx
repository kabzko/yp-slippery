import { useContext, useState } from "react";
import { DailyLogsContext, ProgressIndicatorContext } from '../../../contexts';
import SkipProcessModal from "../../../modal/SkipModal";
import ConfirmProceedModal from "./modals/ConfirmProceedModal";

export default function Footer() {
  const { step, setStep, payrollProcessType } = useContext(DailyLogsContext);
  const { progressDispatch, progressState, skippedProgress, setSkippedProgressState } = useContext(ProgressIndicatorContext);
  const [skipModalState, setSkipModalState] = useState(false);
  const [confirmProceedState, setConfirmProceedState] = useState(false);
  
  // Calculate maxStep directly based on payrollProcessType
  const maxStep = 2; // Since both manual and other types have 2 steps

  const closeSkipModal = () => {
    setSkipModalState(false);
  };

  const handleBack = () => {
    setStep((prevStep: number) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleNextStep = () => {
    const progressValues = [73, 78];
    const progress = progressState.overallProgress < progressValues[step - 1] ? progressValues[step - 1] : progressState.overallProgress;
    
    if (step < maxStep) {
      setStep(step + 1);
    }
    
    if (!skippedProgress && progressState.overallProgress < progress) {
      progressDispatch({
        type: 'UPDATE_STEP',
        payload: {
          step: 'importDailyLogs',
          progress: progress,
          inputs: {},
        },
      });
    }
  };

  const closeConfirmProceedModal = () => {
    setConfirmProceedState(false);
  }

  const handleSkipProcess = () => {
    progressDispatch({
      type: 'UPDATE_STEP',
      payload: {
        step: 'setUpCompanyPolicies',
        progress: progressState.steps['importDailyLogs'].progress,
        inputs: {},
      },
    });
    setSkippedProgressState(true);
    setSkipModalState(true);
  };

  const isNextDisabled = payrollProcessType === "";

  return (
    <>
      <SkipProcessModal isOpen={skipModalState} onClose={closeSkipModal} progress={progressState.steps['importDailyLogs'].progress} />
      <ConfirmProceedModal isOpen={confirmProceedState} onClose={closeConfirmProceedModal} />
      <div className="flex justify-between items-center px-10 py-5 bg-white outline outline-1 outline-slate-200 border-t-1 border-slate-300">
        <button
          onClick={handleBack}
          disabled={step === 1} 
          className="prev-step"
        >
          Back
        </button>
        <div className="space-x-4">
          <button className="py-3 font-semibold text-blue-600 underline" onClick={handleSkipProcess}>
            I'll do this later.
          </button>
          {step < maxStep ? (
            <button
              disabled={isNextDisabled}
              onClick={handleNextStep}
              className="next-step disabled:cursor-wait disabled:bg-slate-500"
            >
              Next
            </button>
          ) : (
            <button
              disabled={isNextDisabled}
              onClick={() => setConfirmProceedState(true)}
              className="next-step disabled:cursor-wait disabled:bg-slate-500"
            >
              Proceed
            </button>
          )}
        </div>
      </div>
    </>
  );
}
