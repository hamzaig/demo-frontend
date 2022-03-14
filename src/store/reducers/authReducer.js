import { USER_CREATE_PIN_FAIL, USER_CREATE_PIN_REQUEST, USER_CREATE_PIN_RESET, USER_CREATE_PIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_RESET, USER_LOGIN_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_OTP_GENERATE_FAIL, USER_OTP_GENERATE_REQUEST, USER_OTP_GENERATE_RESET, USER_OTP_GENERATE_SUCCESS, USER_PIN_RESET_FAIL, USER_PIN_RESET_REQUEST, USER_PIN_RESET_RESET, USER_PIN_RESET_SUCCESS, USER_VERIFY_OTP_FAIL, USER_VERIFY_OTP_REQUEST, USER_VERIFY_OTP_RESET, USER_VERIFY_OTP_SUCCESS } from "../constants/authConstants";

export const userOtpGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_OTP_GENERATE_REQUEST:
      return { loading: true };
    case USER_OTP_GENERATE_SUCCESS:
      return { loading: false, success: true, responseData: action.payload };
    case USER_OTP_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_OTP_GENERATE_RESET:
      return {};
    default:
      return state;
  }
}

export const verifyOtpReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_VERIFY_OTP_REQUEST:
      return { loading: true };
    case USER_VERIFY_OTP_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_VERIFY_OTP_FAIL:
      return { loading: false, error: action.payload };
    case USER_VERIFY_OTP_RESET:
      return { user: {} };
    default:
      return state;
  }
}

export const createPinReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case USER_CREATE_PIN_REQUEST:
      return { loading: true };
    case USER_CREATE_PIN_SUCCESS:
      return { loading: false, success: true, userData: action.payload };
    case USER_CREATE_PIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_PIN_RESET:
      return { userData: {} };
    default:
      return state;
  }
}

export const userLoginReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userData: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return { userData: {} };
    default:
      return state;
  }
}

export const userPinResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PIN_RESET_REQUEST:
      return { loading: true };
    case USER_PIN_RESET_SUCCESS:
      return { loading: false, success: true, responseInfo: action.payload };
    case USER_PIN_RESET_FAIL:
      return { loading: false, error: action.payload };
    case USER_PIN_RESET_RESET:
      return {};
    default:
      return state;
  }
}

export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { loading: true };
    case USER_LOGOUT_SUCCESS:
      return { loading: false, success: true };
    default:
      return state;
  }
}