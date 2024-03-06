import { Fragment } from "react";
import "../../styles/modal.css"; // Import the CSS file

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  msg: string;
  title: string;
  imageUrl?: string;
}

const ModalforSuccess: React.FC<ModalProps> = ({ show, handleClose, msg, title, imageUrl }) => {
  return (
    <Fragment>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal bg-white rounded-lg overflow-hidden shadow-xl relative">
            <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 hover:text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="modal-content bg-white p-4">
              <h2 className=" text-center mb-4 modal-title">{title}</h2>
              <p className="text-center modal-text">{msg}</p>
              {imageUrl && <img src={imageUrl} alt="Description of the image" className="mx-auto mb-4" style={{ width: "180px", height: "168px" }} />}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalforSuccess;
