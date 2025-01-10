import { useContext } from 'react';
import { PolicyContext } from '../../../contexts';
import StatutorySettings from './StatutorySettings';
import TaxSettings from './TaxSettings';
import HolidaySettings from './HolidaySettings';
import { useForm, FormProvider } from 'react-hook-form';
import useAddStatutory from './hooks/useAddStatutory';
import useAddTax from './hooks/useAddTax';
import useAddHoliday from './hooks/useAddHoliday';
import CustomToast from '../../../../components/Toast/CustomToast';
import toast from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../../../../assets/YPS-OB_bg.png';

const CompanyPolicyPage = () => {
  const { step } = useContext(PolicyContext);
  const methods = useForm();
  const { handleSubmit, getValues, control, trigger } = methods;
  
  const statutoryMutation = useAddStatutory();
  const taxMutation = useAddTax();
  const holidayMutation = useAddHoliday();

  const isPending = statutoryMutation.isPending || 
                   taxMutation.isPending || 
                   holidayMutation.isPending;

  const onSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const formData = getValues();
      console.log('Form submission data:', { step, formData });
      
      let currentMutation;
      switch (step) {
        case 1:
          currentMutation = statutoryMutation;
          break;
        case 2:
          currentMutation = taxMutation;
          break;
        case 3:
          currentMutation = holidayMutation;
          break;
        default:
          return;
      }

      currentMutation.mutate(formData, {
        onSuccess: (data) => {
          toast.custom(
            () => <CustomToast message={data.message} type="success" />,
            { duration: 4000 }
          );
        },
        onError: (error: any) => {
          toast.custom(
            () => <CustomToast message={error.message} type="error" />,
            { duration: 4000 }
          );
        },
      });
    } else {
      toast.custom(
        () => <CustomToast message="Please fill out all required fields correctly" type="error" />,
        { duration: 4000 }
      );
    }
  };

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <StatutorySettings control={control} />;
      case 2:
        return <TaxSettings />;
      case 3:
        return <HolidaySettings control={control} />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col min-h-screen">
        <Header />
          <div 
            className="flex flex-grow justify-center content-center p-8" 
            style={{
              backgroundImage: `url(${backgroundImage})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
            }}
          >
            {renderStepComponent()}
          </div>
        <Footer onSubmit={handleSubmit(onSubmit)} isPending={isPending} />
      </div>
    </FormProvider>
  );
};

export default CompanyPolicyPage;


