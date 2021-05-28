import { useReducer } from "react";

export const useCardDetailsReducer = () => {
  const cardDetailsReducer = (state, action) => {
    switch (action.type) {
      case "ADD_NAME_ON_CARD":
        return {
          ...state,
          nameOnCard: action.payload,
        };
      case "SET_NAME_ON_CARD_VALID":
        return {
          ...state,
          nameValid: action.payload,
        };
      case "ADD_CARD_NUMBER":
        return {
          ...state,
          cardNumber: action.payload,
        };
        case "SET_CARD_NUMBER_VALID":
            return {
              ...state,
              cardNumberValid:action.payload,
            };
        case "ADD_EXPIRATION_DATE":
            return {
              ...state,
              expirationDate:action.payload,
            };
        case "SET_EXPIRATION_DATE_VALID":
            return {
              ...state,
              expirationDateValid:action.payload,
            };
        case "ADD_CVV":
            return{
                ...state,
                cvv:action.payload
            }
        case "SET_CVV_VALID":
            return {
              ...state,
              cvvValid:action.payload,
            };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cardDetailsReducer, {
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    nameValid: true,
    cardNumberValid: true,
    expirationDateValid: true,
    cvvValid: true,
  });

  return {
    ...state,
    cardDetailsDispatch: dispatch,
  };
};
