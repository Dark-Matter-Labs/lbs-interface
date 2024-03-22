import { Fragment } from 'react';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const hazards = [
  { title: 'Gesamt', name: 'AVERAGE_RISK',  current: true },
  { title: 'Trockenheit', name: 'A_risk_score',  current: false},
  { title: 'Hitze', name: 'B_risk_score',  current: false },
  { title: 'Luftverschmutzung', name: 'C_risk_score',  current: false },
  { title: 'Überschwemmung', name: 'D_risk_score',  current: false },
];

export default function InfoPanel(props) {
  
  return (
    <Transition.Root
      show={props.show}
      as={Fragment}
      className='bg-white-200 mt-16 rounded-r-[30px]'
    >
      <Transition.Child
        enter='transform transition ease-in-out duration-500 sm:duration-700'
        enterFrom='translate-x-full'
        enterTo='translate-x-0'
        leave='transform transition ease-in-out duration-500 sm:duration-700'
        leaveFrom='translate-x-0'
        leaveTo='translate-x-full'
      >
        <div className='pb-40'>
          <div className='px-10 py-4 bg-green-600 flex flex-row items-center my-auto justify-between rounded-tr-[30px]'>
            <div>
              <span className='bold-intro-md text-white-200 pl-6'>Erkunde das Risiko eines Standorts</span>
            </div>
            <div className=''>
              <button onClick={() => props.setShowPanel(false)}>
                <ArrowLeftCircleIcon className='text-white-200 w-7 h-7' />
              </button>
            </div>
          </div>
              <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={hazards.find((tab) => tab.current).title}
        >
          {hazards.map((tab) => (
            <option key={tab.name}>{tab.title}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block px-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {hazards.map((tab) => (
              <span
                key={tab.name}
                onClick={(e) => {
                  const oldIndex = hazards.findIndex(obj => obj.current === true);
                  const newIndex = hazards.findIndex(obj => obj.title === e.target.innerHTML);

                  hazards[oldIndex].current = false;
                  hazards[newIndex].current = true;
                  props.setActiveHazard(e.target.innerHTML)}}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer'
                )}
              >
                {tab.title}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>

        </div>
      </Transition.Child>
    </Transition.Root>
  );
}

InfoPanel.propTypes = {
  show: PropTypes.bool,
  setShowPanel: PropTypes.func,
  setActiveHazard: PropTypes.func,
  activeHazard: PropTypes.string
};
