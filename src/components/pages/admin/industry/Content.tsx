import { useState, useContext } from 'react';
import industry from '../../../../helpers/industry';
import Modal from './modals/Modal';
import useAddCompanyIndustry from './hooks/useAddCompanyIndustry';
import classNames from '../../../../helpers/classNames';
import { ProgressIndicatorContext } from '../../../contexts';
import { useForm } from 'react-hook-form';
import SkipProcessModal from '../../../modal/SkipModal';
import toast from 'react-hot-toast';
import CustomToast from '../../../toast/CustomToast';
import { static_images } from '@/initialData';

interface IndustryItem {
  id: string;
  type: string;
  name: string;
}

export default function Content() {
  const [skipModalState, setSkipModalState] = useState(false);
  const [modalOpen, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<IndustryItem | null>(null);
  const { progressState, progressDispatch, skippedProgress } = useContext(ProgressIndicatorContext);
  const { mutate: createIndustry, isPending } = useAddCompanyIndustry();

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const inputText = event.target.value;
    const selectedIndustry: any = industry.find((industry) => industry.id === inputText);
    setSearchTerm(selectedIndustry);
    if (!skippedProgress && progressState.overallProgress < 17) {
      progressDispatch({
        type: 'UPDATE_STEP',
        payload: {
          step: 'selectBusinessIndustryType',
          progress: 17,
          inputs: {},
        },
      });
    }
  };

  const onSubmit = ($event: any) => {
    $event.preventDefault();
    createIndustry(
      { industry: searchTerm?.name || '' },
      {
        onSuccess: (data: any) => {
          openModal();
        },
        onError: (error: any) => {
          toast.custom(() => <CustomToast message={error.message} type='error' />, { duration: 4000 });
        },
      }
    );
  };

  const IndustryDropdown = ({ onChange }: { onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
    return (
      <>
        <select
          onChange={onChange}
          defaultValue={searchTerm?.id || ''}
          className='block appearance-none w-full h-[85px] bg-neutral-100 rounded-[20px] p-4 pl-8 text-2xl text-black placeholder-black min-w-max'
        >
          <option value=''>What is your business industry type?</option>
          {industry.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.name}
            </option>
          ))}
        </select>
        <div className='absolute inset-y-0 right-0 flex items-center px-6 text-gray-800 pointer-events-none'>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 9-7 7-7-7'
            />
          </svg>
        </div>
      </>
    );
  };

  const openModal = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  const closeSkipModal = () => setSkipModalState(false);

  return (
    <>
      <SkipProcessModal
        isOpen={skipModalState}
        onClose={closeSkipModal}
        progress={progressState.steps['selectBusinessIndustryType'].progress}
      />
      <div className='relative flex flex-col'>
        <div className='w-full h-[0px] bottom-[130px] absolute border-b border-indigo-500 blur-sm'></div>
        <div className='w-full h-16 absolute bottom-[10px] opacity-40 bg-gradient-to-r from-blue-600 to-sky-300 rounded-full blur-[50px]' />
        <div className='absolute bottom-0 left-0'>
          <div className='relative'>
            <img src={static_images.saly_walk} className='w-[700px] h-[700px]' alt='saly-walk' />
            <img src={static_images.saly_walk_shadow} className='w-[766px] h-[77px]' alt='saly-walk-shadow' />
          </div>
        </div>
        <div className='absolute bottom-0 right-[300px]'>
          <div className='relative'>
            <img src={static_images.dog_excite} className='w-[220.96px] h-[220.96px]' alt='dog-excite' />
            <img src={static_images.dog_excite_shadow} className='w-[225.06px] h-[64.23px]' alt='dog-excite-shadow' />
          </div>
        </div>
        <div className='z-10 flex flex-col justify-center h-screen'>
          <div className='flex flex-col items-center pb-12'>
            <img src={static_images.yahshua_payroll_logo} className='h-24' alt='ypo-logo' />
            <h2 className='text-2xl text-center font-bold leading-none tracking-tight text-indigo-dye lg:text-[25px] mb-2 mt-8'>
              YAHSHUA Payroll Online
            </h2>
          </div>
          <Modal isOpen={modalOpen} onClose={closeModal} selectedIndustry={searchTerm?.id || ''} />
          <form onSubmit={onSubmit}>
            <div className='px-48'>
              <div className='border border-stone-700 py-24 bg-white rounded-[30px] shadow px-12'>
                <div className='relative'>
                  <IndustryDropdown onChange={handleInputChange} />
                </div>
                <div className='relative flex items-center justify-between pt-16'>
                  <button className='w-[200px] h-[45px] text-blue-600 bg-white border-blue-600 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center'>
                    Back
                  </button>
                  <div className='flex space-x-3'>
                    <button className='underline text-blue-600 font-semibold mr-8' onClick={() => location.href = "/logout"}>
                      Sign Out
                    </button>
                    <button
                      type='submit'
                      disabled={!searchTerm || isPending}
                      className={classNames(
                        'w-[200px] h-[45px] font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center',
                        searchTerm === null || isPending
                          ? 'text-white bg-slate-600'
                          : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300'
                      )}
                    >
                      {isPending && (
                        <div role='status'>
                          <svg
                            aria-hidden='true'
                            className='inline w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                              fill='currentColor'
                            />
                            <path
                              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                              fill='currentFill'
                            />
                          </svg>
                          <span className='sr-only'>Loading...</span>
                        </div>
                      )}
                      {!isPending && 'Next'}
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
}
