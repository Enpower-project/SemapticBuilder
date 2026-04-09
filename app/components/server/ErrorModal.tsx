//
// "genericMessage" with message in modal div
//
// modal with 1 or 2 error buttons
//
// one "OK" button to leave modal
//
// second button visible if "errorButtonVisible" is true
// text for second button in "errorButton"
//   - opens a second button with "errorMessage"
//
import { useState } from "react";

interface ModalProps {
  genericMessage: string;
  errorMessage: string;
  errorButton: string;
  errorButtonVisible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ModalProps> = ({
  genericMessage,
  errorMessage,
  errorButton,
  errorButtonVisible,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Call onClose when the modal is closed
  };

  const handleViewError = () => {
    setIsErrorVisible(true);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              ​
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left flex flex-col justify-center w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                      <span
                        dangerouslySetInnerHTML={{ __html: genericMessage }}
                      />
                    </h3>
                    {isErrorVisible && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{errorMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Ok
                </button>
                {!isErrorVisible && errorButtonVisible && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleViewError}
                  >
                    {errorButton}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;

/*
import { useState } from "react";

interface ModalProps {
  genericMessage: string;
  errorMessage: string;
  errorButton: string;
  errorButtonVisible: boolean;
  onClose: () => void; // Add an onClose prop
}

const ErrorModal: React.FC<ModalProps> = ({
  genericMessage,
  errorMessage,
  errorButton,
  errorButtonVisible,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Call onClose when the modal is closed
  };

  const handleViewError = () => {
    setIsErrorVisible(true);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              ​
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left  flex flex-col justify-center w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                      {genericMessage}
                    </h3>
                    {isErrorVisible && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{errorMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center  bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Ok
                </button>
                {!isErrorVisible && errorButtonVisible && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleViewError}
                  >
                    {errorButton}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;

*/
