const initialState = {
  tasks: [],
};

const todoData = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: state.tasks.concat(action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((item, i) =>
          item.id === action.payload.id
            ? {
                ...item,
                taskName: action.payload.taskName,
                date: action.payload.date,
                status: action.payload.status,
              }
            : item
        ),
      };
    case "DELETE_TASK":
      console.log("reducer delte::::::::", action);
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload),
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.status,
      };
    default:
      return state;
  }
};

export default todoData;
