import axios from "axios";
import { CREATE_BUSINESS_FAIL, CREATE_BUSINESS_REQUEST, CREATE_BUSINESS_SUCCESS, DELETE_BUSINESS_FAIL, DELETE_BUSINESS_REQUEST, DELETE_BUSINESS_SUCCESS, GET_ALL_BUSINESS_FAIL, GET_ALL_BUSINESS_REQUEST, GET_ALL_BUSINESS_SUCCESS } from "../constants/businessConstants";

export function createBusiness(ownerName = "", name = "", mobileNumber = "", type = "", category = "", address = "", email) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_BUSINESS_REQUEST });

      const { userLogin: { userData } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        }
      };
      const { data } = await axios.post("/api/business", { ownerName, name, mobileNumber, type, category, address, email }, config);

      dispatch({ type: CREATE_BUSINESS_SUCCESS, payload: data });

    } catch (error) {
      dispatch({ type: CREATE_BUSINESS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}

export function getBusinesses() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ALL_BUSINESS_REQUEST });

      const { userLogin: { userData } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        }
      };

      const { data } = await axios.get("/api/business", config);

      dispatch({ type: GET_ALL_BUSINESS_SUCCESS, payload: data });

    } catch (error) {
      dispatch({ type: GET_ALL_BUSINESS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}

export function deleteBusiness(id) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_BUSINESS_REQUEST });

      const { userLogin: { userData } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        }
      };

      await axios.delete(`/api/business/${id}`, config);

      dispatch({ type: DELETE_BUSINESS_SUCCESS });

    } catch (error) {
      dispatch({ type: DELETE_BUSINESS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}