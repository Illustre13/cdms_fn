import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import "swiper/css/navigation";
import "swiper/css/pagination";
import IconX from "../../components/Icon/IconX";

interface IModalProps {
  isOpen: boolean;
  size?: string;
  title?: string;
  content?: any;
  button1Text?: string;
  button2Text?: string;
  onClose: () => void;
  onSubmit?: () => void;
  buttonOneDisabled?: boolean;
  buttonTwoDisabled?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  isOpen,
  size = "max-w-lg",
  title = "Modal Title",
  content,
  button1Text = "Discard",
  button2Text = "Save",
  onClose,
  onSubmit,
  buttonTwoDisabled = true,
}) => {
  const dispatch = useDispatch();
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 mt-24" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`panel w-full ${size} overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark`}>
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                  <h5 className="text-lg font-bold">{title}</h5>
                  <button
                    onClick={onClose}
                    type="button"
                    className="text-white-dark hover:text-dark"
                  >
                    <IconX />
                  </button>
                </div>
                <div className="p-5 max-h-96 overflow-y-auto">
                  {content}
                  <div className="mt-8 flex items-center justify-end">
                    <button
                      onClick={onClose}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      {button1Text}
                    </button>
                    <button
                      onClick={onSubmit}
                      disabled={buttonTwoDisabled}
                      type="button"
                      className="btn btn-primary ltr:ml-4 rtl:mr-4"
                    >
                      {button2Text}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
