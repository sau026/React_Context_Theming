import React, { useState, useEffect } from "react";
import { deleteTask } from "../../redux/actions/todoAction";
import { useSelector, useDispatch } from "react-redux";
import DataModal from "../../components/data-modal";
import "./index.scss";

const Table = (props) => {
  const allToDo = useSelector((state) => state.todoDataReducer);
  const dispatch = useDispatch();
  const [allToDoData, setAllToDoData] = useState([]);
  const [selectedTaskData, setSelectedTaskData] = useState(null);
  const [selecFilter, setSelecFilter] = useState(null);

  useEffect(() => {
    if(selecFilter){
      filterTodo(selecFilter)
    } else{
      setAllToDoData(allToDo.tasks);
    }
  }, [allToDo]);

  const filterTodo = (data) => {
    setSelecFilter(data)
    if (data === "all") {
      setAllToDoData(allToDo.tasks);
      return;
    }
    const newArray = allToDo.tasks.filter((e) => {
      return e.status === data;
    });
    setAllToDoData(newArray);
  };

  const deleteTasksList = (id) => {
    dispatch(deleteTask(id));
  };

  const openCloseModal = (data) => {
    setSelectedTaskData(data);
  };

  const getDate = (date) => {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getYear();
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
                <th
                  onClick={() => console.log("trtrtrt")}
                  style={{ cursor: "pointer" }}
                >
                  ToDo ID
                </th>
                <th>task Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
              <tbody>
                {allToDoData.length > 0 &&
                  allToDoData.map((element, i) => {
                    return (
                      <tr key={i}>
                        <td>{element.id}</td>
                        <td>{element.taskName}</td>
                        <td>{getDate(element.date)}</td>
                        <td
                          className={
                            element.status === "active"
                              ? "text-yellow"
                              : "text-green"
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
                  })}
              </tbody>
          </table>
          {allToDoData.length === 0 ? <h4>No Record</h4> : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <DataModal
        selectedTaskData={selectedTaskData}
        closeModal={(e) => openCloseModal(e)}
      />
      {getTableJSX()}
    </>
  );
};

export default Table;
