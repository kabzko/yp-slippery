import Header from './Header';
import Footer from './Footer';
import DailyLogsWrapper from './DailyLogsContextWrapper';
import Page from './PageComponent';
import LogWrapper from './LogContext';

export default function Content() {
  return (
    <div className="h-screen text-sm bg-slate-50">
        <DailyLogsWrapper>
          <Header /> 
          <LogWrapper> 
            <Page /> 
            <Footer />
          </LogWrapper>
        </DailyLogsWrapper>
    </div>
  );
}
