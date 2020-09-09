import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';

import { IModalComponentKeys } from '../modal';
import { updateUiModal } from '../store/actions/ui';
import { updateProduct, deleteProduct } from '../store/actions/products';
import { updateFrom, resetForm } from '../store/actions/forms';
import { IMaterial } from '../interfaces/material';
import { deleteDBItem, updateDBItem } from '../store/actions/asyncActions';
import { useDB } from '../hooks/useGetDB';
import { RootState } from '../interfaces/state';
import { IProduct } from '../interfaces/product';
import deletePromise from '../deletePromise';

import Button from '../components/Button';
import { CardWithTitle } from '../components/Card';
import FixedPosition from '../components/FixedPosition';

const mapDispatchToMaterialProps = (dispatch: any) => ({
  deleteProduct: (keys: number[]) => dispatch(deleteDBItem('products', keys, deleteProduct)),
  updateProduct: (id: number, value: IMaterial) => dispatch(updateDBItem('materials', id, value, updateProduct)),
  updateProductForm: (value: IProduct) => dispatch(updateFrom('currProduct', value)),
  resetDeleteConfirm: () => dispatch(resetForm('deleteCurrent')),
});

type reduxProductProps =
  ReturnType<typeof mapDispatchToMaterialProps>;

interface IProductProps {
  product: IProduct,
  openOrCloseModal: (modalComponent?: IModalComponentKeys) => void
}

const Product = connect(null, mapDispatchToMaterialProps)(({
  product,
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

  const deleteHandler = async () => {
    if (!id) return;

    openOrCloseModal('deleteConfirm');

    try {
      await deletePromise();

      deleteProduct([id]);
    } catch {
      console.log('Delete canceled');
    } finally {
      openOrCloseModal();
      resetDeleteConfirm();
    }
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

const mapDispatchToProps = (dispatch: any) => ({
  openOrCloseModal:
    (modalCompontent?: IModalComponentKeys): void => dispatch(updateUiModal(modalCompontent)),
});

type reduxTypes = ReturnType<typeof mapStateToProps>&ReturnType<typeof mapDispatchToProps>

function Products({ products, openOrCloseModal }: reduxTypes) {
  useDB('products');

  return (
    <>
      <h1>Products</h1>
      {products && [...products.values()].map(
        (product) => (
          <Product
            key={product.id}
            product={product}
            openOrCloseModal={openOrCloseModal}
          />
        ),
      )}
      <FixedPosition position="bottom-right">
        <Button round>
          <Link to="/products/new">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </Button>
      </FixedPosition>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
