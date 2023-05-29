import { useState } from "react";
// components
import { Modal, Spinner } from "react-bootstrap";
// services
import Endpoint from "../services/Endpoint";

const DeleteModal = ({ deleteData, handleClose, show, item, type }) => {
  const [process, setProcess] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleDelete = async () => {
    setProcess(true);
    switch (type) {
      case "activity":
        await Endpoint.deleteActivity(item.id);
        deleteData();
        setProcess(false);
        break;
      case "todo":
        deleteData();
        setProcess(false);
        break;

      default:
        break;
    }

    handleClose();
    setAlert(true);
  };

  return (
    <>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="flex flex-col justify-center items-center text-center">
            <svg
              width="84"
              height="84"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42 52.5V52.535M42 31.5V38.5V31.5Z"
                stroke="#ED4C5C"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5002 66.5012H66.5002C67.6423 66.4932 68.765 66.2059 69.7705 65.6643C70.7761 65.1227 71.6338 64.3433 72.2689 63.3941C72.904 62.4449 73.2972 61.3546 73.4142 60.2186C73.5312 59.0825 73.3685 57.935 72.9402 56.8762L48.0902 14.0012C47.4848 12.9071 46.5975 11.9952 45.5203 11.3601C44.4432 10.725 43.2156 10.3901 41.9652 10.3901C40.7148 10.3901 39.4872 10.725 38.41 11.3601C37.3329 11.9952 36.4455 12.9071 35.8402 14.0012L10.9902 56.8762C10.57 57.9108 10.4033 59.0308 10.5042 60.1428C10.6051 61.2549 10.9705 62.3266 11.57 63.2687C12.1694 64.2107 12.9856 64.9956 13.9502 65.558C14.9149 66.1203 16.0001 66.4438 17.1152 66.5012"
                stroke="#ED4C5C"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1 className="text-lg my-14">
              Apakah anda yakin menghapus List Item
              <p className="font-extrabold">"{item.title}"?</p>
            </h1>
            <div className="flex w-full justify-center">
              <button
                onClick={handleClose}
                className="font-bold text-lg bg-gray-100 mx-2 py-3 px-10 rounded-full text-black"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="font-bold text-lg bg-red-500 mx-2 py-3 px-10 rounded-full text-white"
              >
                {" "}
                {process ? (
                  <Spinner animation="border" variant="light"></Spinner>
                ) : (
                  "Hapus"
                )}
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <div>
          <Modal
            show={alert}
            onHide={handleCloseAlert}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <div className="flex justify-center items-center text-center h-16">
              <i className="bx bx-info-circle text-green-600 px-2"></i>
              <p className="text-lg my-14">Activity Berhasil dihapus</p>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
