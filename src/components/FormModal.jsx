import { useRef, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import Endpoint from "../services/Endpoint";

const FormModal = ({
  show,
  handleClose,
  type,
  activity_group_id,
  edit,
  getData,
}) => {
  const titleInput = useRef();
  const [title, setTitle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [valueDropdown, setValueDropdown] = useState("");

  const showDropdown = () => {
    setShowModal(!showModal);
    setValueDropdown("select");
  };

  const handleSubmit = async () => {
    setIsSubmit(true);
    switch (type) {
      case "add":
        const create = await Endpoint.createTodo({
          activity_group_id: activity_group_id,
          title: titleInput.current.value,
        });

        const data = {
          title: titleInput.current.value,
          priority: valueDropdown,
          is_active: true,
          id: activity_group_id,
        };

        await Endpoint.updateTodo({
          data,
          id: create.data.id,
        });

        setIsSubmit(false);
        handleClose();
        setTitle("");
        getData();
        break;
      case "edit":
        let payload = {
          title: titleInput.current.value,
          priority: valueDropdown,
          is_active: edit.is_active,
        };
        await Endpoint.updateTodo({
          data: payload,
          id: edit.id,
        });
        setIsSubmit(false);
        handleClose();
        setTitle("");
        getData();
        break;
      default:
        break;
    }
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeDropdown = (value) => {
    setValueDropdown(value);
    setShowModal(!showModal);
  };

  return (
    <div data-cy="modal-add">
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <div data-cy="modal-add-title">
            <Modal.Title className="text-lg font-bold">
              {type === "add" ? "Tambah" : "Edit"} Item List
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div data-cy="modal-add-name-title">
                <Form.Label>Nama List Item</Form.Label>
              </div>
              <div data-cy="modal-add-name-input">
                <Form.Control
                  ref={titleInput}
                  defaultValue={edit === undefined ? title : edit.title}
                  onChange={(e) => handleChangeTitle(e)}
                  type="text"
                  placeholder="Nama List Item"
                />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3 w-44"
              controlId="exampleForm.ControlInput1"
            >
              <div data-cy="modal-add-priority-title">
                <Form.Label>Priority</Form.Label>
              </div>

              <div className="relative">
                <div
                  onClick={() => {
                    showDropdown();
                  }}
                  data-cy="modal-add-priority-dropdown"
                  className="bg-white  flex flex-col p-2 border  border-gray-300 rounded-xl w-52"
                >
                  <div className="flex py-2 px-2 items-center justify-between w-full">
                    {valueDropdown === "select" ? (
                      "Pilih Priority"
                    ) : (
                      <div className="flex items-center">
                        <div
                          className={
                            valueDropdown === "very-high"
                              ? "very-high h-2 w-2 rounded-full mr-2"
                              : valueDropdown === "high"
                              ? "high h-2 w-2 rounded-full mr-2"
                              : valueDropdown === "normal"
                              ? "medium h-2 w-2 rounded-full mr-2"
                              : valueDropdown === "low"
                              ? "low h-2 w-2 rounded-full mr-2"
                              : "very-low h-2 w-2 rounded-full mr-2"
                          }
                        ></div>
                        {valueDropdown === "very-high"
                          ? "Very High"
                          : valueDropdown === "high"
                          ? "High"
                          : valueDropdown === "normal"
                          ? "Medium"
                          : valueDropdown === "low"
                          ? "Low"
                          : "Very Low"}
                      </div>
                    )}
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="#111111"
                        strokeLinecap="square"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={showModal ? "absolute" : "hidden"}>
                <div
                  onClick={() => {
                    changeDropdown("very-high");
                  }}
                  data-cy="modal-add-priority-item"
                  className="bg-white  flex flex-col p-2 shadow-xl cursor-pointer w-52 border-b border-b-gray-200"
                >
                  <div className="flex py-2 px-2 items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="very-high h-2 w-2 rounded-full mr-2"></div>
                      Very High
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    changeDropdown("high");
                  }}
                  data-cy="modal-add-priority-item"
                  className="bg-white  flex flex-col p-2 shadow-xl cursor-pointer w-52 border-b border-b-gray-200"
                >
                  <div className="flex py-2 px-2 items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="high h-2 w-2 rounded-full mr-2"></div>High
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    changeDropdown("normal");
                  }}
                  data-cy="modal-add-priority-item"
                  className="bg-white  flex flex-col p-2 shadow-xl cursor-pointer w-52 border-b border-b-gray-200"
                >
                  <div className="flex py-2 px-2 items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="medium h-2 w-2 rounded-full mr-2"></div>
                      Medium
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    changeDropdown("low");
                  }}
                  data-cy="modal-add-priority-item"
                  className="bg-white  flex flex-col p-2 shadow-xl cursor-pointer w-52 border-b border-b-gray-200"
                >
                  <div className="flex py-2 px-2 items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="low h-2 w-2 rounded-full mr-2"></div>Low
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    changeDropdown("very-low");
                  }}
                  data-cy="modal-add-priority-item"
                  className="bg-white  flex flex-col p-2 shadow-xl cursor-pointer w-52 border-b border-b-gray-200"
                >
                  <div className="flex py-2 px-2 items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="very-low h-2 w-2 rounded-full mr-2"></div>
                      Very Low
                    </div>
                  </div>
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isSubmit ? (
            <div className="font-bold text-lg main-color py-3 px-10 rounded-full text-white">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <button
              data-cy="modal-add-save-button"
              onClick={() => handleSubmit()}
              className="font-bold text-lg main-color py-3 px-10 rounded-full text-white disabled:opacity-50"
              disabled={
                edit === undefined
                  ? title === "" ||
                    valueDropdown === "" ||
                    valueDropdown === "select"
                  : edit.title === "" ||
                    valueDropdown === "" ||
                    valueDropdown === "select"
              }
            >
              {" "}
              Simpan
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormModal;
