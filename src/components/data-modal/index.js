import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask, editTask } from "../../redux/actions/todoAction";
import "./index.scss";

const DataModal = (props) => {
  const taskList = useSelector((state) => state.todoDataReducer);
  const [formData, setFormData] = useState("");
  const [formValid, setFormValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    /*
     * setting selected row data using props in add or update modal popup
     */
    setFormData({
      id:
        props.selectedTaskData && props.selectedTaskData !== "new"
          ? props.selectedTaskData.id
          : Math.floor(Math.random() * (999 - 100 + 1) + 100),
      taskName:
        props.selectedTaskData && props.selectedTaskData !== "new"
          ? props.selectedTaskData.taskName
          : "",
      date:
        props.selectedTaskData && props.selectedTaskData !== "new"
          ? props.selectedTaskData.date
          : "",
      status:
        props.selectedTaskData && props.selectedTaskData !== "new"
          ? props.selectedTaskData.status
          : "active",
    });
  }, [props.selectedTaskData]);

  useEffect(() => {
    /*
     * setting flag for form validation for button disable.
     */
    if (formData && formData.taskName && formData.date) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData]);

  useEffect(() => {
    /*
     * detect change on add, update & delete and show toast with sucess message.
     */
    if (taskList.tasks.length > 0) {
      toast.success("Sucess");
    }
  }, [taskList.tasks]);

  const updateData = () => {
    /*
     * dispatch method to add & update value in store
     */
    if (props.selectedTaskData === "new") {
      dispatch(addTask(formData));
    } else {
      dispatch(editTask(formData));
    }
    props.closeModal(null);
  };

  const handleChange = (evt, isDate = false) => {
    /* 
     * setting form data as an object in state
     */
    if (                                      //not allowing number in task name input using rejex. 
      !isDate &&
      evt.target.name === "taskName" &&
      !/^[a-zA-Z]*$/.test(evt.target.value)
    ) {
      return false;
    }
    const value = isDate ? evt : evt.target.value;
    const key = isDate ? "date" : evt.target.name;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const getModalJSX = () => {                     //Return jsx for modal popup
    return (
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => props.closeModal(null)}>
            &times;
          </span>
          <h3>
            {props.selectedTaskData === "new" ? "Add Task" : "Update Task"}
          </h3>
        </div>
        <div className="modal-body">
          <div className="modal-body-data">
            <div>Task ID:- &nbsp;&nbsp;&nbsp;{formData && formData.id}</div>
          </div>
          <div className="modal-body-data">
            <label>Task Name</label>
            <input
              type="text"
              name="taskName"
              onChange={handleChange}
              value={formData && formData.taskName}
              placeholder="Task Name"
            />
          </div>
          <div className="modal-body-data">
            <label>Task Date</label>
            <DatePicker
              selected={formData && formData.date}
              onChange={(d) => {
                handleChange(d, true);
              }}
              placeholderText="Date"
            />
          </div>
          {props.selectedTaskData !== "new" ? (
            <div className="modal-body-data">
              <label>Status</label>
              <select
                name="status"
                className="status__dropdown"
                onChange={handleChange}
                value={formData && formData.status}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ) : null}
          <div className="modal-btn">
            <button
              type="submit"
              onClick={() => updateData()}
              disabled={!formValid}
              className={!formValid ? "btn-disabled" : null}
            >
              {props.selectedTaskData ? "ADD" : "UPDATE"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {props.selectedTaskData ? (
        <div id="myModal" className="modal">
          {getModalJSX()}
        </div>
      ) : null}
    </div>
  );
};

export default DataModal;
