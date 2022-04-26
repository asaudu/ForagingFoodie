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
		<Route path='/' exact component={Home} />
		<Route path='/dallas' component={Dallas} />
		<Route path='/korea' component={Korea} />
    <Route path='/about' component={About} />
		<Route path='/contactme' component={ContactMe} />
		<Route path='/sign-up' component={SignUp} />
	</Routes>
	</Router>
);
}

export default App;

