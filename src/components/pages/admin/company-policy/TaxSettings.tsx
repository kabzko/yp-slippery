import { useState } from 'react';
import Tax from '../../../../assets/Tax.png'; 
import Tax1 from '../../../../assets/Tax1.png'; 

const TaxCalculation = () => {
  const [isMonthlyTaxCalculationEnabled, setIsMonthlyTaxCalculationEnabled] = useState(false);

  const handleCheckboxChange = () => {
    setIsMonthlyTaxCalculationEnabled(!isMonthlyTaxCalculationEnabled);
  };

  return (
    <div className="bg-white p-12 rounded-lg shadow-md min-h-96 max-w-[400px]">
      <div className="flex justify-center items-center space-x-2">
        <input
          type="checkbox"
          className="appearance-none border border-gray-300 bg-white h-5 w-5 checked:bg-blue-500 checked:border-blue-500 checked:text-white focus:outline-none transition duration-150 ease-in-out"
          checked={isMonthlyTaxCalculationEnabled}
          onChange={handleCheckboxChange}
        />
        <label className="text-xs">Activate monthly tax calculation</label>
      </div>

      <div className="flex justify-center mt-8 mb-6">
        <img 
          src={Tax} 
          alt="Tax Calculation" 
          className="rounded-full responsive-img" 
          width={200} 
          height={200} 
        />
      </div>

      <div className="text-xs font-bold text-gray-700 mt-2 flex items-center space-x-2">
        <img src={Tax1} alt="Tax Information" width={32} height={32} />
        <p>YAHSHUA Payroll automatically calculates taxes based on yearly amounts.</p>
      </div>

      <div className="flex justify-center mt-4">
        <p className="text-xs font-bold text-gray-700">
          If you have unique tax settings, 
          <a href="#" className="text-blue-500 underline"> click more</a>..
        </p>
      </div>
    </div>
  );
};

export default TaxCalculation;










