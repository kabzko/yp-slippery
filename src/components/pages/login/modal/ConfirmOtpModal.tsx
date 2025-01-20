import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { XCircleIcon } from '@heroicons/react/24/solid';

const ConfirmOtpModal = ({ isOpen, onClose, resend, submit }: { isOpen: boolean, onClose: () => void, resend: () => void, submit: (otp: string) => void }) => {
  const modalClassName = isOpen ? 'block absolute z-20' : 'hidden';
  const [code, setCode] = useState(Array(10).fill(''));

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value.length === 1 && index < 9) {
      // Automatically focus the next input field
      setTimeout(() => {
        const nextSibling = document.querySelector(`input[name="otp${index + 2}"]`);
        (nextSibling as HTMLInputElement)?.focus();
      }, 0); // Use setTimeout to ensure DOM has updated
    } else if (value === '' && index > 0) {
      // Focus the previous input field when backspace is used on an empty field
      setTimeout(() => {
        const previousSibling = document.querySelector(`input[name="otp${index}"]`);
        (previousSibling as HTMLInputElement)?.focus();
      }, 0);
    }
    // Check if all inputs are filled and then call submit
    if (newCode.every((char) => char !== '')) {
      submit(newCode.join(''));
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    event.preventDefault(); // Prevent the default paste behavior
    const paste = event.clipboardData.getData('text');
    const newCode = [...code];
    const existingInput = newCode.slice(index).join(''); // Get existing input from the current index
    const combined = existingInput + paste; // Combine existing input with pasted text

    if (combined.length <= 10 - index) {
      // If combined input does not exceed the total number of fields from the current index
      combined.split('').forEach((char, idx) => {
        newCode[index + idx] = char; // Fill the fields starting from the current index
      });
      setCode(newCode);
      if (combined.length === 10 - index) {
        submit(newCode.join('')); // Optionally submit if all fields are filled
      }
    } else {
      // If combined input exceeds the available fields, only fill up to the maximum allowed
      combined
        .slice(0, 10 - index)
        .split('')
        .forEach((char, idx) => {
          newCode[index + idx] = char;
        });
      setCode(newCode);
    }
  };

  return (
    <div className={`modal ${modalClassName}`}>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle'>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className=''>
                <div className='mt-3 text-center sm:mt-0'>
                  <div className='flex bg-savoy-blue pb-2 justify-end'>
                    <XCircleIcon className='w-6 h-6 cursor-pointer text-gray-400' onClick={onClose} />
                  </div>
                  <h3 className='text-xl leading-6 font-semibold text-[#00b395]'>One Time Passcode</h3>
                  <p className='my-3 text-sm text-gray-600 w-1/2 m-auto'>
                    We have sent a code to your email. Please enter the passcode here.
                  </p>
                  <div className='mt-6 flex justify-center space-x-2'>
                    {code.map((_, index) => (
                      <input
                        key={index}
                        type='text'
                        name={`otp${index + 1}`}
                        maxLength={1}
                        className='w-10 h-10 text-center form-control rounded border border-gray-300 shadow-sm'
                        onChange={(e) => handleChange(e.target.value, index)}
                        onPaste={(e) => handlePaste(e, index)}
                        value={code[index]}
                        tabIndex={index + 1}
                      />
                    ))}
                  </div>
                  <div className='text-center forgot-password text-sm mt-8 mb-6'>
                    Didn't receive an email for the code?{` `}
                    <a href='#' className='underline text-[#00b395]' onClick={resend}>
                      Click here to resend.
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmOtpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resend: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default ConfirmOtpModal;
