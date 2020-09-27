export const addTask = (data) => (dispatch) => {   //method for add task
  dispatch(addTaskData(data));
};

export const editTask = (data) => (dispatch) => {   //method for edit task
  dispatch(editTaskData(data));
};

export const deleteTask = (id) => (dispatch) => {   //method for delete task
  dispatch(deleteTaskData(id));
};

export function setLoading(status) {   //Not using loader in this proj because we are using redux store.
  return {
    status,
    type: "SET_LOADING",
  };
}

export function addTaskData(payload) {
  return {
    type: "ADD_TASK",
    payload: payload,
  };
}

export function editTaskData(payload) {
  return {
    type: "EDIT_TASK",
    payload: payload,
  };
}

export function deleteTaskData(payload) {
  return {
    type: "DELETE_TASK",
    payload: payload,
  };
}
