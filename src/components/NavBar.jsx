import PropTypes from "prop-types";
import { Disclosure } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LangSwitcher from "./LangSwitcher";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/lbs-logo.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar(props) {
  const { t } = useTranslation();
  return (
    <>
      <Disclosure as="nav" className="bg-white border sticky top-0 z-50 ">
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
                    <Link to="/">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src={logo}
                        alt="TreesAI LBS logo"
                      />
                      <div className="flex items-baseline ">
                        <img
                          className="hidden h-6 w-auto lg:block pr-1"
                          src={logo}
                          alt="TreesAI LBS logo"
                        />
                        <h3>.LBS</h3>
                      </div>
                    </Link>
                  </div>
                  <div className="hidden sm:flex sm:space-x-8">
                    <span
                      className={classNames(
                        props.current === "home"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1 uppercase",
                      )}
                    >
                      <Link to="/">{t(`nav.about`)}</Link>
                    </span>

                    <span
                      className={classNames(
                        props.current === "method"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1 uppercase",
                      )}
                    >
                      <Link to="/methode">{t(`nav.method`)}</Link>
                    </span>

                    <span
                      className={classNames(
                        props.current === "wirkung"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1 uppercase",
                      )}
                    >
                      <Link to="/wirkungsmodellierung">{t(`nav.model`)}</Link>
                    </span>
                    <span
                      className={classNames(
                        props.current === "wiki"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1",
                      )}
                    >
                      <Link to="/wiki">WIKI</Link>
                    </span>
                    <span
                      className={classNames(
                        props.current === "info"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1",
                      )}
                    >
                      <Link to="/info">INFO</Link>
                    </span>
                    <span
                      className={classNames(
                        props.current === "contact"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1 uppercase",
                      )}
                    >
                      <Link to="/kontact">{t(`nav.contact`)}</Link>
                    </span>
                    <span className="inline-flex items-center border-b-2 px-1 pt-1">
                      <LangSwitcher />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  VORGEHENSWEISE
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/methode"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  METHODE
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/wirkungsmodellierung"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  WIRKUNGSMODELLIERUNG
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/wiki"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  LBS WIKI
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/info"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  INFO
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/kontact"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  KONTAKT
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
