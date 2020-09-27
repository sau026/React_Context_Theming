export const addTask = (data) => (dispatch) => {
  dispatch(addTaskData(data));
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(deleteTaskData(id));
};

export const editTask = (data) => (dispatch) => {
  dispatch(editTaskData(data));
};

export function setLoading(status) {
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
  console.log("edit task:::::", payload);
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
