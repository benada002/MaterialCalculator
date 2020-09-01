import React, { ReactElement, JSXElementConstructor } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ProductModal from 'src/views/Modals/ProductModal';
import Products from '../views/Products';
import Materials from '../views/Materials';
import Calculator from '../views/Calculator';
import Settings from '../views/Settings';
import MaterialModal from '../views/Modals/MaterialModal';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { RootState } from '../interfaces/state';
import { updateUiModal } from '../store/actions/ui';

import styles from './App.module.css';

interface IAppProps {
  currentModalComponent: string,
  openOrCloseModal: (modalComponent?: string) => void
}

function App({ openOrCloseModal, currentModalComponent }: IAppProps) {
  const renderRoutesWithModalHandler = (Component: JSXElementConstructor<any>): ReactElement => <Component openOrCloseModal={openOrCloseModal} />;

  return (
    <Router>
      <div className={styles.App}>
        <Sidebar />
        <motion.main className={styles.view}>
          <Switch>
            <Redirect exact from="/" to="products" />
            <Route path="/products" component={() => renderRoutesWithModalHandler(Products)} />
            <Route path="/materials" component={() => renderRoutesWithModalHandler(Materials)} />
            <Route path="/calculator" component={() => renderRoutesWithModalHandler(Calculator)} />
            <Route path="/settings" component={() => renderRoutesWithModalHandler(Settings)} />
          </Switch>
        </motion.main>
        <Modal close={openOrCloseModal} currentComponent={currentModalComponent} components={{ materials: MaterialModal, product: ProductModal }} />
      </div>
    </Router>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentModalComponent: state.ui.currentModalComponent,
});

const mapDispatchToProps = (dispatch: any) => ({
  openOrCloseModal: (modalCompontent = ''): void => dispatch(updateUiModal(modalCompontent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
