import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from './components/partials/Header';
import Sidebar from './components/partials/Sidebar';
import Footer from './components/partials/Footer';
import Routes from './Routes';

function App() {
    return (
        <Router>
            <div className="wrapper">
                <Header/>
                <Sidebar/>

                <Routes/>
                 
                <Footer/>
            </div>
        </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
