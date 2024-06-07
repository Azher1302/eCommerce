import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Bitcoin, PayPal, Stripe } from './SelectedsPayments';

const Payment = [
  { name: 'Select Payment Method' },
  { name: 'PayPal' },
  { name: 'Stripe' },
  { name: 'Cypto Currency' },
];

function Payments() {
  const [selected, setSelected] = useState(Payment[0]);
  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Listbox.Button className="w-full text-sm p-4 border border-text rounded text-gray-500 bg-white text-left">
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
            <Listbox.Options className="absolute zIndex mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
              {Payment.map((person, personIdx) => (
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
      {selected.name === 'PayPal' && <PayPal />}
      {selected.name === 'Stripe' && <Stripe />}
      {selected.name === 'Cypto Currency' && <Bitcoin />}
    </div>
  );
}

export default Payments;
