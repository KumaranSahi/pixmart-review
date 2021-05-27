import { useReducer } from "react";

export const useNewAddressReducer = () => {
  const newAddressReducer = (state, action) => {
    switch (action.type) {
      case "ADD_NAME":
        return {
          ...state,
          name: action.payload,
        };
      case "SET_NAME_VALID":
        return {
          ...state,
          nameValid: action.payload,
        };
      case "ADD_NUMBER":
        return {
          ...state,
          number: action.payload,
        };
      case "SET_NUMBER_VALID":
        return {
          ...state,
          numberValid: action.payload,
        };
      case "ADD_PIN":
        return {
          ...state,
          pin: action.payload,
        };
      case "SET_PIN_VALID":
        return {
          ...state,
          pinValid: action.payload,
        };
      case "ADD_ADDRESS":
        return {
          ...state,
          address: action.payload,
        };
      case "SET_ADDRESS_VALID":
        return {
          ...state,
          addressValid: action.payload,
        };
      case "ADD_LANDMARK":
        return {
          ...state,
          landmark: action.payload,
        };
      case "SET_LANDMARK_VALID":
        return {
          ...state,
          landmarkValid: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(newAddressReducer, {
    name: "",
    nameValid: true,
    number: "",
    numberValid: true,
    pin: "",
    pinValid: true,
    address: "",
    addressValid: true,
    landmark: "",
    landmarkValid: true,
  });
  return {
    ...state,
    newAddressDispatch: dispatch,
  };
};
