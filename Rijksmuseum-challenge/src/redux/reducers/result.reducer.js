const resultReducer = (state = [], action) => {
  switch (action.type) {
    case "result":
      return action.payload;

    default:
      return state;
  }
};
export default resultReducer;
