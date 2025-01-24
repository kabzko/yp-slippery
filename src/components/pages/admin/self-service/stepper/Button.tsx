import React, { useState, useContext } from 'react';
import SkipProcessModal from '../../../../modal/SkipModal';
import SuccessModal from '../Modal/SubmissionModal';
import { ProgressIndicatorContext } from '../../../../contexts';

// Define prop types for better TypeScript support
interface StepperButtonsProps {
  onBack: () => void; // onBack is a function
  onNext: () => void; // onNext is a function
  step: number; // step is a number
}

const StepperButtons: React.FC<StepperButtonsProps> = ({ onBack, onNext, step }) => {
  const [skipModalState, setSkipModalState] = useState(false);
  const { progressState, progressDispatch, skippedProgress, setSkippedProgressState } =
    useContext(ProgressIndicatorContext);
  const [successModalState, setSuccessModalState] = useState(false);

  // Check if the industry value is set in localStorage
  const isIndustry = () => {
    try {
      if (typeof window !== 'undefined') {
        const serializedState = localStorage.getItem('industry');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState) === 3 ? true : false;
      }
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  // Handle "Next" button click
  const handleClickNext = () => {
    const industrySpecific = isIndustry();
    const progressValues = industrySpecific ? [19, 22, 25, 28, 31, 34] : [25, 50];
    const progress = Math.max(progressState.overallProgress, progressValues[step - 1]);

    // If there is no skipped progress and progress is less than required, update the progress
    if (!skippedProgress && progressState.overallProgress < progress) {
      progressDispatch({
        type: 'UPDATE_STEP',
        payload: {
          step: 'setupMiscellaneousList',
          progress: progress,
          inputs: {},
        },
      });
    }

    // If industry-specific conditions hold, move to next step or route accordingly
    if (industrySpecific && step !== 6) {
      onNext();
    } else if (!industrySpecific && step !== 2) {
      onNext();
    } else {
      if (!skippedProgress && progressState.overallProgress < progressValues[progressValues.length - 1]) {
        progressDispatch({
          type: 'UPDATE_STEP',
          payload: {
            step: 'setupMiscellaneousList',
            progress: progressValues[progressValues.length - 1],
            inputs: {},
          },
        });
      }
      setSkippedProgressState(false);
    }
  };

  // Handle the "Skip" button click
  const handleSkipProcess = () => {
    progressDispatch({
      type: 'UPDATE_STEP',
      payload: {
        step: 'registerEmployees',
        progress: progressState.steps['setupMiscellaneousList'].progress,
        inputs: {},
      },
    });
    setSkippedProgressState(true);
    setSkipModalState(true);
  };

  // Close the Skip Process modal
  const closeSkipModal = () => {
    setSkipModalState(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalState(false);
  };

  return (
    <>
      <SkipProcessModal
        isOpen={skipModalState}
        onClose={closeSkipModal}
        progress={progressState.steps['setupMiscellaneousList'].progress}
      />
      <SuccessModal isOpen={successModalState} onClose={closeSuccessModal} />
      <div className='py-6 bg-white shadow border-b-zinc-300'>
        <div className='flex justify-between mx-5'>
          <button
            onClick={onBack}
            disabled={step === 1}
            className='px-12 py-3 rounded-lg border-blue-500 border-2 text-blue-500 disabled:bg-gray-300 disabled:text-gray-500'
          >
            Back
          </button>
          <div className='flex flex-row gap-x-3'>
            <button className='underline text-blue-600 font-semibold mr-8' onClick={() => location.href = "/logout"}>
              Sign Out
            </button>
            {step !== (isIndustry() ? 6 : 2) ? (
              <button
                onClick={handleClickNext}
                className='px-12 py-3 rounded-lg bg-[#2757ED] text-white disabled:bg-gray-300 disabled:text-gray-500'
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setSuccessModalState(true)}
                className='px-12 py-3 rounded-lg bg-[#2757ED] text-white disabled:bg-gray-300 disabled:text-gray-500'
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepperButtons;
