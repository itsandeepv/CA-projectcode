import axios from "axios";
import {
  DELETE_STOCKS,
  ERROR_STOCKS,
  GET_STOCKS,
  LOADING_STOCKS,
  SUCCESS_STOCKS,
  UPDATE_STOCKS,
} from "./stock.types";

export const getStockAction = (token, firmId) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_STOCKS });

  const url = `https://tax-service.onrender.com/item/${firmId}/products`;
  axios
    .get(url, { headers })
    .then((res) => {
      dispatch({ type: GET_STOCKS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: ERROR_STOCKS, payload: error });
    });
};

export const postStockAction = (creds, token) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_STOCKS });

  const url = `https://tax-service.onrender.com/item/insertproduct`;
  axios
    .post(url, creds, { headers })
    .then((res) => {
      dispatch({ type: SUCCESS_STOCKS, payload: res.data });

      console.log(res);
      if (res.status === 201) {
        alert("Item added successfully");

        // dispatch(getStockAction(token, Number(creds.firmId)));
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: ERROR_STOCKS, payload: error });
      alert(error.response.data.message);
    });
};

export const updateStockAction = (creds, token) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_STOCKS });
  try {
    const url = `https://tax-service.onrender.com/items/id`;
    axios.put(url, creds, { headers }).then((res) => {
      dispatch({ type: UPDATE_STOCKS, payload: res.data });
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_STOCKS, payload: error });
  }
};

  export const deleteStockAction = (token,id) => (dispatch) => {
const headers={
    "token":`${token}`
}
    dispatch({ type: LOADING_STOCKS });
    try {
      const url=`https://tax-service.onrender.com/item/product/${id}`
      axios.delete(url,{ headers }).then((res) => {
        dispatch({ type: DELETE_STOCKS, payload: res.data });
        // alert(res.data)
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR_STOCKS, payload: error });
    }
  };
