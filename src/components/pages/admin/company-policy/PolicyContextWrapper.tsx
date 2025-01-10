import { useState } from 'react';
import { PolicyContext } from '../../../contexts';
import { StatutorySettings } from '../../../types';

export default function PolicyWrapper({ children }: { children: React.ReactNode; }) {
  const [step, setStep] = useState(1);
  const [statutorySettings, setStatutorySettings] = useState<StatutorySettings>({
    statutoryType: '',
    sss: '',
    philHealth: '',
    pagIbig: '',
  });
  const [progress, setProgress] = useState(0);

  const updateStatutoryType = (type: 'monthly' | 'hourly') => {
    setStatutorySettings(prev => ({ ...prev, statutoryType: type }));
  };

  const updateContributions = (sss: number, philHealth: number, pagIbig: number) => {
    setStatutorySettings(prev => ({
      ...prev,
      sss: String(sss),
      philHealth: String(philHealth),
      pagIbig: String(pagIbig),
    }));
  };

  return (
    <PolicyContext.Provider
      value={{
        step,
        setStep,
        statutorySettings,
        setStatutorySettings,
        updateStatutoryType,
        updateContributions,
        progress,
        setProgress
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
}

