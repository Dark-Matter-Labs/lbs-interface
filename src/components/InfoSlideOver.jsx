import PropTypes from "prop-types";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import infoImage from "../assets/T_Little_eye.svg";
import { get_slide_texts } from "../utils/slide_over_texts";

const slide_text = get_slide_texts();
export default function InfoSlideOver({ label }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open ToolTip</span>

        <img className="inline-block h-6 w-6" src={infoImage} />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="">
                <div className="bg-indigo-600 py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-white-200">
                      {slide_text[label].title}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative flex-1 py-6 px-4 sm:px-6">
                  {slide_text[label].text}
                  <div className="absolute inset-0 py-6 px-4 sm:px-6">
                    <div className="h-full" aria-hidden="true" />
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

InfoSlideOver.propTypes = {
  label: PropTypes.string,
};
