import { useContext } from 'react';
import { PolicyContext } from '../../../contexts/index';
import Stepper from './Stepper';

const Header = () => {
  const { step } = useContext(PolicyContext);
  return (
    <>
      <Stepper step={step} />
    </>
  );
};

export default Header;
