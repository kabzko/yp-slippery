// import { mkConfig, generateCsv, download } from 'export-to-csv';
// import { useQuery } from '@tanstack/react-query';

// const downloadCSV = (data: any, filename = 'data.csv') => {
//   const csvConfig = mkConfig({
//     fieldSeparator: ',',
//     filename,
//     decimalSeparator: '.',
//     useKeysAsHeaders: true, // Use column names as headers
//   });

//   const csvContent = generateCsv(csvConfig)(data);
//   download(csvConfig)(csvContent);
// };

// const useDownloadCSV = (queryKey: any, fetchFn: any) => {
//   const { data, isLoading, error } = useQuery(queryKey, fetchFn);

//   const handleDownload = () => {
//     if (data) {
//       downloadCSV(data);
//     }
//   };

//   return { data, isLoading, error, handleDownload };
// };

// export default useDownloadCSV;
