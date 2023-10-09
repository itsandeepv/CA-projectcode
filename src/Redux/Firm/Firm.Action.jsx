// Firm.Action.js
import axios from "axios";
import { ERROR_FIRM_REGISTER, LOADING_FIRM_REGISTER, SET_FIRM_ID, SET_FIRM_NAME, SUCCESS_FIRM_REGISTER, SUCCESS_GET_FIRM_REGISTER } from "./Firm.Type";



export const  getFirmData = (token) => (dispatch) => {

    const headers = {
        'Content-Type': 'application/json',
        'token': `${token}`
    };

    dispatch({ type: LOADING_FIRM_REGISTER });

     axios.get(
        `https://tax-service.onrender.com/firm_registration`,
        { headers }
      )
        .then(res => {
            dispatch({ type: SUCCESS_GET_FIRM_REGISTER, payload: res.data });
            console.log("firm data get",res.data);
           
        })
        .catch(err => {
            dispatch({ type: ERROR_FIRM_REGISTER, payload: err });
            console.log(err);
        });
};



export const firmRegisterAction = (formData, token) => (dispatch) => {
    console.log(formData, "token", token);
    const headers = {
        'Content-Type': 'application/json',
        'token': `${token}`
    };

    dispatch({ type: LOADING_FIRM_REGISTER });

    axios.post(`https://tax-service.onrender.com/firm_registration`, formData, { headers })
        .then(res => {
            dispatch({ type: SUCCESS_FIRM_REGISTER, payload: res.data });
            console.log(res);
            if (res.status === 201) {
                alert("Successfully registered") 
                dispatch(getFirmData(token)) 
            }
        })
        .catch(err => {
            dispatch({ type: ERROR_FIRM_REGISTER, payload: err });
            console.log(err);
        });
};


export const setFirmId=(firmId)=>(dispatch)=>{
    dispatch({type:SET_FIRM_ID,payload:firmId})
}



export const setFirmName=(firmName)=>(dispatch)=>{
    dispatch({type:SET_FIRM_NAME,payload:firmName})
}

  
