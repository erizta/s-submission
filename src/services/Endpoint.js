import http from "./Base";

const getAllActivity = () =>
  http.get(`/activity-groups?email=eriztaalifad@gmail.com`);
const getDetail = (id) => http.get("/activity-groups/" + id);
const createActivity = (data) =>
  http.post("/activity-groups", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
const updateActivity = ({ data, id }) =>
  http.patch(`/activity-groups/${id}`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
const deleteActivity = (id) =>
  http.delete("/activity-groups/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
const getAllTodo = (id) => http.get(`/todo-items?activity_group_id=${id}`);
const getOneTodo = (id) => http.get(`/activity-groups/${id}`);
const createTodo = (data) =>
  http.post("/todo-items", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
const updateTodo = ({ data, id }) =>
  http.patch(`/todo-items/${id}`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
const deleteTodo = (id) =>
  http.delete("/todo-items/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const Endpoint = {
  getAllActivity,
  getDetail,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllTodo,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default Endpoint;
