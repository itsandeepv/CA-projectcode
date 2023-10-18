import axios from "axios";
import {
  ERROR_REGISTER,
  LOADING_REGISTER,
  SUCCESS_REGISTER,
} from "./Auth.Type";
import { LIVE_URL2 } from "../config/Commen";
export const AuthRegisterAction = (creds,navigate) => (dispatch) => {
  dispatch({ type: LOADING_REGISTER });

  axios
    .post(`${LIVE_URL2}/signup`, creds)
    .then((res) => {
      dispatch({ type: SUCCESS_REGISTER, payload: creds });
      console.log(res.data);
      if (res.status === 201) {
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
