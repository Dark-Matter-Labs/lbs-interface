import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  XMarkIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import LangSwitcher from "./LangSwitcher";

export default function Example() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [dialogState, setDialogState] = useState(0);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#4A4A4A] bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-indigo-600 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              {dialogState === 0 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <LangSwitcher />
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200 pt-4"
                  >
                    {t(`howto.title`)}
                  </DialogTitle>
                  <h4 className="medium-intro-lg text-white-200">
                    {t(`howto.subtitle`)}
                  </h4>
                  <div>
                    <hr className="my-4" />
                    <ul className="book-info-md text-white-200 list-disc">
                      <li> {t(`howto.instruction_1`)}</li>
                      <li> {t(`howto.instruction_2`)}</li>
                    </ul>
                  </div>
                </div>
              ) : dialogState === 1 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200"
                  >
                    {t(`howto.search`)}
                  </DialogTitle>
                  <h4 className="medium-intro-lg text-white-200">
                    {t(`howto.search_detail`)}
                  </h4>
                  <div>
                    <hr className="my-4" />
                  </div>
                </div>
              ) : dialogState === 2 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200"
                  >
                    {t(`howto.map`)}
                  </DialogTitle>
                  <div>
                    <hr className="my-4" />
                    <div className="book-info-md text-white-200">
                      <p> {t(`howto.map_detail`)}</p>
                    </div>
                  </div>
                </div>
              ) : dialogState === 3 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200"
                  >
                    {t(`howto.location`)}
                  </DialogTitle>
                  <div>
                    <hr className="my-4" />
                    <div className="book-info-md text-white-200">
                      <p> {t(`howto.location_detail`)}</p>
                    </div>
                  </div>
                </div>
              ) : dialogState === 4 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200"
                  >
                    {t(`howto.summary`)}
                  </DialogTitle>
                  <div>
                    <hr className="my-4" />
                    <ul className="book-info-md text-white-200 list-disc">
                      <li> {t(`howto.summary_detail_1`)}</li>
                      <li> {t(`howto.summary_detail_2`)}</li>
                      <li> {t(`howto.summary_detail_3`)}</li>
                      <li> {t(`howto.summary_detail_4`)}</li>
                    </ul>
                  </div>
                </div>
              ) : dialogState === 5 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200"
                  >
                    {t(`howto.single_risk`)}
                  </DialogTitle>
                  <div>
                    <hr className="my-4" />
                    <div className="book-info-md text-white-200">
                      <p> {t(`howto.single_risk_detail`)}</p>
                    </div>
                  </div>
                </div>
              ) : dialogState === 6 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200"
                  >
                    {t(`howto.filter`)}
                  </DialogTitle>
                  <div>
                    <hr className="my-4" />
                    <div className="book-info-md text-white-200">
                      <p> {t(`howto.filter_detail`)}</p>
                    </div>
                  </div>
                </div>
              ) : dialogState === 7 ? (
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="medium-intro-lg uppercase text-white-200"
                  >
                    {t(`howto.method`)}
                  </DialogTitle>
                  <div>
                    <hr className="my-4" />
                    <div className="book-info-md text-white-200">
                      <p> {t(`howto.method_detail`)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="mt-5 sm:mt-4 sm:flex ">
              <button
                type="button"
                onClick={() => {
                  if (dialogState !== 0) {
                    setDialogState(dialogState - 1);
                  } else {
                    setDialogState(7);
                  }
                }}
                className="inline-flex w-full justify-center rounded-md  px-3 py-2  text-white-200 shadow-sm  sm:ml-3 sm:w-auto"
              >
                <ArrowLeftCircleIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (dialogState !== 7) {
                    setDialogState(dialogState + 1);
                  } else {
                    setDialogState(0);
                  }
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-white-200 shadow-sm  sm:mt-0 sm:w-auto"
              >
                <ArrowRightCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
