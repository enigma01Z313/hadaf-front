const taskReducer = (state, action) => {
  if (action.type === "SET") return action.payload;

  if (action.type === "SET_TITLE") return { ...state, title: action.payload };
  if (action.type === "SET_STATUS")
    return { ...state, status: { ...state.state, ...action.payload } };

  if (action.type === "SET_DESCRIPTION")
    return { ...state, description: action.payload };

  if(action.type === 'SET_assignee') {
    console.log(action.payload);
    console.log(state);

    return {...state, assignee: action.payload}
  }

  return state;
};

export default taskReducer;
