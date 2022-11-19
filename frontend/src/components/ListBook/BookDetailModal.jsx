import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CustomBtn from "../widgets/CustomBtn";

export default function MyModal({
  isOpen,
  closeModal,
  bookName,
  authorName,
  description,
  category,
}) {
  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {bookName}
                  </Dialog.Title>

                  <div className="mt-2 space-y-2">
                    {/* Author */}
                    <p className="font-semibold">
                      Author:{" "}
                      <span className="font-bold italic text-md text-gray-500">
                        {authorName}
                      </span>
                    </p>

                    {/* Category */}
                    <p className="font-semibold">
                      Category:{" "}
                      <span className="font-bold italic text-md text-gray-500">
                        {category}
                      </span>
                    </p>

                    {/* Description */}
                    <p className="font-semibold">
                      Description:
                      <span className="text-sm text-gray-500 italic">
                        {" "}
                        {description}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <CustomBtn
                      type="button"
                      className="inline-flex py-3 rounded-full px-8 bg-gray-400 text-white"
                      onClick={() => closeModal()}
                    >
                      Got it, thanks!
                    </CustomBtn>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}
