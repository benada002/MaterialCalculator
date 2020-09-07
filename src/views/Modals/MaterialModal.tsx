import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Button from 'src/components/Button';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { addMaterial, updateMaterial } from '../../store/actions/materials';
import { addDBItem, updateDBItem } from '../../store/actions/asyncActions';
import { IFormValues } from '../../interfaces/form';
import { IMaterial } from '../../interfaces/material';
import { updateFrom, resetForm } from '../../store/actions/forms';
import { RootState } from '../../interfaces/state';

const mapStateToProps = (state: RootState) => ({
  currentMaterial: state.forms.currMaterial,
  currentModal: state.ui.currentModalComponent,
});
const mapDispatchToProps = (dispatch: any) => ({
  updateMaterialForm: (value: IFormValues) => dispatch(updateFrom('currMaterial', value)),
  resetMaterialForm: () => dispatch(resetForm('currMaterial')),
  addItem: (value: IMaterial) => dispatch(addDBItem('materials', value, addMaterial)),
  updateItem: (id: number, value: IMaterial) => dispatch(updateDBItem('materials', id, value, updateMaterial)),
  // resetDeleteConfirm: () => dispatch(resetForm('deleteCurrent')),
});

type reduxProps =
  ReturnType<typeof mapDispatchToProps>&ReturnType<typeof mapStateToProps>;

interface IMaterialModal {
  history: (modalComponent?: string) => void
}

function MaterialModal(
  {
    currentMaterial, updateMaterialForm, resetMaterialForm, addItem, updateItem, currentModal,
  }: IMaterialModal & reduxProps,
) {
  useEffect(() => () => resetMaterialForm(), [currentModal, resetMaterialForm]);
  const history = useHistory();

  const close = () => history.goBack();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof IMaterial, isInt = false,
  ) => {
    // @ts-ignore
    updateMaterialForm({ [field]: isInt ? +e.target.value : e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentMaterial.id) {
      addItem(currentMaterial);
    } else {
      updateItem(currentMaterial.id, currentMaterial);
    }

    close();
  };
  const handleReset = () => {
    resetMaterialForm();
  };

  return (
    <>
      <Button noBackground noShadow icon={faChevronLeft} onClick={close}>Zurück</Button>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={currentMaterial?.id ?? ''} />
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={currentMaterial?.name ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
        />
        <input
          type="text"
          name="manufacturer"
          placeholder="Hersteller"
          required
          value={currentMaterial?.manufacturer ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'manufacturer')}
        />
        <input
          type="number"
          name="length"
          placeholder="Länge"
          required
          value={currentMaterial?.fLength ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'fLength', true)}
        />
        <input
          type="number"
          name="width"
          placeholder="Breite"
          required
          value={currentMaterial?.width ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'width', true)}
        />
        <input
          type="number"
          name="price"
          placeholder="Preis"
          required
          value={currentMaterial?.price ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'price', true)}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </>
  );
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(MaterialModal);
