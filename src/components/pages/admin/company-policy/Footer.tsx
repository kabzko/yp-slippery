import { useState, useContext } from 'react';
import { PolicyContext } from '../../../contexts';
import SkipProcessModal from '../../../modal/SkipModal';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FooterProps {
  onSubmit: () => void;
  isPending?: boolean;
}

const Footer = ({ onSubmit, isPending }: FooterProps) => {
  const [skipModalState, setSkipModalState] = useState(false);
  const { step, setStep, progress } = useContext(PolicyContext);

  const { trigger, formState: { isValid } } = useFormContext() || { trigger: () => true, formState: { isValid: false } };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = async () => {
    const isValid = await trigger();  
    if (isValid) {
      await onSubmit(); 
      if (step < 3) {
        setStep(step + 1); 
      }
    } else {
      toast.error('Please fill out all required fields correctly.');
    }
  };

  const handleSkipProcess = () => {
    setSkipModalState(true);
  };

  const closeSkipModal = () => {
    setSkipModalState(false);
  };

  return (
    <>
      <SkipProcessModal isOpen={skipModalState} onClose={closeSkipModal} progress={progress} />
      <div className="flex justify-between items-center px-10 py-5 bg-white outline outline-1 outline-slate-200 border-t-1 border-slate-300" style={{ marginTop: "0px" }}>
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
          <button
            onClick={handleNext}
            className="next-step"
            disabled={!isValid || isPending} 
          >
            {isPending ? 'Loading...' : 'Next'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;

