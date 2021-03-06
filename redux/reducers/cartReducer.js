let defaultState = {
  selectedItems: { items: [], resturantName: "" },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let newState = { ...state };
      {
        if (action.payload.checkboxValue) {
          newState.selectedItems = {
            items: [...newState.selectedItems.items, action.payload],
            resturantName: action.payload.resturantName,
          };
        } else {
          console.log("REMOVE FROM CART");
          newState.selectedItems = {
            items: [
              ...newState.selectedItems.items.filter(
                (item) => item.title !== action.payload.title
              ),
            ],
            resturantName: action.payload.resturantName,
          };
        }
      }

      console.log("newState", newState);
      return newState;

    case "CLEAR_CART":
      return defaultState;

    default:
      return state;
  }
};

export default cartReducer;
