const taskReducer = (state, action) => {
  if (action.type === "SET") return action.payload;

  if (action.type === "SET_TITLE") return { ...state, title: action.payload };
  if (action.type === "SET_STATUS")
    return { ...state, status: { ...state.state, ...action.payload } };

  if (action.type === "SET_DESCRIPTION")
    return { ...state, description: action.payload };

  if (action.type === "SET_ASSIGNEE")
    return { ...state, assignee: action.payload };

  if (action.type === "SET_PROGRESS")
    return { ...state, progress: action.payload };

  if (action.type === "SET_COLLEAGES")
    return { ...state, colleagues: action.payload };

  if (action.type === "SET_DUE_DATE")
    return { ...state, dueDate: action.payload };

  if (action.type === "SET_TAGS") return { ...state, tags: action.payload };

  return state;
};

export default taskReducer;
