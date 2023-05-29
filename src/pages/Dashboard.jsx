import moment from "moment";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import Endpoint from "../services/Endpoint";
import image from "./../assets/img/activity-empty-state.png";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [process, setProcess] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (item) => {
    setShowDelete(true);
    setDeleteItem(item);
  };

  const createActivity = async () => {
    setProcess(true);

    try {
      const res = await Endpoint.createActivity({
        title: "New Activity",
        email: 'eriztaalifad@gmail.com',
      });
      setProcess(false);
      getActivities();
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getActivities = async () => {
    try {
      const res = await Endpoint.getAllActivity();
      setActivities(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDate = async () => {
    try {
      getActivities();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div className="container flex flex-col">
      <div className="flex justify-between">
        <h1 data-cy="activity-title" className="py-10 text-4xl font-bold mx-24">Activity</h1>
        <div data-cy="activity-add-button">
          {process ? (
            <button className="px-10 py-3 my-8 text-lg font-bold text-white rounded-full main-color">
              <Spinner animation="border" variant="light" />
            </button>
          ) : (
            <button
              className="font-bold text-lg main-color my-8 px-7 ml-auto py-3 rounded-full text-white before:content-['+'] before:text-xl before:px-2"
              onClick={createActivity}
            > &nbsp;
              Tambah
            </button>
          )}
        </div>
      </div>
      {activities.length === 0 ? (
        <div data-cy="activity-empty-state" className="flex justify-center">
          <img
            src={image}
            alt="Activity Empty State"
            loading="lazy"
            onClick={createActivity}
            className="cursor-pointer hover:"
          />
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 ml-24 mb-24">
          {activities.map((item, key) => (
            <div
            data-cy="activity-item"
              className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-xl w-60 text-start"
              key={key}
            >
              <Link 
                data-cy="activity-item-title"
            
              to={"/detail/" + item.id} className="text-black">
                <h2 className="mb-24 text-lg font-bold">{item.title} </h2>
              </Link>
              <div className="z-10 flex justify-between align-center">
                <p 
                  data-cy="activity-item-date"
                
                className="text-sm text-gray-500">
                  {moment(item.created_at)
                    .locale("id", require("moment/locale/id"))
                    .format("D MMMM yyyy")}
                </p>
                <div data-cy="activity-item-delete-button">
                  <button
                    onClick={() => handleShowDelete(item)}
                    className="text-xl text-gray-500"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <DeleteModal
        show={showDelete}
        item={deleteItem}
        type="activity"
        handleClose={handleCloseDelete}
        deleteData={deleteDate}
      ></DeleteModal>
    </div>
  );
};

export default Dashboard;
