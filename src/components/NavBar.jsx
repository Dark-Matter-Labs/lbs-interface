import PropTypes from "prop-types";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/lbs-logo.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar(props) {
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white border sticky top-0 z-50 rounded-full"
      >
        {({ open }) => (
          <>
            <div className="global-margin px-2 sm:px-6 lg:px-8 border-b-2 border-b-dark-wood-800">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center pr-20">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="TreesAI LBS logo"
                    />
                    <img
                      className="hidden h-6 w-auto lg:block"
                      src={logo}
                      alt="TreesAI LBS logo"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <span
                      className={classNames(
                        props.current === "portfolio"
                          ? "border-green-600 text-dark-wood-800"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1",
                      )}
                    >
                      VORGEHENSWEISE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                <Disclosure.Button
                  as="a"
                  href="/invest"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Invest
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/glasgow-nbs-portfolio"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Glasgow Pilot
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/learn-more"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Learn More
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/contact"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Contact
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

NavBar.propTypes = {
  current: PropTypes.string,
  loggedIn: PropTypes.bool,
};