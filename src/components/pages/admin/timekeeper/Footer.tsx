import { useContext, useState } from "react"; 
import { TimekeeperContext, ProgressIndicatorContext, AccountContext } from "../../../contexts";
import SkipProcessModal from "../../../modal/SkipModal";
import ConfirmProceedModal from "./modals/ConfirmProceedModal";

export default function Footer() {
  const [skipModalState, setSkipModalState] = useState(false);
  const { step, setStep, accessType } = useContext(TimekeeperContext);
  const { setSelectedRows } = useContext(AccountContext);
  const { progressState, progressDispatch, skippedProgress, setSkippedProgressState } = useContext(ProgressIndicatorContext);
  const [maxStep, setMaxStep] = useState(3);
  const [confirmProceedState, setConfirmProceedState] = useState(false);

  const handleBack = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
      setSelectedRows([]);
    }
  };

  const handleNext = () => {
    const maxSteps = accessType !== 'Hybrid' ? 3 : 4;
    const progressValues = accessType !== 'Hybrid' ? [56, 62, 68] : [56, 62, 68, 68];
    const progress = progressState.overallProgress < progressValues[step] ? progressValues[step] : progressState.overallProgress;
    setMaxStep(maxSteps);
    if (step < maxSteps) {
      setStep(step + 1);
    }
    if (!skippedProgress && progressState.overallProgress < progress) {
      progressDispatch({
        type: 'UPDATE_STEP',
        payload: {
          step: 'setUpTimeKeeper',
          progress: progress,
          inputs: {},
        },
      });
    }
    setSelectedRows([]);
  };

  const closeConfirmProceedModal = () => {
    setConfirmProceedState(false);
  }

  const isNextDisabled = step === 1 && accessType === "";

  const handleSkipProcess = () => {
    progressDispatch({
      type: 'UPDATE_STEP',
      payload: {
        step: 'setUpTimeKeeper',
        progress: progressState.steps['importDailyLogs'].progress,
        inputs: {},
      },
    });
    setSkippedProgressState(true);
    setSkipModalState(true);
  };

  const closeSkipModal = () => {
    setSkipModalState(false);
  };

  return (
    <>
      <SkipProcessModal isOpen={skipModalState} onClose={closeSkipModal} progress={progressState.steps['setUpTimeKeeper'].progress} />
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
          {step !== maxStep ? (
            <button
              disabled={isNextDisabled}
              onClick={handleNext}
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


