import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import Login from "../Login";
import bigBunny from "./bigBunny.png";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
        <NavLink to="/"> <div> <img className="bunnyLogo" src={bigBunny} alt="" style={{ width: "15rem", height: "15rem", marginTop: "2rem", alignItems: "left", marginRight: "" }}/> </div> </NavLink>
          <NavLink to="/" className="navWords">Home</NavLink>
          <NavLink to="/dallas" className="navWords">Dallas</NavLink>
          <NavLink to="/korea" className="navWords">Korea</NavLink>
          <NavLink to="/about" className="navWords">About</NavLink>
          <NavLink to="/contactme" className="navWords">Contact Me</NavLink>
          <NavLink to="/sign-up" className="navWords">Sign Up</NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <Login />
          {/* <NavBtnLink to='/api/me'>Sign In</NavBtnLink> */}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
