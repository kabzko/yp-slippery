import CreateModal from './modal/CreateModal';
import CustomToast from '@/components/toast/CustomToast';
import { DeleteModal } from './modal/DeleteModal';
import EditModal from './modal/EditModal';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Upload from '@/components/modal/Upload';
import useGetLocationData from './hooks/Location/useGetLocationData';
import useGetDepartmentData from './hooks/Department/useGetDepatmentData';
import useGetPositionData from './hooks/Position/useGetPositionData';
import useGetEmploymentTypeData from './hooks/EmploymentType/useGetEmploymentTypeData';
import classNames from '@/helpers/classNames';
import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';

export default function Location() {
  const [open, setOpen] = useState(true);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [selectedCell, setSelectedCell] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<any>({});
  const { data: locationData, isLoading: locLoading, isError: locError } = useGetLocationData();
  const { data: departmentData, isLoading: deptLoading, isError: deptError } = useGetDepartmentData();
  const { data: positionsData, isLoading: posLoading, isError: posError } = useGetPositionData();
  const { data: employementTypesData, isLoading: empTypeLoading, isError: empTypeError } = useGetEmploymentTypeData();
  const [openActions, setOpenActions] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  type SortDepartmentConfig = {
    key: keyof (typeof departmentData.departments)[0] | null;
    direction: 'asc' | 'desc';
  };

  const [sortDepartmentConfig, setSortDepartmentConfig] = React.useState<SortDepartmentConfig>({
    key: null,
    direction: 'asc',
  });

  const handleDepartmentSort = (key: keyof (typeof departmentData.departments)[0]) => {
    let direction: 'asc' | 'desc' = 'asc'; // default direction
    if (sortDepartmentConfig.key === key && sortDepartmentConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortDepartmentConfig({ key, direction });
  };

  const sortedDepartmentData = React.useMemo(() => {
    if (!departmentData || !departmentData.departments) return [];

    return [...departmentData.departments].sort((a, b) => {
      if (!sortDepartmentConfig.key) return 0;
      const aValue = a[sortDepartmentConfig.key];
      const bValue = b[sortDepartmentConfig.key];
      if (aValue < bValue) return sortDepartmentConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDepartmentConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [departmentData, sortDepartmentConfig]);

  type SortLocationConfig = {
    key: keyof (typeof locationData.locations)[0] | null;
    direction: 'asc' | 'desc';
  };

  const [sortLocationConfig, setSortLocationConfig] = React.useState<SortLocationConfig>({
    key: null,
    direction: 'asc',
  });

  const handleLocationSort = (key: keyof (typeof locationData.locations)[0]) => {
    let direction: 'asc' | 'desc' = 'asc'; // default direction
    if (sortLocationConfig.key === key && sortLocationConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortLocationConfig({ key, direction });
  };

  const sortedLocationData = React.useMemo(() => {
    if (!locationData || !locationData.locations) return [];

    return [...locationData.locations].sort((a, b) => {
      if (!sortLocationConfig.key) return 0;
      const aValue = a[sortLocationConfig.key];
      const bValue = b[sortLocationConfig.key];
      if (aValue < bValue) return sortLocationConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortLocationConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [locationData, sortLocationConfig]);

  type SortPositionConfig = {
    key: keyof (typeof positionsData.positions)[0] | null;
    direction: 'asc' | 'desc';
  };

  const [sortPositionConfig, setSortPositionConfig] = React.useState<SortPositionConfig>({
    key: null,
    direction: 'asc',
  });

  const handlePositionSort = (key: keyof (typeof positionsData.positions)[0]) => {
    let direction: 'asc' | 'desc' = 'asc'; // default direction
    if (sortPositionConfig.key === key && sortPositionConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortPositionConfig({ key, direction });
  };

  const sortedPositionData = React.useMemo(() => {
    if (!positionsData || !positionsData.positions) return [];

    return [...positionsData.positions].sort((a, b) => {
      if (!sortPositionConfig.key) return 0;
      const aValue = a[sortPositionConfig.key];
      const bValue = b[sortPositionConfig.key];
      if (aValue < bValue) return sortPositionConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortPositionConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [positionsData, sortPositionConfig]);

  type SortEmployementTypeConfig = {
    key: keyof (typeof employementTypesData.employmenttypes)[0] | null;
    direction: 'asc' | 'desc';
  };

  const [sortEmployementTypeConfig, setSortEmployementTypeConfig] = React.useState<SortEmployementTypeConfig>({
    key: null,
    direction: 'asc',
  });

  const handleEmployementTypeSort = (key: keyof (typeof employementTypesData.employmenttypes)[0]) => {
    let direction: 'asc' | 'desc' = 'asc'; // default direction
    if (sortEmployementTypeConfig.key === key && sortEmployementTypeConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortEmployementTypeConfig({ key, direction });
  };

  const sortedEmployementTypeData = React.useMemo(() => {
    if (!employementTypesData || !employementTypesData.employmenttypes) return [];

    return [...employementTypesData.employmenttypes].sort((a, b) => {
      if (!sortEmployementTypeConfig.key) return 0;
      const aValue = a[sortEmployementTypeConfig.key];
      const bValue = b[sortEmployementTypeConfig.key];
      if (aValue < bValue) return sortEmployementTypeConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortEmployementTypeConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [employementTypesData, sortEmployementTypeConfig]);

  useEffect(() => {
    console.log(locationData);
  }, [locationData]);

  const handleInputChange = (e: any) => {
    setLocation(e.target.value);
  };

  const handleAddLocation = () => {
    toast.custom(() => <CustomToast message={`Successfully added ${location} location.`} type='success' />, {
      duration: 4000,
    });
  };

  const openUpload = () => {
    setOpenUploadModal(true);
  };

  const closeUpload = () => {
    setOpenUploadModal(false);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEdit = () => {
    setEditModal(false);
    setSelectedCell(null);
  };

  const toggleCollapse = () => {
    setOpen((cur) => !cur);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedCell(null);
  };

  const handleCellClick = (id: string) => {
    setSelectedCell(selectedCell === id ? null : id);

    // Find the data object based on which table was clicked
    const locationItem = sortedLocationData?.find((item) => item.id === id);
    const departmentItem = sortedDepartmentData?.find((item) => item.id === id);
    const positionItem = sortedPositionData?.find((item) => item.id === id);
    const employmentTypeItem = sortedEmployementTypeData?.find((item) => item.id === id);

    // Set the appropriate data object
    if (locationItem) {
      setSelectedData({ id, locations: locationItem.name });
    } else if (departmentItem) {
      setSelectedData({ id, departments: departmentItem.name });
    } else if (positionItem) {
      setSelectedData({ id, positions: positionItem.name });
    } else if (employmentTypeItem) {
      setSelectedData({ id, employmenttypes: employmentTypeItem.name });
    }

    setShowButtons(true);
  };

  const handleDownload = async () => {
    window.location.href =
      'https://yp-files.s3.ap-southeast-1.amazonaws.com/yp-slippery-import-templates/Setup+-+Location%2C+Department%2C+Position%2C+Employment+Type.csv';
    toast.custom(
      () => (
        <CustomToast
          message={`Successfully downloaded setup: location, department, position, employment type csv.`}
          type='success'
        />
      ),
      {
        duration: 4000,
      }
    );
  };

  return (
    <>
      <CreateModal isOpen={isModalOpen} onClose={closeModal} />
      <Upload
        fields={['Location', 'Department', 'Position', 'Employment Type']}
        isOpen={openUploadModal}
        onClose={closeUpload}
        module='location'
      />
      <EditModal selectedData={selectedData} isOpen={editModal} onClose={closeEdit} />
      <DeleteModal isOpen={deleteModal} onClose={closeDeleteModal} selectedData={selectedData} />
      <div className='flex pr-10 space-x-4' style={{ alignSelf: 'end' }}>
        <div className='flex relative group sm:mb-2'>
          <button
            id='downloadbtn'
            onClick={handleDownload}
            className='whitespace-nowrap text-[#2757ED] bg-white border border-[#2757ED] font-bold py-2 px-6 rounded-lg inline-flex items-center'
          >
            <svg width='15' height='17' viewBox='0 0 15 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M14.7063 6H10.5045V0H4.2018V6H0L7.35314 13L14.7063 6ZM0 15V17H14.7063V15H0Z' fill='#2757ED' />
            </svg>
            <span className='ml-2'>Download Template</span>
          </button>
          <span className='absolute z-40 w-fit top-12 scale-0 rounded-lg bg-[#344960] p-4 text-xs text-white group-hover:scale-100 flex'>
            <span>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z'
                  fill='white'
                />
              </svg>
            </span>
            <h1 className='ml-2 text-sm font-bold'>Sample csv file will be downloaded.</h1>
          </span>
        </div>
        <div className='flex relative group sm:mb-2'>
          <button
            id='uploadbtn'
            className='whitespace-nowrap text-[#2757ED] bg-white border border-[#2757ED] font-bold py-2 px-6 rounded-lg inline-flex items-center'
            onClick={openUpload}
          >
            <svg width='15' height='18' viewBox='0 0 15 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M4.34171 13.5157H10.4205V7.51569H14.473L7.3811 0.51569L0.289185 7.51569H4.34171V13.5157ZM0.289185 15.5157H14.473V17.5157H0.289185V15.5157Z'
                fill='#2757ED'
              />
            </svg>
            <span className='ml-2'>Upload File</span>
          </button>
          <span className='absolute z-40 w-[200px] top-12 scale-0 rounded-lg bg-[#344960] p-4 text-xs text-white group-hover:scale-100 flex'>
            <span>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z'
                  fill='white'
                />
              </svg>
            </span>
            <h1 className='ml-2 text-sm font-bold'>Accepts csv file format only.</h1>
          </span>
        </div>
      </div>
      <div className='xl:w-full bg-white mx-10 rounded-[10px] shadow-md w-11/12 border-2'>
        <div
          className={classNames(
            '',
            open
              ? 'mx-14 border-b-2 xl:flex border-stone-700 lg:max-w-full xl:justify-between lg:grid-col'
              : 'mx-14 xl:flex lg:max-w-full xl:justify-between lg:grid-col'
          )}
        >
          <div className='flex'>
            <h1 className='my-7 ml-5 text-3xl font-bold'>Location, Department, Position and Employment Type</h1>
            <div className='flex relative my-7 ml-5 group'>
              <svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.11817 5.53183H11.1444V7.51264H9.11817V5.53183ZM9.11817 9.49345H11.1444V15.4359H9.11817V9.49345ZM10.1313 0.579803C4.53883 0.579803 0 5.01682 0 10.4839C0 15.9509 4.53883 20.3879 10.1313 20.3879C15.7238 20.3879 20.2626 15.9509 20.2626 10.4839C20.2626 5.01682 15.7238 0.579803 10.1313 0.579803ZM10.1313 18.4071C5.6634 18.4071 2.02626 14.8515 2.02626 10.4839C2.02626 6.11617 5.6634 2.56061 10.1313 2.56061C14.5992 2.56061 18.2363 6.11617 18.2363 10.4839C18.2363 14.8515 14.5992 18.4071 10.1313 18.4071Z'
                  fill='#373530'
                />
              </svg>
              <span
                className='absolute z-40 w-fit top-12 scale-0 rounded-lg bg-[#344960] p-4 text-xs text-white group-hover:scale-100'
                style={{ bottom: '40px', left: '-200px' }}
              >
                List every location, department, position and employment type for your business.
              </span>
            </div>
          </div>
          <div className='flex-auto self-end' style={{ textAlign: 'end' }}>
            <button
              id='addbtn'
              onClick={openModal}
              className='mb-4 px-6 py-2 rounded-lg text-white bg-[#2757ED] disabled:bg-gray-300 disabled:text-gray-500'
            >
              Create
            </button>
          </div>
        </div>
        <div className='flex flex-col mx-14 lg:grid mb-10'>
          <div className='flex overflow-auto flex-row max-h-64 bg-white rounded'>
            <table className='w-full border-b-2 table-auto'>
              <thead className='sticky top-0 text-xs uppercase bg-white border-b-2'>
                <tr>
                  <th scope='col' className='px-3 py-3.5'>
                    <div className='flex justify-center items-center'>
                      <h1 className='text-black'>Locations</h1>
                      <button onClick={() => handleLocationSort('name')}>
                        <svg
                          className='w-3 h-3 ms-1.5 text-blue-600'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'
                            fill='#2757ED'
                          />
                        </svg>
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {locLoading ? (
                  <tr className='p-4 text-center border-b border-blue-gray-50'>
                    <td colSpan={8} className='py-1'>
                      <p className='p-2'>Loading...</p>
                    </td>
                  </tr>
                ) : sortedLocationData?.length === 0 ? (
                  <tr>
                    <td colSpan={3} className='text-center py-4'>
                      No data available.
                    </td>
                  </tr>
                ) : (
                  <>
                    {sortedLocationData?.map((location: any, rowIndex: number) => (
                      <tr key={location.id} className='h-12 p-4 border-b border-blue-gray-50 text-center'>
                        <td className='py-1 cursor-pointer'>
                          <div className='flex justify-center' onMouseLeave={() => setSelectedCell(null)}>
                            <div className='inline-block py-1 px-6 rounded-md hover:bg-gray-200' onMouseOver={() => handleCellClick(location.id)}>{location.name}</div>
                            <div
                              className='flex justify-center space-x-2 ml-2'
                              style={{ visibility: selectedCell === location.id ? 'visible' : 'hidden' }}
                            >
                              <button
                                id='editbtn'
                                onClick={openEditModal}
                                className='py-2 text-gray-500 hover:text-blue-500 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <RiPencilFill size={17} />
                              </button>
                              <button
                                id='deletebtn'
                                onClick={openDeleteModal}
                                className='py-2 text-red-500 hover:text-red-700 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <FaTrash size={17} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Add empty rows to maintain consistent height */}
                    {Array.from({
                      length: 5 - (sortedLocationData?.length || 0),
                    }).map((_, index) => (
                      <tr key={`empty-${index}`} className='h-12 border-b border-blue-gray-50 text-center'>
                        <td className='py-1'></td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            <table className='w-full border-b-2 table-auto'>
              <thead className='sticky top-0 text-xs uppercase bg-white border-b-2'>
                <tr>
                  <th scope='col' className='px-3 py-3.5'>
                    <div className='flex justify-center items-center'>
                      <h1 className='text-black'>Departments</h1>
                      <button onClick={() => handleDepartmentSort('name')}>
                        <svg
                          className='w-3 h-3 ms-1.5 text-blue-600'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'
                            fill='#2757ED'
                          />
                        </svg>
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {deptLoading ? (
                  <tr className='p-4 text-center border-b border-blue-gray-50'>
                    <td colSpan={8} className='py-1'>
                      <p className='p-2'>Loading...</p>
                    </td>
                  </tr>
                ) : sortedDepartmentData?.length === 0 ? (
                  <tr>
                    <td colSpan={3} className='text-center py-4'>
                      No data available.
                    </td>
                  </tr>
                ) : (
                  <>
                    {sortedDepartmentData?.map((department: any, rowIndex: number) => (
                      <tr key={department.id} className='h-12 p-4 border-b border-blue-gray-50 text-center'>
                        <td className='py-1 cursor-pointer'>
                          <div className='flex justify-center' onMouseLeave={() => setSelectedCell(null)}>
                            <div className='inline-block py-1 px-6 rounded-md hover:bg-gray-200' onMouseOver={() => handleCellClick(department.id)}>{department.name}</div>
                            <div
                              className='flex justify-center space-x-2 ml-2'
                              style={{ visibility: selectedCell === department.id ? 'visible' : 'hidden' }}
                            >
                              <button
                                id='editbtn'
                                onClick={openEditModal}
                                className='py-2 text-gray-500 hover:text-blue-500 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <RiPencilFill size={17} />
                              </button>
                              <button
                                id='deletebtn'
                                onClick={openDeleteModal}
                                className='py-2 text-red-500 hover:text-red-700 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <FaTrash size={17} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Add empty rows to maintain consistent height */}
                    {Array.from({
                      length: 5 - (sortedDepartmentData?.length || 0),
                    }).map((_, index) => (
                      <tr key={`empty-${index}`} className='h-12 border-b border-blue-gray-50 text-center'>
                        <td className='py-1'></td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            <table className='w-full border-b-2 table-auto'>
              <thead className='sticky top-0 text-xs uppercase bg-white border-b-2'>
                <tr>
                  <th scope='col' className='px-3 py-3.5'>
                    <div className='flex justify-center items-center'>
                      <h1 className='text-black'>Positions</h1>
                      <button onClick={() => handlePositionSort('name')}>
                        <svg
                          className='w-3 h-3 ms-1.5 text-blue-600'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'
                            fill='#2757ED'
                          />
                        </svg>
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {posLoading ? (
                  <tr className='p-4 text-center border-b border-blue-gray-50'>
                    <td colSpan={8} className='py-1'>
                      <p className='p-2'>Loading...</p>
                    </td>
                  </tr>
                ) : sortedPositionData?.length === 0 ? (
                  <tr>
                    <td colSpan={3} className='text-center py-4'>
                      No data available.
                    </td>
                  </tr>
                ) : (
                  <>
                    {sortedPositionData?.map((position: any, rowIndex: number) => (
                      <tr key={position.id} className='h-12 p-4 border-b border-blue-gray-50 text-center'>
                        <td className='py-1 cursor-pointer'>
                          <div className='flex justify-center' onMouseLeave={() => setSelectedCell(null)}>
                            <div className='inline-block py-1 px-6 rounded-md hover:bg-gray-200' onMouseOver={() => handleCellClick(position.id)}>{position.name}</div>
                            <div
                              className='flex justify-center space-x-2 ml-2'
                              style={{ visibility: selectedCell === position.id ? 'visible' : 'hidden' }}
                            >
                              <button
                                id='editbtn'
                                onClick={openEditModal}
                                className='py-2 text-gray-500 hover:text-blue-500 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <RiPencilFill size={17} />
                              </button>
                              <button
                                id='deletebtn'
                                onClick={openDeleteModal}
                                className='py-2 text-red-500 hover:text-red-700 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <FaTrash size={17} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Add empty rows to maintain consistent height */}
                    {Array.from({
                      length: 5 - (sortedPositionData?.length || 0),
                    }).map((_, index) => (
                      <tr key={`empty-${index}`} className='h-12 border-b border-blue-gray-50 text-center'>
                        <td className='py-1'></td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            <table className='w-full border-b-2 table-auto'>
              <thead className='sticky top-0 text-xs uppercase bg-white border-b-2'>
                <tr>
                  <th scope='col' className='px-3 py-3.5'>
                    <div className='flex justify-center items-center'>
                      <h1 className='text-black'>Employement Type</h1>
                      <button onClick={() => handleEmployementTypeSort('name')}>
                        <svg
                          className='w-3 h-3 ms-1.5 text-blue-600'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'
                            fill='#2757ED'
                          />
                        </svg>
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {empTypeLoading ? (
                  <tr className='p-4 text-center border-b border-blue-gray-50'>
                    <td colSpan={8} className='py-1'>
                      <p className='p-2'>Loading...</p>
                    </td>
                  </tr>
                ) : sortedEmployementTypeData?.length === 0 ? (
                  <tr>
                    <td colSpan={3} className='text-center py-4'>
                      No data available.
                    </td>
                  </tr>
                ) : (
                  <>
                    {sortedEmployementTypeData?.map((employmenttype: any, rowIndex: number) => (
                      <tr key={employmenttype.id} className='h-12 p-4 border-b border-blue-gray-50 text-center'>
                        <td className='py-1 cursor-pointer'>
                          <div className='flex justify-center' onMouseLeave={() => setSelectedCell(null)}>
                            <div className='inline-block py-1 px-6 rounded-md hover:bg-gray-200' onMouseOver={() => handleCellClick(employmenttype.id)}>{employmenttype.name}</div>
                            <div
                              className='flex justify-center space-x-2 ml-2'
                              style={{ visibility: selectedCell === employmenttype.id ? 'visible' : 'hidden' }}
                            >
                              <button
                                id='editbtn'
                                onClick={openEditModal}
                                className='py-2 text-gray-500 hover:text-blue-500 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <RiPencilFill size={17} />
                              </button>
                              <button
                                id='deletebtn'
                                onClick={openDeleteModal}
                                className='py-2 text-red-500 hover:text-red-700 bg-white disabled:bg-gray-300 disabled:text-gray-500'
                              >
                                <FaTrash size={17} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Add empty rows to maintain consistent height */}
                    {Array.from({
                      length: 5 - (sortedEmployementTypeData?.length || 0),
                    }).map((_, index) => (
                      <tr key={`empty-${index}`} className='h-12 border-b border-blue-gray-50 text-center'>
                        <td className='py-1'></td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
