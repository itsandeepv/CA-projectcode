import axios from "axios";
import {
  ERROR_REGISTER,
  LOADING_REGISTER,
  SUCCESS_REGISTER,
} from "./Auth.Type";

export const AuthRegisterAction = (creds,navigate) => (dispatch) => {
  dispatch({ type: LOADING_REGISTER });

  axios
    .post(`https://tax-service.onrender.com/signup`, creds)
    .then((res) => {
      dispatch({ type: SUCCESS_REGISTER, payload: creds });
    //   console.log(res.data);
      if (res.data.status === 201) {
        alert(res.data.message);
        navigate("/Login")
      }
    })

    .catch((err) => {
      dispatch({ type: ERROR_REGISTER, payload: err });

    //   console.log(err.response.data.message);

      alert(err.response.data.message);
    });
};
