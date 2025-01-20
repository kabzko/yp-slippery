import React, { useRef, useState, useEffect, useMemo } from "react";
import { useForm, Controller } from 'react-hook-form';

interface SelectedTagsProps {
  selected: string[];
  clearTags: (tag: string) => void;
}

interface TagProps {
  tag: string;
  removeTag: (tag: string) => void;
}

interface DropdownMenuProps {
  filteredTags: string[];
  addTag: (tag: string) => void;
}

interface MultiSelectProps {
  items: string[];
  setFieldValue: any;
  itemType: string;
  initialSelected?: string[];
  selected: string[];
  setSelected: any;
}

const Tag = ({ tag, removeTag }: TagProps) => (
  <div key={tag} className="rounded-md w-fit py-1.5 px-3 bg-[#D1E2F9] text-[#373530] flex items-center gap-2">
    <div onMouseDown={(e) => e.preventDefault()} onClick={() => removeTag(tag)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x cursor-pointer text-[#373530]" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
    </div>
    {tag}
  </div>
);

const SelectedTags = ({ selected, clearTags }: SelectedTagsProps) => {
  return (
    <div className="flex flex-wrap justify-start gap-2">
      {selected && Array.isArray(selected) && selected.map((tag: any) => (
        <Tag key={tag} tag={tag} removeTag={clearTags} />
      ))}
    </div>
  );
};

const DropdownMenu = ({ filteredTags, addTag }: DropdownMenuProps) => (
  <div className="absolute z-20 flex w-full p-1 mt-2 overflow-y-auto bg-white shadow card max-h-20 scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
    <ul className="w-full">
      {filteredTags ? (
        filteredTags.map((tag: any) => (
          <li
            key={tag}
            className="w-full p-2 rounded-md cursor-pointer hover:bg-rose-50 hover:text-rose-500"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => addTag(tag)}
          >
            {tag}
          </li>
        ))
      ) : (
        <li className="p-2 text-gray-500">No more options left.</li>
      )}
    </ul>
  </div>
);

const MultiSelect = ({ items, setFieldValue, setSelected, selected, itemType, initialSelected }: MultiSelectProps) => {
  const [query, setQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { control, setValue } = useForm({
    defaultValues: {
      [itemType]: initialSelected || []
    }
  });

  // Filtered tags based on the query and selected items
  const filteredTags = useMemo(() => {
    return items?.filter(item =>
      typeof item === 'string' &&
      item.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      Array.isArray(selected) &&
      !selected.includes(item)
    );
  }, [items, query, selected]);

  // Function to clear a selected tag
  const clearTags = (tag: string) => {
    const newSelected = selected?.filter((i) => i !== tag);
    setSelected((prev: any) => ({ ...prev, [itemType]: newSelected }));
    setFieldValue(itemType, newSelected);
    inputRef.current?.focus();
  };

  // Function to add a new tag
  const addTag = (tag: string) => {
    const newSelected = [...selected, tag];
    setSelected((prev: any) => ({ ...prev, [itemType]: newSelected }));
    setFieldValue(itemType, newSelected);
    setQuery("");
    setMenuOpen(true);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (filteredTags?.length === 0) {
      setMenuOpen(false)
    }
  }, [filteredTags]);

  return (
    <div className="grid w-full bg-white place-items-center">
      <div className="w-full text-sm rounded" ref={dropdownRef}>
        <div className="flex flex-col w-full p-3 space-x-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-600"
          onFocus={() => { setMenuOpen(true); }}
          onBlur={() => { setMenuOpen(false); }}
        >

          <SelectedTags selected={selected} clearTags={clearTags} />
          <Controller
            name={itemType}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                ref={inputRef}
                type="text"
                value={selected?.length > 0 ? '' : query}
                onChange={(e: any) => setQuery(e.target.value.trimStart())}
                placeholder={selected?.length === 0 ? `Select ${itemType}/s` : ''}
                className={'bg-transparent focus:outline-none text-sm flex-auto shrink self-start'}
              />
            )}
          />
        </div>

        {/* Dropdown menu for displaying filtered tags */}
        {menuOpen && <DropdownMenu filteredTags={filteredTags} addTag={addTag} />}
      </div>
    </div>
  );
};

export default MultiSelect;
