import axios from "axios";
import {
    LOADING_PURCHASEOUT,
    SUCCESS_PURCHASEOUT,
    ERROR_PURCHASEOUT,
    GET_PURCHASEOUT,
    UPDATE_PURCHASEOUT,
    DELETE_PURCHASEOUT
} from "./purchaseout.types";

export const getPurchaseOutAction = (token, firmId) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASEOUT });
    try {
        const url = `http://localhost:8080/purchaseout/${firmId}/purchaseout`;
        axios.get(url, { headers }).then((res) => {
            dispatch({ type: SUCCESS_PURCHASEOUT, payload: res.data });
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASEOUT, payload: error });
    }
};

export const postPurchaseOutAction = (creds, token, firmId) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASEOUT });
    try {
        const url = `http://localhost:8080/purchaseout/insertpurchaseout/${firmId}`;
        axios.post(url, creds, { headers }).then((res) => {
            dispatch({ type: SUCCESS_PURCHASEOUT, payload: res.data });
            console.log(res);
            if (res.status === 200 || 201) {
                alert("Purchaseout Details Success");
                dispatch(getPurchaseOutAction(token, firmId));
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASEOUT, payload: error });
    }
};

export const updatePurchaseOutAction = (creds, token , firmId , id) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASEOUT });
    try {
        const url = `http://localhost:8080/purchaseout/updatepurchaseout/${firmId}/${id}`;
        axios.patch(url, creds, { headers }).then((res) => {
            dispatch({ type: UPDATE_PURCHASEOUT, payload: res.data });
            console.log(res);
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASEOUT, payload: error });
    }
};

export const deletePurchaseOutAction = (token, id, firmId) => (dispatch) => {
    const headers = {
        "token": `${token}`
    }
    dispatch({ type: LOADING_PURCHASEOUT });
    try {
        const url = `http://localhost:8080/purchaseout/deletepurchaseout/${firmId}/${id}`
        axios.delete(url, { headers }).then((res) => {
            dispatch({ type: DELETE_PURCHASEOUT, payload: res.data.party });
            dispatch(getPurchaseOutAction(token, firmId));
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASEOUT, payload: error });
    }
};



