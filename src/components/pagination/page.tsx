import React from 'react';

interface PageProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void; // Add this to handle page changes
}

const Page: React.FC<PageProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const getPageNumbers = () => {
    const delta = 2; // This determines how many numbers to show on each side
    const range = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <>
      {totalPages > 1 && (
        <nav className="flex items-center justify-center mt-4 gap-2">
          <ul className="flex list-none">
            <li onClick={() => setCurrentPage(currentPage - 1)} className={`cursor-pointer ${currentPage === 1 ? 'hidden' : 'hover:bg-gray-300'}`}>
              <a className="block px-3 py-2">&laquo;</a>
            </li>
            {getPageNumbers().map((number, index) => (
              <li 
                key={index} 
                className={`cursor-pointer ${number === '...' ? 'cursor-default' : ''}`}
                onClick={() => number !== '...' ? setCurrentPage(Number(number)) : null}
              >
                <a className={`block px-3 py-2 ${currentPage === number ? 'text-blue-500' : ''}`}>
                  {number}
                </a>
              </li>
            ))}
            <li onClick={() => setCurrentPage(currentPage + 1)} className={`cursor-pointer ${currentPage === totalPages ? 'hidden' : 'hover:bg-gray-300'}`}>
              <a className="block px-3 py-2">&raquo;</a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default Page;
