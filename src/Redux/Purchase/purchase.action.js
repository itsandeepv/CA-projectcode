import axios from "axios";
import {
    LOADING_PURCHASE,
    SUCCESS_PURCHASE,
    ERROR_PURCHASE,
    GET_PURCHASE,
    UPDATE_PURCHASE,
    DELETE_PURCHASE
} from "./purchase.types";

export const getPurchaseAction = (token, firmId) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASE });
    try {
        const url = `https://tax-service.onrender.com/purchase/${firmId}/purchase`;
        axios.get(url, { headers }).then((res) => {
            console.log("🚀 ~ file: purchase.action.js:19 ~ axios.get ~ res:", res)
            dispatch({ type: SUCCESS_PURCHASE, payload: res.data });
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASE, payload: error });
    }
};

export const postPurchaseAction = (creds, token, firmId) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASE });
    try {
        const url = `https://tax-service.onrender.com/purchase/insertpurchase/${firmId}`;
        axios.post(url, creds, { headers }).then((res) => {
            dispatch({ type: SUCCESS_PURCHASE, payload: res.data });
            console.log(res);
            if (res.status === 200 || 201) {
                alert("Purchase Success");
                dispatch(getPurchaseAction(token, firmId));
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASE, payload: error });
    }
};

export const updatePurchaseAction = (creds, token , firmId , id) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASE });
    try {
        const url = `https://tax-service.onrender.com/purchase/updatepurchase/${firmId}/${id}`;
        axios.patch(url, creds, { headers }).then((res) => {
            dispatch({ type: UPDATE_PURCHASE, payload: res.data });
            console.log(res);
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASE, payload: error });
    }
};

export const deletePurchaseAction = (token, id, firmId) => (dispatch) => {
    const headers = {
        "token": `${token}`
    }
    dispatch({ type: LOADING_PURCHASE });
    try {
        const url = `https://tax-service.onrender.com/purchase/deletepurchase/${firmId}/${id}`
        axios.delete(url, { headers }).then((res) => {
            dispatch({ type: DELETE_PURCHASE, payload: res.data.party });
            dispatch(getPurchaseAction(token, firmId));
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASE, payload: error });
    }
};



