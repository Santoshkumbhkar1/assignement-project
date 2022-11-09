import React, { Fragment, useState } from "react";
import { Link, Navigate} from "react-router-dom";

 import { register } from ".";



const Register = ({  isAuthenticate }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;
  const onChange = (data) =>
    setFormData({
      ...formData,
      [data.target.name]: data.target.value,
    });
  const onSubmit = async (data) => {
    data.preventDefault();

    if (password !== confirmPassword) {
      setAlert("both password not match", "danger");
    } else {
    //   register({ name, email, password });
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
         } const body ={name, email, password};
    
         try {
           const res = await axios.post("api/users", body, config);
           console.log(res.data) ;
         } catch (err) {
           const errors = err.response.data.error;
        
            }
    }
  };

//   if (isAuthenticate) {
//     // navigate("/dashboard");
//      return <Navigate to='/dashboard'/>
//   }
  return (
    <Fragment>
      <h1 className="large head-primary">Sign Up !</h1>
      <p className="paraStyle">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <form className="form" onSubmit={(data) => onSubmit(data)}>
        <div className="form-items">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(data) => onChange(data)}
            placeholder="Your Name"
            // required
          />
        </div>
        <div className="form-items">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(data) => onChange(data)}
            placeholder="Your Email"
            // required
          />
        </div>
        <div className="form-items">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(data) => onChange(data)}
            placeholder="Your Password"
            // required
            // minLength="6"
          />
        </div>
        <div className="form-items">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(data) => onChange(data)}
            placeholder="Confirm Password"
            // required
            // minLength="6"
          />
        </div>
        <div className="form-items">
          {" "}
          <input
            type="submit"
            value="Register User"
            className="btn btn-primary"
          />
        </div>
      </form>
      <p className="my-1">
        Already have an account?
        <Link to="/login">
          {" "}
          <i className="fas fa-arrow-circle-right"></i>Login
        </Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

}
export default Register;