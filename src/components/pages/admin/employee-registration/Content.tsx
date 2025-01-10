import CreateBtn from './CreateBtn';
import DownloadUpload from './DownloadUpload';
import EmployeeWrapper from './EmployeeContext';
import EmployeeRegistrationWrapper from './EmployeeRegistrationContext';
import Footer from './Footer';
import Header from './Header';
import SearchBar from './SearchBar';
import TableWrapper from './TableWrapper';
import backgroundImage from '../../../../assets/YPS-OB_bg.png';

export default function Content() {
  return (
    <div className="h-screen text-sm bg-slate-50">
      <EmployeeRegistrationWrapper>
        <Header />
        <EmployeeWrapper>
          <div className="flex flex-col items-center justify-center bg-fixed bg-center bg-no-repeat bg-cover bg-origin-content" 
               style={{ height: '75vh', backgroundImage: `url(${backgroundImage})` }}>
            <div className="w-full max-w-5xl px-8 py-3">
            <DownloadUpload />
            </div>
            <div className="w-full max-w-5xl px-8 py-6 mt-4 bg-white rounded outline outline-1 outline-slate-300 space-y-7">
              <div className="flex justify-between">
                <SearchBar />
                <CreateBtn />
              </div>
              <TableWrapper />
            </div>
          </div>
        </EmployeeWrapper>
        <Footer />
      </EmployeeRegistrationWrapper>
    </div>
  );
}
