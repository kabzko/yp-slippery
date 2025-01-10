import { useState, useEffect, useContext } from 'react';
import { DailyLogsContext } from '../../../contexts';
import SelectProcessType from './SelectProcessType';
import { Table } from './Table';
import DownloadUpload from './DownloadUpload';
import SelectCloudBased from './modals/SelectCloudBasedModal';
import ManageAccess from './ManageAccess';
import SelectDateRange from './modals/SelectDateRangeModal';
import SyncLoading from './modals/SyncLoadingModal';
import PlsDownload from './modals/PleaseDownloadModal'
import backgroundImage from '../../../../assets/YPS-OB_bg.png';

interface CloudBasedType {
	[key: string]: boolean;
	payroll: boolean;
	adp: boolean;
	sprout: boolean;
	zoho: boolean;
}

export default function PageComponent() {
	const { step, payrollProcessType } = useContext(DailyLogsContext);
	const [selectCloudModal, setSelectCloudModalState] = useState(false)
	const [cloudBasedType, setCloudBasedType] = useState<CloudBasedType>({
		"payroll": false,
		"adp": false,
		"sprout": false,
		"zoho": false
	})  // State for tracking selected cloud-based types
	const [dateRangeModal, setDateRangeModalState] = useState(false)
	const [selectedCloudBasedType, setSelectedCloudBaseType] = useState('');  // State for the selected cloud-based type
	const [manageAccessOpen, setManageAccessOpen] = useState(false);
	const [loadingModal, setLoadingModalState] = useState(false);
	const [plsDownloadModal, setPlsDownloadModalState] = useState(false); 
	const [dates, setDates] = useState({
		dateFrom: '',
		dateTo: ''
	})

	useEffect(() => {
		// Update selected cloud-based type based on cloudBasedType state
		const selectedCloud = Object.keys(cloudBasedType).find(key => cloudBasedType[key] === true);
		if (selectedCloud) setSelectedCloudBaseType(selectedCloud)
	}, [cloudBasedType]);

	useEffect(() => {
		if (step === 2 && payrollProcessType === 'other') {
			setSelectCloudModalState(true);
		} else if (step === 2 && payrollProcessType === 'biometrics') {
			setPlsDownloadModalState(true)
		}
	}, [step, payrollProcessType]);

	const handleSyncLoadingOpen = () => {
		handleManageAccessClose();
		setSelectCloudModalState(false)
		setLoadingModalState(true)
	}

	const handleSelectModalClose = () => {
		setSelectCloudModalState(false)
	}

	const handleManageAccessClose = () => {
		setCloudBasedType({
			payroll: false,
			adp: false,
			sprout: false,
			zoho: false
		});
		setManageAccessOpen(false)
	}

	const renderStepComponent = () => {
		if (step === 1) {
			return <SelectProcessType />;
		} else if (step === 2) {
			return (
				<>
					<PlsDownload isOpen={plsDownloadModal} onClose={() => { setPlsDownloadModalState(false) }} />
					<SyncLoading dates={dates} setDates={setDates} selectedCloudBasedType={selectedCloudBasedType} isOpen={loadingModal} onClose={() => { setLoadingModalState(false) }} />
					<ManageAccess isOpen={manageAccessOpen} onClose={handleManageAccessClose}
						cloudBasedType={cloudBasedType} handleSyncLoadingOpen={handleSyncLoadingOpen}
					/>
					<SelectDateRange dates={dates} setDates={setDates}
						isOpen={dateRangeModal} onClose={() => { setDateRangeModalState(false) }}
						setManageAccessOpen={setManageAccessOpen}
					/>
					<SelectCloudBased
						isOpen={selectCloudModal} onClose={handleSelectModalClose} setDateRangeModalState={setDateRangeModalState}
						cloudBasedType={cloudBasedType} setCloudBasedType={setCloudBasedType} dateRangeModal={dateRangeModal}
					/>
					<div className="">
						<div className="w-full mb-3">
							<DownloadUpload />
						</div>
						<Table/>
					</div>
				</>
			);
		} else if (step === 3) {
			return payrollProcessType;  // temporary
		}
		return null;
	};

	return (
		<>
			<div className="flex flex-col content-center justify-center bg-fixed bg-center bg-no-repeat bg-cover bg-origin-content" style={{ height: '75vh', alignItems: 'center', backgroundImage: `url(${backgroundImage})`  }}>
			    <div className='w-full max-w-5xl'>
				  {renderStepComponent()}
				</div>
			</div>
		</>
	);
}