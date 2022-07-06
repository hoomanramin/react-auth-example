import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import {useNavigate} from "react-router-dom";

const ProfileForm = () => {
  const passwordInput = useRef();
  const authCTX = useContext(AuthContext);
  const navigate = useNavigate();
  const submitHandler = async e => {
    e.preventDefault();
    const enteredPassword = passwordInput.current.value;
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCty3-Luc0nbwy7Jn8M3O_U_Swk541cFrE",
        {
          method: "POST",
          body: JSON.stringify({
            password: enteredPassword,
            idToken: authCTX.token,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        navigate("/");
        console.log(data);
      } else {
        const data = await res.json();
        throw new Error(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInput} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
