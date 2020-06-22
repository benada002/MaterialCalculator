import React from 'react';
import { motion } from 'framer-motion';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Products from '../views/Products';
import Materials from '../views/Materials';
import Calculator from '../views/Calculator';
import Settings from '../views/Settings';
import Sidebar from '../components/Sidebar';

import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Sidebar />
        <motion.main className={styles.view}>
          <Switch>
            <Redirect exact from="/" to="products" />
            <Route path="/products" component={Products} />
            <Route path="/materials" component={Materials} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;
