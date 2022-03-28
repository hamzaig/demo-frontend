import { CREATE_BUSINESS_FAIL, CREATE_BUSINESS_REQUEST, CREATE_BUSINESS_RESET, CREATE_BUSINESS_SUCCESS, DELETE_BUSINESS_FAIL, DELETE_BUSINESS_REQUEST, DELETE_BUSINESS_RESET, DELETE_BUSINESS_SUCCESS, GET_ALL_BUSINESS_FAIL, GET_ALL_BUSINESS_REQUEST, GET_ALL_BUSINESS_RESET, GET_ALL_BUSINESS_SUCCESS } from "../constants/businessConstants";

export const createBusinessReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BUSINESS_REQUEST:
      return { loading: true };
    case CREATE_BUSINESS_SUCCESS:
      return { loading: false, success: true };
    case CREATE_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_BUSINESS_RESET:
      return {};
    default:
      return state;
  }
}

export const getBusinessesReducer = (state = { businessData: [] }, action) => {
  switch (action.type) {
    case GET_ALL_BUSINESS_REQUEST:
      return { loading: true };
    case GET_ALL_BUSINESS_SUCCESS:
      return { loading: false, success: true, businessData: action.payload };
    case GET_ALL_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_BUSINESS_RESET:
      return { businessData: {} };
    default:
      return state;
  }
}

export const deleteBusinessReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BUSINESS_REQUEST:
      return { loading: true };
    case DELETE_BUSINESS_SUCCESS:
      return { loading: false, success: true };
    case DELETE_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_BUSINESS_RESET:
      return {};
    default:
      return state;
  }
}