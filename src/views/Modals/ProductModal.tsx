import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { connect } from 'react-redux';

import StepView, { IStep } from 'src/components/StepView';
import { useHistory } from 'react-router-dom';
import { addProduct, updateProduct } from '../../store/actions/products';
import { addDBItem, updateDBItem } from '../../store/actions/asyncActions';
import { IFormValues } from '../../interfaces/form';
import { IProduct } from '../../interfaces/product';
import { updateFrom, resetForm } from '../../store/actions/forms';
import { RootState } from '../../interfaces/state';

const mapStateToProps = (state: RootState) => ({
  currentProduct: state.forms.currProduct,
  currentModal: state.ui.currentModalComponent,
});
const mapDispatchToProps = (dispatch: any) => ({
  updateProductForm: (value: IFormValues) => dispatch(updateFrom('currProduct', value)),
  resetProductForm: () => dispatch(resetForm('currProduct')),
  addItem: (value: IProduct) => dispatch(addDBItem('products', value, addProduct)),
  updateItem: (id: number, value: IProduct) => dispatch(updateDBItem('products', id, value, updateProduct)),
  // resetDeleteConfirm: () => dispatch(resetForm('deleteCurrent')),
});

type reduxProps =
  ReturnType<typeof mapDispatchToProps>&ReturnType<typeof mapStateToProps>;

interface IProductModal {
  openOrCloseModal: (modalComponent?: string) => void
}

function ProductModal(
  {
    openOrCloseModal, currentProduct, updateProductForm, resetProductForm, addItem, updateItem, currentModal,
  }: IProductModal & reduxProps,
) {
  useEffect(() => () => resetProductForm(), [currentModal, resetProductForm]);
  const [currPartIndex, setCurrPartIndex] = useState(0);
  const history = useHistory();

  const close = () => history.goBack();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof IProduct, isInt = false) => {
    // @ts-ignore
    updateProductForm({ [field]: isInt ? +e.target.value : e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentProduct.id) {
      addItem(currentProduct);
    } else {
      updateItem(currentProduct.id, currentProduct);
    }

    close();
    // openOrCloseModal();
  };
  const handlePartsChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const parts = [...currentProduct.parts];
    if (!parts[currPartIndex]) parts[currPartIndex] = '';
    parts[currPartIndex] = e.target.value;
    // @ts-ignore
    updateProductForm({ parts });
  };
  const handleReset = () => {
    resetProductForm();
  };

  const nameView = () => (
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={currentProduct.name ?? ''}
      onChange={(e) => handleChange(e, 'name')}
      required
    />
  );

  const partView = () => {
    // eslint-disable-next-line
    const [inputVisible, setInputVisible] = useState(false);

    const handleAddButton = () => {
      setCurrPartIndex(currPartIndex + 1);
      setInputVisible(false);
    };

    return (
      <>
        {currentProduct.parts && currentProduct.parts.map((ele, i) => ((i < currPartIndex) ? (<div>{ele}</div>) : null))}
        {inputVisible ? (
          <>
            <input
              type="text"
              name="part"
              placeholder="Teil"
              required
              value={currentProduct.parts[currPartIndex] ?? ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlePartsChange(e)}
            />
            <button type="button" onClick={handleAddButton}>Hinzufügen</button>
          </>
        ) : <button type="button" onClick={() => setInputVisible(true)}>Teil Hinzufügen</button>}
      </>
    );
  };

  const sizeView = () => {
    // eslint-disable-next-line
    const [inputVisible, setInputVisible] = useState(false);

    const handleSizeSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const formData = e.currentTarget.elements;
      // @ts-ignore
      const size = +formData.size.value;
      const values = {};

      for (let i = 0; i < formData.length; i++) {
        // @ts-ignore
        const { name, value } = formData[i];
        const [part, measure] = name.split('-');

        // @ts-ignore
        if (currentProduct.parts.indexOf(part) !== -1) {
          console.log(part, measure);
          // @ts-ignore
          values[part] = values[part] ?? {};
          // @ts-ignore
          values[part][measure] = +value;
        }
      }

      // @ts-ignore
      updateProductForm({ sizes: { [size]: values } });

      e.currentTarget.reset();
    };

    return (
      <>
        {
          currentProduct.sizes
          // @ts-ignore
          && Object.entries(currentProduct.sizes).map(([key]) => <div>{key}</div>)
        }
        {inputVisible ? (
          <form onSubmit={handleSizeSubmit}>
            <input
              type="text"
              name="size"
              placeholder="Größe"
              required
            />
            {currentProduct.parts && currentProduct.parts.map((ele, i) => (
              <>
                <input required type="text" name={`${ele}-width`} placeholder={`${ele} Width`} />
                <input required type="text" name={`${ele}-height`} placeholder={`${ele} Height`} />
              </>
            ))}
            <button type="submit">Hinzufügen</button>
          </form>
        )
          : <button type="button" onClick={() => setInputVisible(true)}>Größe Hinzufügen</button>}
        <button type="submit">Submit</button>
      </>
    );
  };

  const steps: IStep[] = [
    {
      name: 'Name',
      element: nameView(),
    },
    {
      name: 'Teile',
      element: partView(),
    },
    {
      name: 'Größen',
      element: sizeView(),
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <StepView steps={steps} />
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
