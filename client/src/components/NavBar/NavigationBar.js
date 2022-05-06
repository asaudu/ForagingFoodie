import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, } from './NavBarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/'>
			Home
		</NavLink>	
		<NavLink to='/dallas'>
			Dallas
		</NavLink>
		<NavLink to='/korea'>
			Korea
		</NavLink>
		<NavLink to='/about'>
			About
		</NavLink>
		<NavLink to='/contactme'>
			Contact Me
		</NavLink>
		<NavLink to='/sign-up'>
			Sign Up
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/api/me'>Sign In</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
