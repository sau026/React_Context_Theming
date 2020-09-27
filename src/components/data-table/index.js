import React, { useState } from "react";
import { deleteTask } from "../../redux/actions/todoAction";
import { useSelector, useDispatch } from "react-redux";
import DataModal from "../../components/data-modal";
import "./index.scss";

const Table = (props) => {
  const allToDo = useSelector((state) => state.todoDataReducer);
  const dispatch = useDispatch();
  const [selectedTaskData, setSelectedTaskData] = useState(null);
  const [selecFilter, setSelecFilter] = useState("all");

  const filterTodo = (data) => {
    /*
     * method to set filter status
     */
    setSelecFilter(data);
  };

  const deleteTasksList = (id) => {
    /*
     * dispatch method to delete task
     */
    dispatch(deleteTask(id));
  };

  const openCloseModal = (data) => {
    /*
     * dispatch method to open/close modal popup
     */
    setSelectedTaskData(data);
  };

  const getDate = (date) => {
    /*
     * take new date() and retun in DD/MM/YYYY format.
     */
    return date.getDate() + "/" + date.getMonth() + "/" + date.getYear();
  };

  const getTableData = () => {            // return table data after filter data on selected status
    const task = allToDo.tasks.filter(
      (element) =>
        selecFilter === "all" ||
        (selecFilter !== "all" && selecFilter === element.status)
    );
    if (task.length === 0) {              // return no record message if filered task array is empty
      return (
        <tr>
          <td>No records found</td>
        </tr>
      );
    }

    return task.map((element, i) => {     // return table jsx
      return (
        <tr key={i}>
          <td>{element.id}</td>
          <td>{element.taskName}</td>
          <td>{getDate(element.date)}</td>
          <td
            className={
              element.status === "active" ? "text-yellow" : "text-green"
            }
          >
            {element.status === "active" ? "Active" : "Completed"}
          </td>
          <td>
            <div onClick={() => openCloseModal(element)}>
              <i className="fas fa-edit icon"></i>
            </div>
            <div onClick={() => deleteTasksList(element.id)}>
              <i className="fas fa-trash icon"></i>
            </div>
          </td>
        </tr>
      );
    });
  };

  const getTableJSX = () => {
    return (
      <div className="table-container-main">
        <div className="search-container">
          <select
            name="task-status"
            id="task-status"
            className="status__dropdown"
            onChange={(e) => filterTodo(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => openCloseModal("new")}>Add task</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ToDo ID</th>
                <th>task Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{getTableData()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <DataModal                                    // Data modal for add & update
        selectedTaskData={selectedTaskData}
        closeModal={(e) => openCloseModal(e)}
      />
      {getTableJSX()}
    </>
  );
};

export default Table;
