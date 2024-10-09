import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import infoIcon from "../assets/info-icon.svg";

export default function DataInfoPopover({ description }) {
  return (
    <span className="pl-1.5 inline-block align-middle">
      <Popover className="relative">
        <PopoverButton className="inline-flex items-center ">
          <img
            src={infoIcon}
            aria-hidden="true"
            className="h-5 w-5 text-dark-wood-400"
          />
        </PopoverButton>

        <PopoverPanel
          transition
          className="absolute z-10  flex max-w-min px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="w-56 rounded-[10px] border border-dark-wood-700 book-info-sm bg-white p-4 text-left ">
            <p>{description}</p>
          </div>
        </PopoverPanel>
      </Popover>
    </span>
  );
}

DataInfoPopover.propTypes = {
  description: PropTypes.string,
};
