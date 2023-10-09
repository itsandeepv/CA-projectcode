import axios from "axios";
import {
  DELETE_PARTIES,
  ERROR_PARTIES,
  GET_PARTIES,
  GET_PARTY_ID,
  LOADING_PARTIES,
  SUCCESS_PARTIES,
  UPDATE_PARTIES,
  INDUVIDUAL_PARTY,
  SEARCH_PARTIES,
  
} from "./parties.types";

export const getPartiesAction = (token, firmId) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_PARTIES });
  try {
    const url = `https://tax-service.onrender.com/${firmId}/party`;
    axios.get(url, { headers }).then((res) => {
      dispatch({ type: GET_PARTIES, payload: res.data.party });
      console.log("abcd", res.data.party);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_PARTIES, payload: error });
  }
};

export const getInduvidualPartiesAction = (token, firmId , id) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_PARTIES });
  try {
    const url = `https://tax-service.onrender.com/${firmId}/party/${id}`;
    axios.get(url, { headers }).then((res) => {
      dispatch({ type: INDUVIDUAL_PARTY, payload: res.data.party });
      console.log("abcd", res.data.party);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_PARTIES, payload: error });
  }
};

export const postPartiesAction = (creds, token, firmId) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_PARTIES });
  try {
    const url = `https://tax-service.onrender.com/${firmId}/party`;
    axios.post(url, creds, { headers }).then((res) => {
      dispatch({ type: SUCCESS_PARTIES, payload: res.data });
      console.log(res);
      if (res.status === 200) {
        alert("party register success");
        dispatch(getPartiesAction(token, firmId));
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_PARTIES, payload: error });
  }
};

export const updatePartiesAction = (creds, token) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_PARTIES });
  try {
    const url = `https://tax-service.onrender.com/party/id`;
    axios.put(url, creds, { headers }).then((res) => {
      dispatch({ type: UPDATE_PARTIES, payload: res.data });
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_PARTIES, payload: error });
  }
};

export const searchParty = (partyName, token , firmId) => (dispatch) => {
  const headers = {
    token: `${token}`,
  };
  dispatch({ type: LOADING_PARTIES });
  try {
    const url = `https://tax-service.onrender.com/${firmId}/party/search?name=${partyName}`;
    axios.put(url, partyName, { headers }).then((res) => {
      dispatch({ type: SEARCH_PARTIES, payload: res.data });
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_PARTIES, payload: error });
  }
};

export const deletePartiesAction = (token,id,firmId) => (dispatch) => {
const headers={
    "token":`${token}`
}
    dispatch({ type: LOADING_PARTIES });
    try {
      const url=`https://tax-service.onrender.com/party/${id}`
      axios.post(url,{ headers }).then((res) => {
        dispatch({ type: DELETE_PARTIES, payload: res.data.party });
           console.log("del::::",res.data.party)
        dispatch(getPartiesAction(token, firmId));
     
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR_PARTIES, payload: error });
    }
  };






export const setPartyId=(partyId)=>(dispatch)=>{
     dispatch({type:GET_PARTY_ID,payload:partyId})
}
