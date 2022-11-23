import { useState } from "react";
import "./register.css";
import { registerUser } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeName(e) {
        setName(e.target.value)
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value)
    }

    function submitForm(e) {
        e.preventDefault();
        const user = {
            name: name,
            email: email,
            password: password
        }
        registerUser(user, dispatch, navigate);
    }

    return (
        <section className="register-container">
            <div className="register-title"> Sign up </div>
            <form onSubmit={submitForm}>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" value={name} onChange={changeName} />
                <label>EMAIL</label>
                <input type="text" placeholder="Enter your username" value={email} onChange={changeEmail} />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={changePassword} />
                <button type="submit"> Create account </button>
            </form>
        </section>

    );
}

export default Register;