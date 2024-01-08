const taskReducer = (state, action) => {
  if (action.type === "SET") return action.payload;

  if (action.type === "SET_TITLE") return { ...state, title: action.payload };
  if (action.type === "SET_STATUS"){

    console.log('4---------------------');
    console.log({ ...state, status: { ...state.state, ...action.payload } });
    // return state;
    return { ...state, status: { ...state.state, ...action.payload } };
  }
  if (action.type === "SET_DESCRIPTION")
    return { ...state, description: action.payload };

  return state;
};

export default taskReducer;
