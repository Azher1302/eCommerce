import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const Prices = [
  { name: 'All' },
  { name: 'Low to high' },
  { name: 'High to low' },
  { name: ' Ascending order' },
  { name: 'Descending order' },
];

export default function Filter({ total }) {
  const [selected, setSelected] = useState(Prices[0]);

  return (
    <div className="flex my-6 justify-between bg-deepest items-center rounded p-3">
      <p className="sm:text-base text-xs">
        Total <span className="font-bold">{total && total}</span> items Found
      </p>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-32 sm:w-64">
          <Listbox.Button className="relative bg-white w-full cursor-default rounded-lg py-3 pl-3 pr-10 text-left text-xs">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-text" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
              {Prices.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-main text-white' : 'text-black'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-main">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
