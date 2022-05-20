import { useState, useEffect } from "react";

const Login = () => {
  const [user, setUser] = useState(undefined);

  const loadUser = () => {
    fetch("/api/me")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return undefined;
        }
      })
      .then(user => {
        setUser(user);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);



  return (
    <div>
        <button type="button" className="login" style={{borderRadius: "8px", boxShadow: "0 2px #ff66b3"}}>
            {!user ? (<li><a style={{color: "#ff66b3"}} href="http://localhost:3001/login">Login</a></li>) : (<li>Hello, {user.nickname} <a href="http://localhost:3001/logout">Logout</a></li>)}
        </button>
    </div>
    // <nav>
    //   <ul>
    //     {!user ? (
    //       <li>
    //         <button type="button" name="login" className="login"><a href="http://localhost:3001/login">LogIn</a></button>
    //       </li>
    //     ) : (
    //       <li>
    //         Hello, {user.nickname}
    //         <button className="log-button"><a href="http://localhost:3001/logout">LogOut</a></button>
    //       </li>
    //     )}
    //   </ul>
    // </nav>
  );
};

export default Login;
