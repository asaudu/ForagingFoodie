import React from 'react';
import './App.css';
import Navbar from './components/NavBar/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dallas from './Pages/Dallas';
import Korea from './Pages/Korea';
import ContactMe from './Pages/Contact';
import SignUp from './Pages/SignUp';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route path='/' exact element={<Home />} />
		<Route path='/dallas' element={<Dallas />} />
		<Route path='/korea' element={<Korea />} />
    <Route path='/about' element={<About />} />
		<Route path='/contactme' element={<ContactMe />} />
		<Route path='/sign-up' element={<SignUp />} />
	</Routes>
	</Router>
);
}

export default App;

