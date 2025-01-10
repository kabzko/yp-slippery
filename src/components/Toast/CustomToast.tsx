import toast from "react-hot-toast";
import SuccessIcon from "./ToastIcon/SuccessIcon";
import ErrorIcon from "./ToastIcon/ErroIcon";
import CloseIcon from "./ToastIcon/CloseIcon";
import classNames from "../../helpers/classNames";

const CustomToast = ({ message, type }: any) => {

    const renderIcon = () => {
        if (type === "success") {
            return <SuccessIcon aria-hidden="true" />;
        } else if (type === "error") {
            return <ErrorIcon aria-hidden="true" />;
        }
        return null; 
    };

    return (
        <div
            className={classNames(
                'pointer-events-auto w-full max-w-sm overflow-hidden rounded-sm shadow-lg ring-1 ring-black ring-opacity-5',
                type === "success" ? 'bg-green-500' : '',
                type === "error" ? 'bg-red-500' : '',
            )}
        >
            <div className="px-4 py-3">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {renderIcon()}
                    </div>
                    <div className="flex-1 ml-3 w-0">
                        <p className="mt-1 text-sm text-white">{message}</p>
                    </div>
                    <div className="flex flex-shrink-0 ml-4">
                        <button
                            type="button"
                            className="inline-flex text-gray-400 bg-transparent rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => toast.remove()}
                        >
                            <span className="sr-only">Close</span>
                            <CloseIcon aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomToast;

