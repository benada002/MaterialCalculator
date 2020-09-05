import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Link, useHistory } from 'react-router-dom';
import { updateProduct, deleteProduct } from '../store/actions/products';
import { updateFrom, resetForm } from '../store/actions/forms';
import Button from '../components/Button';
import { IMaterial } from '../interfaces/material';
import { deleteDBItem, updateDBItem } from '../store/actions/asyncActions';
import { useDB } from '../hooks/useGetDB';
import { RootState } from '../interfaces/state';
import { CardWithTitle } from '../components/Card';
import { IProduct } from '../interfaces/product';

const mapStateToMaterialProps = (state: RootState) => ({
  deleteCurrentProduct: state.forms.deleteCurrent,
});
const mapDispatchToMaterialProps = (dispatch: any) => ({
  deleteProduct: (keys: number[]) => dispatch(deleteDBItem('materials', keys, deleteProduct)),
  updateProduct: (id: number, value: IMaterial) => dispatch(updateDBItem('materials', id, value, updateProduct)),
  updateProductForm: (value: IProduct) => dispatch(updateFrom('currProduct', value)),
  resetDeleteConfirm: () => dispatch(resetForm('deleteCurrent')),
});

type reduxProductProps =
  ReturnType<typeof mapDispatchToMaterialProps>&ReturnType<typeof mapStateToMaterialProps>;

interface IProductProps {
  product: IProduct,
  openOrCloseModal: (modalComponent?: string) => void,
}

const Product = connect(mapStateToMaterialProps, mapDispatchToMaterialProps)(({
  product,
  deleteCurrentProduct,
  /* eslint-disable */ deleteProduct /* eslint-enable */,
  openOrCloseModal,
  resetDeleteConfirm,
  updateProductForm,
}: IProductProps & reduxProductProps) => {
  const history = useHistory();
  const { id, name } = product;

  const editHandler = (): void => {
    if (!id) return;
    updateProductForm(product);
    history.push('/products/new');
  };
  const deleteHandler = (): void => {
    if (!id) return;

    openOrCloseModal('deleteConfirm');
    if (deleteCurrentProduct) deleteProduct([id]);
    openOrCloseModal();
    resetDeleteConfirm();
  };

  const rightChildren = [
    <FontAwesomeIcon icon={faEdit} onClick={editHandler} />,
    <FontAwesomeIcon icon={faTrash} onClick={deleteHandler} />,
  ];

  return (
    <CardWithTitle
      key={id}
      title={name}
      rightChildren={rightChildren}
    />
  );
});

const mapStateToProps = (state: RootState) => ({
  products: state.products,
});

interface IProductsProps {
  openOrCloseModal: (modalComponent?: string) => void,
}

type reduxTypes = ReturnType<typeof mapStateToProps>

function Products({ products, openOrCloseModal }: IProductsProps & reduxTypes) {
  useDB('products');

  return (
    <>
      <h1>Products</h1>
      {products && [...products.values()].map(
        (product) => <Product product={product} openOrCloseModal={openOrCloseModal} />,
      )}
      <Button><Link to="/products/new"><FontAwesomeIcon icon={faPlus} /></Link></Button>
    </>
  );
}

export default connect(mapStateToProps)(Products);
