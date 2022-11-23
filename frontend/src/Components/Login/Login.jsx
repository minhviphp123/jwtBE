import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let res = useSelector(state =>
        state.auth.login.mess?.mess);

    const [name, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function changeUsername(e) {
        setUsername(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function submitLogin(e) {
        e.preventDefault();
        //call api login
        const user = {
            name: name,
            password: password
        }

        loginUser(user, dispatch, navigate);
        e.preventDefault();
    }

    return (
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form onSubmit={submitLogin}>
                {res && <h2 style={{ color: "red", margin: "10px auto" }}>{res}</h2>}
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" onChange={changeUsername} value={name} />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" onChange={changePassword} value={password} />
                <button type="submit"> Continue </button>
            </form>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
    );
}

export default Login;