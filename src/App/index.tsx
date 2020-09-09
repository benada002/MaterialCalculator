import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import NewProduct from '../views/NewProduct';
import Products from '../views/Products';
import Materials from '../views/Materials';
import Calculator from '../views/Calculator';
import Settings from '../views/Settings';
import NewMaterial from '../views/NewMaterial';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { RootState } from '../interfaces/state';
import { updateUiModal } from '../store/actions/ui';
import { modalComponents, IModalComponentKeys } from '../modal';

import styles from './App.module.css';

const mapStateToProps = (state: RootState) => ({
  currentModalComponent: state.ui.currentModalComponent,
});

const mapDispatchToProps = (dispatch: any) => ({
  openOrCloseModal:
    (modalCompontent?: IModalComponentKeys): void => dispatch(updateUiModal(modalCompontent)),
});

type IAppProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function App({ openOrCloseModal, currentModalComponent }: IAppProps) {
  return (
    <Router>
      <div className={styles.App}>
        <Sidebar />
        <motion.main className={styles.view}>
          <Switch>
            <Redirect exact from="/" to="/products" />
            <Route path="/products/new" component={NewProduct} />
            <Route path="/products" component={Products} />
            <Route path="/materials/new" component={NewMaterial} />
            <Route path="/materials" component={Materials} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </motion.main>
        <Modal
          currentComponent={currentModalComponent}
          close={openOrCloseModal}
          components={modalComponents}
        />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
