import * as Yup from 'yup';
import MultiSelect from '../MultiSelect';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AccountContext } from '@/components/contexts'; 
import { ErrorMessage, Field, Form, Formik } from 'formik';
import useGetLocationData from '../../self-service/location/hooks/Location/useGetLocationData';
import useGetDepartmentData from '../../self-service/location/hooks/Department/useGetDepatmentData';
import useUpdateAccount from '../hooks/useUpdateAccount';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import CustomToast from '@/components/Toast/CustomToast';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface QueryData {
	[key: string]: any[];
}

type TimekeeperValues = {
	username: string;
	email: string;
	location: string;
	department: string;
	rate_status: string;
	[key: string]: string;
};

type SelectedState = {
	location: string[];
	department: string[];
	rate_status: string[];
};

export default function EditFormModal({ isOpen, onClose, }: ModalProps) {
	const [selected, setSelected] = useState<SelectedState>({
		location: [],
		department: [],
		rate_status: [],
	});
	const { selectedAccount, setSelectedAccount, setSelectedRows } = useContext(AccountContext);
	const [queryKey, setQueryKey] = useState<string>("")
	const { mutate } = useUpdateAccount();
	const queryClient = useQueryClient();
	const rateStatus = ["Hourly", "Daily", "Monthly", "Freelance/Contract", "Commission"]

	const queries = useMemo(() => [
		{ queryKey: ['locationData'], queryFn: () => useGetLocationData(), enabled: isOpen },
		{ queryKey: ['departmentData'], queryFn: () => useGetDepartmentData(), enabled: isOpen },
	], [isOpen]);

	const query = useQueries({
		queries,
		combine: (results) => {
			return {
				data: results.map((result) => {
					let transformedData: { [key: string]: any } = {};
					for (let key in (result.data as unknown as QueryData)) {
						transformedData[key] = ((result.data as unknown as QueryData)[key])
							.map((item: { [key: string]: any }) => item[key])
							.filter((value: any) => value !== '[Empty]');

						transformedData[key] = transformedData[key].filter((value: any, index: any, self: any) => {
							return self.indexOf(value) === index;
						});
					}
					return transformedData;
				}),
				pending: results.some((result) => result.isPending),
			}
		},
	});

	const initialTimekeeperValues: TimekeeperValues = {
		username: "",
		email: "",
		location: "",
		department: "",
		rate_status: "",
	};

	const timekeeperSchema = Yup.object().shape({
		username: Yup.string().required("(Required)"),
		email: Yup.string().email("(Invalid email address.)").required("(Required)"),
		location: Yup.array().of(Yup.string())
			.test('is-in-array', '(Invalid value)', value => value ? value.every(v => query?.data[0]?.locations.includes(v)) : false)
			.test('is-empty', '(Required)', value => Array.isArray(value) && value.length > 0),
		department: Yup.array().of(Yup.string())
			.test('is-in-array', '(Invalid value)', value => value ? value.every(v => query?.data[1]?.departments.includes(v)) : false)
			.test('is-empty', '(Required)', value => Array.isArray(value) && value.length > 0),
		rate_status: Yup.array().of(Yup.string())
			.test('is-in-array', '(Invalid value)', value => value ? value.every(v => v ? rateStatus.includes(v) : false) : false)
			.test('is-empty', '(Required)', value => Array.isArray(value) && value.length > 0)
	});

	useEffect(() => {
		if (selectedAccount) {
			if (selectedAccount.account_type === 'one to one') { setQueryKey('1to1') }
			else { setQueryKey('1toM') }
		}
	}, [selectedAccount])

	const handleSubmit = async (data: any) => {
		const updatedAccount = {
			id: selectedAccount.id,
			...data,
		};
		console.log(updatedAccount)
		mutate(updatedAccount, {
			onSuccess: () => {
			  queryClient.invalidateQueries({ queryKey: ['accounts'] });
			  toast.custom(() => <CustomToast message={`Successfully updated account.`} type='success' />, {
				duration: 4000
			  });
			  onClose();
			},
			onError: () => {
			  queryClient.invalidateQueries({ queryKey: ['accounts'] });
			  toast.custom(() => <CustomToast message={`Failed to fetch update account.`} type='error' />, {
				duration: 4000
			  });
			},
		  });
		};

	const handleClose = () => {
		setSelected(({ location: [], department: [], rate_status: [] }))
		setSelectedRows([]);
		onClose();
	}

	/* useEffect(() => {
		console.log(selectAll.location, selectAll.department, selectAll.rate_status)
	},[selectAll]) */

	return (
		<>
			{(isOpen) && (
				<div className="block absolute z-50">
					<div className="overflow-y-auto fixed inset-0">
						<div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
							<div className="fixed inset-0 transition-opacity">
								<div className="absolute inset-0 bg-[#5982ff] opacity-40 mix-blend-lighten"></div>
							</div>
							<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
							<div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle w-fit sm:mx-6 md:mx-28">
								<div className="text-center sm:text-left">
									{query.pending && (
										<div className="p-10">
											Please wait...
										</div>
									)}
									{(!query.pending) && (
										<Formik
											initialValues={initialTimekeeperValues}
											validationSchema={timekeeperSchema}
											onSubmit={(values, actions) => {
												const transformedValues = {
													...values,
													location: Array.isArray(values.location) ? values.location.join(', ') : values.location,
													department: Array.isArray(values.department) ? values.department.join(', ') : values.department,
													rate_status: Array.isArray(values.rate_status) ? values.rate_status.join(', ') : values.rate_status
												};
												// console.log(transformedValues)
												handleSubmit(transformedValues);
												actions.resetForm({
													values: initialTimekeeperValues,
												});
											}} enableReinitialize>
											{({ isSubmitting, resetForm, isValid, setValues, errors, values, setFieldValue }) => {
												useEffect(() => {
													const keys = Object.keys(initialTimekeeperValues);
													keys.forEach((key) => {
														let value = selectedAccount[key];
														if (key === 'location' || key === 'department' || key === 'rate_status' || key === 'username' || key === 'email') {
															if (key === 'location' && selectedAccount.location) {
																const loc = selectedAccount.location.split(", ");
																setFieldValue(key, loc, true);
															} else if (key === 'department' && selectedAccount.department) {
																const dep = selectedAccount.department.split(", ");
																setFieldValue(key, dep, true);
															} else if (key === 'rate_status' && selectedAccount.rate_status) {
																const rate = selectedAccount.rate_status.split(", ");
																setFieldValue(key, rate, true);
															} else if(key === 'username' && selectedAccount.username) {
																setFieldValue(key, selectedAccount.username, true);
															} else if(key === 'email' && selectedAccount.email) {
																setFieldValue(key, selectedAccount.email, true);
															}
														} else {
															if (!values[key]) {
																setFieldValue(key, initialTimekeeperValues[key], true);
															}
														}
													});
												}, [selectedAccount]);


												/* useEffect(() => {
													if (errors) console.log(errors)
												}, [errors]) */

												/* useEffect(() => {
													if (values) {
														// console.log(Array.isArray(values.location), Array.isArray(values.department), Array.isArray(values.rate_status))
														// console.log(values.location, values.department, values.rate_status)
														console.log(values)
													}
												}, [values]) */

												return (
													<span>
														<div className="flex justify-between p-5 w-full bg-blue-600">
															<h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
																Edit Timekeeper Account
															</h3>
															<button type="button" onClick={() => { resetForm(); handleClose(); }}>
																<svg
																	width="14"
																	height="14"
																	viewBox="0 0 14 14"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
																		fill="white"
																	/>
																</svg>
															</button>
														</div>
														<div className="mx-10">
															<Form>
																<div className="my-4 space-y-3">
																	<div>
																		<label htmlFor="username" className="label-modal">
																			Username<span className="text-red-500">*</span>
																			<ErrorMessage
																				name="username"
																				component="span"
																				className="text-red-500 ml-1.5"
																			/>
																		</label>
																		<Field
																			className="input-text-modal"
																			name="username"
																			type="text"
																			id="username"
																			placeholder="Enter Username..."
																		/>
																	</div>
																	<div>
																		<label htmlFor="email" className="label-modal">
																			Email<span className="text-red-500">*</span>
																			<ErrorMessage
																				name="email"
																				component="span"
																				className="text-red-500 ml-1.5"
																			/>
																		</label>
																		<Field
																			className="input-text-modal"
																			name="email"
																			type="text"
																			id="email"
																			placeholder="Enter Email..."
																		/>
																	</div>
																	<div>
																		<label htmlFor="location" className="label-modal">
																			Location<span className="text-red-500">*</span>
																			<ErrorMessage
																				name="location"
																				component="span"
																				className="text-red-500 ml-1.5"
																			/>
																		</label>
																		<MultiSelect setSelected={setSelected} selected={selected.location}
																			items={query?.data[0]?.locations} itemType="location" setFieldValue={setFieldValue}
																			initialSelected={selectedAccount.location && Array.isArray(selectedAccount.location) ? selectedAccount.location : selectedAccount.location.split(', ')}
																		/>
																		<div className="flex space-x-3 mt-2.5">
																			<button type="button"
																				onClick={() => {
																					setFieldValue('location', query?.data[0]?.locations);
																					setSelected(prev => ({ ...prev, location: query?.data[0]?.locations }))
																				}}
																				className="underline text-slate-400 hover:text-slate-800">
																				Select All
																			</button>
																			<button type="button"
																				onClick={() => {
																					setFieldValue('location', []);
																					setSelected(prev => ({ ...prev, location: [] }))
																				}}
																				className="underline text-slate-400 hover:text-slate-800">
																				Deselect All
																			</button>
																		</div>
																	</div>
																	<div>
																		<label htmlFor="department" className="label-modal">
																			Department<span className="text-red-500">*</span>
																			<ErrorMessage
																				name="department"
																				component="span"
																				className="text-red-500 ml-1.5"
																			/>
																		</label>
																		<MultiSelect setSelected={setSelected} selected={selected.department}
																			items={query?.data[1]?.departments} itemType="department" setFieldValue={setFieldValue}
																			initialSelected={selectedAccount.department && Array.isArray(selectedAccount.department) ? selectedAccount.department : selectedAccount.department.split(', ')}
																		/>
																		<div className="flex space-x-3 mt-2.5">
																			<button type="button"
																				onClick={() => {
																					setFieldValue('department', query?.data[1]?.departments);
																					setSelected(prev => ({ ...prev, department: query?.data[1]?.departments }))
																				}}
																				className="underline text-slate-400 hover:text-slate-800">
																				Select All
																			</button>
																			<button type="button"
																				onClick={() => {
																					setFieldValue('department', []);
																					setSelected(prev => ({ ...prev, department: [] }))
																				}}
																				className="underline text-slate-400 hover:text-slate-800">
																				Deselect All
																			</button>
																		</div>
																	</div>
																	<div>
																		<label htmlFor="rate_status" className="label-modal">
																			Rate Status<span className="text-red-500">*</span>
																			<ErrorMessage
																				name="rate_status"
																				component="span"
																				className="text-red-500 ml-1.5"
																			/>
																		</label>
																		<MultiSelect setSelected={setSelected} selected={selected.rate_status}
																			items={rateStatus} itemType="rate_status" setFieldValue={setFieldValue}
																			initialSelected={selectedAccount.rate_status && Array.isArray(selectedAccount.rate_status) ? selectedAccount.rate_status : selectedAccount.rate_status.split(', ')}
																		/>
																		<div className="flex space-x-3 mt-2.5">
																			<button type="button"
																				onClick={() => {
																					setFieldValue('rate_status', rateStatus);
																					setSelected(prev => ({ ...prev, rate_status: rateStatus }))
																				}}
																				className="underline text-slate-400 hover:text-slate-800">
																				Select All
																			</button>
																			<button type="button"
																				onClick={() => {
																					setFieldValue('rate_status', []);
																					setSelected(prev => ({ ...prev, rate_status: [] }))
																				}}
																				className="underline text-slate-400 hover:text-slate-800">
																				Deselect All
																			</button>
																		</div>
																	</div>
																</div>
																<div className="justify-between my-7 sm:flex sm:flex-row-reverse">
																	<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
																		{!isValid ? (
																			<button disabled={!isValid}
																				className={`inline-flex justify-center px-10 py-2 w-full text-base font-bold leading-6 text-white bg-green-600 rounded-md border border-green-700 shadow-sm transition duration-150 ease-in-out focus:outline-none hover:bg-green-800 hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}>
																				Invalid fields
																			</button>
																		) : (
																			<button type="submit" disabled={isSubmitting}
																				className={`inline-flex justify-center px-10 py-2 w-full text-base font-bold leading-6 text-white bg-blue-600 rounded-md border border-blue-700 shadow-sm transition duration-150 ease-in-out focus:outline-none hover:bg-green-800 hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}>
																				{isSubmitting ? "Submitting..." : "Update"}
																			</button>
																		)}
																	</span>
																	<span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
																		<button type="button"
																			onClick={() => { resetForm(); handleClose(); }}
																			className="inline-flex justify-center px-10 py-2 w-full text-base font-bold leading-6 text-white bg-red-500 rounded-md border border-red-600 shadow-sm transition duration-150 ease-in-out focus:outline-none hover:bg-red-700 focus:shadow-outline-blue sm:text-sm sm:leading-5">
																			Close
																		</button>
																	</span>
																</div>
															</Form>
														</div>
													</span>
												);
											}}
										</Formik>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}