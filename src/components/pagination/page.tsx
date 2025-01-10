import React from 'react';

interface PageProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void; 
}

const Page: React.FC<PageProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {totalPages > 0 && (
        <nav className="flex gap-2 justify-center items-center mt-4">
          <ul className="flex list-none">
            <li onClick={() => setCurrentPage(currentPage - 1)} className={`cursor-pointer ${currentPage === 1 ? 'hidden' : 'hover:bg-gray-300'}`}>
              <a className="block px-3 py-2">&laquo;</a>
            </li>
            {pageNumbers.map(number => (
              <li key={number} className="cursor-pointer">
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
