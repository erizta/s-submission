import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import DropdownFilter from "../components/Dropdown";
import FormModal from "../components/FormModal";
import Endpoint from "../services/Endpoint";
import image from "./../assets/img/todo-empty-state.png";

const Activity = () => {
  const location = useLocation();
  const titleInput = useRef(null);

  const [title, setTitle] = useState("");

  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);

  const [show, setShow] = useState(false);
  const [type, setType] = useState(false);

  const [onLoad, setOnLoad] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [filterType, setFilterType] = useState(todos);

  const getDetail = async () => {
    const res = await Endpoint.getOneTodo(
      location.pathname.replace("/detail/", "")
    );
    setTitle(res.data.title);
    setTodos(res.data.todo_items);
  };

  const getDetailTodo = async () => {
    const res = await Endpoint.getAllTodo(
      location.pathname.replace("/detail/", "")
    );
    setTodos(res.data.data);
  };

  const updateData = async () => {
    try {
      const data = {
        title: titleInput.current.value,
      };

      const res = await Endpoint.updateActivity({
        id: location.pathname.replace("/detail/", ""),
        data: data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteDataTodo = async () => {
    try {
      await Endpoint.deleteTodo(deleteItem.id);
      getDetailTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const updateDataTodo = async ({ title, priority, is_active, id }) => {
    try {
      const data = {
        title: title,
        priority: priority,
        is_active: is_active,
      };

      const res = await Endpoint.updateTodo({
        data,
        id: id,
      });
      getDetailTodo();
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const filterData = (type) => {
    setFilterType(type);
  };

  const handleClose = () => setShow(false);

  const handleShow = (type, item) => {
    setShow(true);
    setType(type);
    setEditItem(item);
  };

  const handleShowDelete = (item) => {
    setShowDelete(true);
    setDeleteItem(item);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleEditTitle = () => {
    setEditTitle(!editTitle);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputBlur = (event) => {
    setEditTitle(!editTitle);
    updateData();
  };

  const handleCheck = (item) => {
    updateDataTodo({
      title: item.title,
      priority: item.priority,
      is_active: !item.is_active,
      id: item.id,
    });
  };

  useLayoutEffect(() => {
    setOnLoad(true);
    setOnLoad(false);
  }, []);

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <div className="container flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center ml-20">
            <div>
              <Link to="/" className="pr-5 text-4xl text-black">
                <i className="bx bxs-chevron-left"></i>
              </Link>
            </div>
            <div>
              {editTitle ? (
                <input
                  ref={titleInput}
                  onChange={onChangeTitle}
                  onBlur={handleInputBlur}
                  type="text"
                  className="pr-5 text-4xl font-bold bg-transparent focus:outline-none focus:border-b-2 focus:border-b-gray-800"
                  value={title}
                  autoFocus
                />
              ) : (
                <h1
                  onClick={handleEditTitle}
                  type="text"
                  className="py-8 pr-5 text-4xl font-bold focus:outline-none"
                >
                  {title}
                </h1>
              )}
            </div>

            <div>
              <button
                className="text-xl text-gray-400"
                onClick={handleEditTitle}
              >
                <i className="bx bx-pencil"></i>
              </button>
            </div>
          </div>
          <div className="flex">
            <DropdownFilter filterData={filterData}></DropdownFilter>
            <div>
              <button
                onClick={() => handleShow("add")}
                className="font-bold text-lg main-color my-8 py-3 px-10 rounded-full text-white before:content-['+'] before:text-xl"
              >
                {" "}
                Tambah
              </button>
            </div>
          </div>
        </div>
        {todos.length === 0 ? (
          <div
            className="flex justify-center hover:cursor-pointer"
            onClick={() => {
              handleShow("add");
            }}
          >
            <img src={image} alt="Todo Empty State" loading="lazy" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {onLoad ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              todos
                .sort((a, b) => {
                  switch (filterType) {
                    case "sort-latest":
                      if (
                        a.created_at === undefined ||
                        b.created_at === undefined
                      ) {
                        return a.title.localeCompare(b.title);
                      } else {
                        return a.created_at.localeCompare(b.created_at);
                      }
                    case "sort-oldest":
                      if (
                        a.created_at === undefined ||
                        b.created_at === undefined
                      ) {
                        return b.title.localeCompare(a.title);
                      } else {
                        return b.created_at.localeCompare(a.created_at);
                      }
                    case "sort-az":
                      return a.title.localeCompare(b.title);
                    case "sort-za":
                      return b.title.localeCompare(a.title);
                    case "sort-unfinished":
                      return b.is_active
                        .toString()
                        .localeCompare(a.is_active.toString());
                    default:
                      break;
                  }
                })
                .map((item, key) => (
                  <div
                    key={key}
                    className="flex justify-between w-full p-5 bg-white rounded-lg shadow-xl text-start"
                  >
                    <div className="flex items-center">
                      <input
                        onChange={() => {
                          handleCheck(item);
                        }}
                        checked={!item.is_active}
                        type="checkbox"
                        className="w-4 h-4 ml-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <div
                        className={
                          item.priority === "very-high"
                            ? "ml-5 w-2 h-2 rounded-full very-high"
                            : item.priority === "high"
                            ? "ml-5 w-2 h-2 rounded-full high"
                            : item.priority === "normal"
                            ? "ml-5 w-2 h-2 rounded-full medium"
                            : item.priority === "low"
                            ? "ml-5 w-2 h-2 rounded-full low"
                            : "ml-5 w-2 h-2 rounded-full very-low"
                        }
                      ></div>
                      <h2
                        className={
                          !item.is_active
                            ? "line-through ml-5 font-bold text-lg text-gray-400"
                            : "ml-5 font-bold text-lg"
                        }
                      >
                        {item.title}
                      </h2>
                      <div>
                        <button
                          onClick={() => handleShow("edit", item)}
                          className="ml-5 text-xl text-gray-400"
                        >
                          <i className="bx bx-pencil"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          onClick={() => handleShowDelete(item)}
                          className="ml-5 text-xl text-gray-400"
                        >
                          <i className="bx bx-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
      <FormModal
        show={show}
        type={type}
        edit={editItem}
        activity_group_id={location.pathname.replace("/detail/", "")}
        handleClose={handleClose}
        getData={getDetailTodo}
      />
      <DeleteModal
        show={showDelete}
        item={deleteItem}
        type="todo"
        handleClose={handleCloseDelete}
        deleteData={deleteDataTodo}
      ></DeleteModal>
    </>
  );
};

export default Activity;
