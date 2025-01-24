import React, { useState, useContext } from 'react';
import Saly from '@/assets/Saly-9.png';
import SalyShadow from '@/assets/Saly-9 (1).png';
import SalyDog from '@/assets/Saly-18.png';
import SalydogShadow from '@/assets/Saly-18 (1).png';
import industry from '@/helpers/industry';
import Modal from './modals/Modal';
import useAddCompanyIndustry from './hooks/useAddCompanyIndustry';
import classNames from '@/helpers/classNames';
import { ProgressIndicatorContext } from '@/components/contexts'; 
import { useForm } from 'react-hook-form';
import SkipProcessModal from '@/components/modal/SkipModal';
import toast from 'react-hot-toast';
import CustomToast from '@/components/Toast/CustomToast';
import LazyImage from '@/components/common/LazyImage';
import { Lazy } from 'yup';

interface IndustryItem {
  id: string;
  type: string;
  name: string;
}

export default function Content() {
  const [skipModalState, setSkipModalState] = useState(false);
  const { progressState, progressDispatch, skippedProgress } = useContext(ProgressIndicatorContext);
  const { mutate: createIndustry, isPending } = useAddCompanyIndustry();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<IndustryItem[]>([]);
  const [modalOpen, setOpenModal] = useState(false);

  const { handleSubmit, setValue } = useForm({
    defaultValues: { industry: '' },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    const inputWords = inputText.toLowerCase().split(/\s+/);

    const filteredResults = industry.filter((item) =>
      inputWords.some((word) => item.name.toLowerCase().includes(word))
    );
    setFilteredResults(filteredResults);

    if (!skippedProgress && progressState.overallProgress < 17) {
      progressDispatch({
        type: 'UPDATE_STEP',
        payload: {
          step: 'selectBusinessIndustryType',
          progress: 17,
          inputs: {} ,
        },
      });
    }
  };

  const handleItemClick = (itemName: string) => {
    setSearchTerm(itemName);
    setFilteredResults([]);
    setValue('industry', itemName);
  };

  const onSubmit = (data: { industry: string }) => {
    createIndustry({ industry: data.industry }, {
      onSuccess: (data: any) => {
        toast.custom(
          () => <CustomToast message={data.message} type="success" />,
          { duration: 4000 }
        );
        setValue('industry', '');
        closeModal();
      },
      onError: (error: any) => {
        toast.custom(
          () => <CustomToast message={error.message} type="error" />,
          { duration: 4000 }
        );
      },
    });
  };

  const openModal = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  const handleSkipProcess = () => setSkipModalState(true);
  const closeSkipModal = () => setSkipModalState(false);

  return (
    <>
      <SkipProcessModal isOpen={skipModalState} onClose={closeSkipModal} progress={progressState.steps['selectBusinessIndustryType'].progress} />
      <div className="relative flex flex-col">
        <div className="w-full h-[0px] bottom-[130px] absolute border-b border-indigo-500 blur-sm"></div>
        <div className="w-full h-16 absolute bottom-[10px] opacity-40 bg-gradient-to-r from-blue-600 to-sky-300 rounded-full blur-[50px]" />
        <div className="absolute bottom-0 left-0">
          <div className="relative">
            <LazyImage src={Saly} alt="FaceBook" className="w-[700px] h-[700px]" />
            <LazyImage src={SalyShadow} alt="FaceBook"  className="w-[766px] h-[77px]" />
          </div>
        </div>
        <div className="absolute bottom-0 right-[300px]">
          <div className="relative">
            <LazyImage src={SalyDog} alt="FaceBook" className="w-[220.96px] h-[220.96px]" />
            <LazyImage src={SalydogShadow} alt="FaceBook" className="w-[225.06px] h-[64.23px]" />
          </div>
        </div>

        <div className="z-10 flex flex-col justify-center h-screen">
          <div className="flex flex-col items-center pb-12">
            <svg
              width="72"
              height="105"
              viewBox="0 0 72 105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.8904 73.2983L17.8586 63.5169L17.8286 54.2809C17.8286 54.2809 40.2854 40.7464 55.1401 31.7937L63.5642 45.7712L17.8904 73.2983Z"
                fill="#0081CD"
              />
              <path
                d="M8.4436 14.1684L16.5834 0.00641496L63.5464 27.6868L63.5464 36.0193L63.5464 45.7818L8.4436 14.1684Z"
                fill="#010F7C"
              />
              <path
                d="M0 6.39145L16.5838 0.00992393V96.3018L0 105V6.39145Z"
                fill="#02B3BE"
              />
            </svg>
            <h1 className="text-2xl text-center font-bold leading-none tracking-tight text-indigo-dye lg:text-[25px] mb-4 mt-8">
              YAHSHUA Payroll Online
            </h1>
          </div>
        <Modal isOpen={modalOpen} onClose={closeModal} selectedIndustry={searchTerm} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-48">
            <div className="border border-stone-700 py-24 bg-white rounded-[30px] shadow px-12">
              <div className="relative">
                <IndustryDropdown onChange={handleInputChange} />
              </div>
              {searchTerm !== "" && (
                <div className="absolute mt-2 bg-white rounded shadow-lg z-20 w-[1059px] overflow-hidden">
                  <ul>
                    {filteredResults.map((item) => (
                      <li
                        key={item.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleItemClick(item.name)} >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="relative flex items-center justify-between pt-16">
                <button className="w-[200px] h-[45px] text-blue-600 bg-white border-blue-600 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center">
                  Back
                </button>
                <div className="flex space-x-3">
                  <button className="font-semibold text-blue-600 underline" onClick={handleSkipProcess}>
                    I'll do this later.
                  </button>
                  <button
                    type="submit"
                    disabled={!searchTerm}
                    onClick={openModal}
                    className={classNames('w-[200px] h-[45px] font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center', searchTerm === '' ? 'text-white bg-slate-600' : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300')} >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

const IndustryDropdown = ({ onChange }: { onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <>
      <select
        onChange={onChange}
        className="block appearance-none w-full h-[85px] bg-neutral-100 rounded-[20px] p-4 pl-8 text-2xl text-black placeholder-black min-w-max"
      >
        <option value="">What is your business industry type?</option>
        {industry.map((industry) => (
          <option key={industry.id} value={industry.id}>
            {industry.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-6 text-gray-800 pointer-events-none">
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </div>
    </>
  );
};



