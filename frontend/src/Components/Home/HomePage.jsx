import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../redux/apiRequest";
import "./home.css";
import jwt from 'jwt-decode';

const HomePage = () => {
  //DUMMY DATA
  const [role, setRole] = useState();
  const [message, setMessage] = useState();

  const user = useSelector(state =>
    // if (state.auth.login.currentUser) {
    //   return (state.auth.login.currentUser);
    // }
    state.auth.login?.currentUser
  );

  //state returned!
  const userList = useSelector(state => state.users.users.allUsers?.data);
  const mess = useSelector(state => state.delete.delete.mess);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deleteById(id) {
    let token = user?.accessToken;
    // console.log(token);
    await deleteUser(token, dispatch, id);
    // await getAllUsers(user?.accessToken, dispatch);
  }

  useEffect(() => {
    if (!user || user === null) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch);
      // setRole(jwt(user.accessToken.admin))
    }
    if (user) {
      setRole((jwt(`Bearer ${user.accessToken}`)).admin);
    }
    if (mess) {
      console.log(mess, '47');
      setMessage(mess.mess);
    }

  }, [mess])

  return (
    <main className="home-container">
      {console.log('mess', mess, message)}
      {/* {mess !== null && <h3>{mess}</h3>} */}
      <div className="home-title">User List</div>
      <h2>Role:{role === true ? "Admin" : "User"}</h2>
      <div className="home-userlist">
        {console.log(userList)}
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.name}</div>
              <div className="delete-user" onClick={() => deleteById(user._id)}> Delete </div>
            </div>
          );
        })}
        {message && <h3>{message}</h3>}
      </div>
    </main>
  );
};

export default HomePage;
