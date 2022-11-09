import axios from "axios";
import setAuthToken from '../helper/setAuthToken'

//Load User
export const  loadUser = () => async dispatch =>{
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
     const res = await axios.get('/api/auth');
     dispatch({
       type:USER_LOAD,
       payload:res.data
     })
    } catch (error) {
    dispatch({
      type:USER_LOAD_FAIL,
    }) 
  }
}

//:: Register user ::
export const register =
  ({ name, password, email }) =>
  async dispatch => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
  
    const body ={name, email, password};
    
    try {
      const res = await axios.post("api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
         
      });
      dispatch(loadUser())

    } catch (err) {
      const errors = err.response.data.error;
      
       if (errors) {     
         errors.map((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
       }
       
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

  // ::Login user ::
export const login =
  ({password, email }) =>
  async (dispatch) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
  
    const body ={email, password};
    
    try {
      const res = await axios.post("api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
         
      });
      dispatch(loadUser())

    } catch (err) {
      const errors = err.response.data.error;
      
       if (errors) {     
         errors.map((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
       }
       
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  // logout user 
  
  export const logout = () => dispatch =>{
    dispatch({
      type:CLEAR_PROFILE
    })
    dispatch({
      type:LOGOUT
    })
  }