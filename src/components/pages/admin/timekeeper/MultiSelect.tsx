import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface SelectedState {
	location: string[];
	department: string[];
	rate_status: string[];
}

interface MultiSelectProps {
	initialSelected: string[];
	setSelected: React.Dispatch<React.SetStateAction<any>>;
	selected: string[];
	items: string[];
	itemType: string;
	setFieldValue: (name: string, value: string[]) => void;
}

export default function MultiSelect({ 
	initialSelected,
	setSelected,
	selected,
	items = [],
	itemType,
	setFieldValue
}: MultiSelectProps) {
	const [query, setQuery] = useState('');

	useEffect(() => {
		if (initialSelected) {
			setSelected((prev: SelectedState) => ({ ...prev, [itemType]: initialSelected }));
		}
	}, [initialSelected, itemType, setSelected]);

	const filteredItems =
		query === ''
			? items
			: items.filter((item) => {
					return item.toLowerCase().includes(query.toLowerCase());
			  });

	const handleSelect = (selectedItems: string[]) => {
		setSelected((prev: SelectedState) => ({ ...prev, [itemType]: selectedItems }));
		setFieldValue(itemType, selectedItems);
	};

	return (
		<Combobox value={selected} onChange={handleSelect} multiple>
			<div className="relative mt-1">
				<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border-2 border-[#878787] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						className="py-2 pr-10 pl-3 w-full text-sm leading-5 text-gray-900 border-none focus:ring-0"
						onChange={(event) => setQuery(event.target.value)}
						displayValue={(items: string[]) => items.join(', ')}
					/>
					<Combobox.Button className="flex absolute inset-y-0 right-0 items-center pr-2">
						<ChevronUpDownIcon
							className="w-5 h-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>
				<Combobox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none sm:text-sm">
					{filteredItems.length === 0 && query !== '' ? (
						<div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
							Nothing found.
						</div>
					) : (
						filteredItems.map((item) => (
							<Combobox.Option
								key={item}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? 'bg-blue-600 text-white' : 'text-gray-900'
									}`
								}
								value={item}
							>
								{({ selected, active }) => (
									<>
										<span
											className={`block truncate ${
												selected ? 'font-medium' : 'font-normal'
											}`}
										>
											{item}
										</span>
										{selected ? (
											<span
												className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
													active ? 'text-white' : 'text-blue-600'
												}`}
											>
												✓
											</span>
										) : null}
									</>
								)}
							</Combobox.Option>
						))
					)}
				</Combobox.Options>
			</div>
		</Combobox>
	);
}