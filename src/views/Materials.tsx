import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faMoneyBill, faRulerHorizontal, faRulerVertical, faEdit, faTrash, faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import { useHistory, Link } from 'react-router-dom';
import { updateUiModal } from '../store/actions/ui';
import { deleteDBItem, updateDBItem } from '../store/actions/asyncActions';
import { deleteMaterial, updateMaterial } from '../store/actions/materials';
import { resetForm, updateFrom } from '../store/actions/forms';
import { IMaterial } from '../interfaces/material';
import { RootState, IMaterialState } from '../interfaces/state';
import { useDB } from '../hooks/useGetDB';
import deletePromise from '../deletePromise';

import Button from '../components/Button';
import IconLabel from '../components/IconLabel';
import { CardWithTitle } from '../components/Card';
import { IModalComponentKeys } from '../modal';

const mapDispatchToMaterialProps = (dispatch: any) => ({
  deleteMaterial: (keys: number[]) => dispatch(deleteDBItem('materials', keys, deleteMaterial)),
  updateMaterial: (id: number, value: IMaterial) => dispatch(updateDBItem('materials', id, value, updateMaterial)),
  updateMaterialForm: (value: IMaterial) => dispatch(updateFrom('currMaterial', value)),
  resetDeleteConfirm: () => dispatch(resetForm('deleteCurrent')),
});

type reduxProps =
  ReturnType<typeof mapDispatchToMaterialProps>;
interface IMaterialProps {
  material: IMaterial,
  openOrCloseModal: (modalComponent?: IModalComponentKeys) => void,
}

const Material = connect(null, mapDispatchToMaterialProps)(({
  material,
  /* eslint-disable */ deleteMaterial /* eslint-enable */,
  openOrCloseModal,
  resetDeleteConfirm,
  updateMaterialForm,
}: IMaterialProps & reduxProps) => {
  const history = useHistory();

  const {
    id, name, manufacturer, width, fLength, price,
  } = material;

  const editHandler = (): void => {
    if (!id) return;

    updateMaterialForm(material);
    history.push('/materials/new');
  };

  const deleteHandler = async () => {
    if (!id) return;

    openOrCloseModal('deleteConfirm');

    try {
      await deletePromise();

      deleteMaterial([id]);
    } catch {
      console.log('Delete canceled');
    } finally {
      openOrCloseModal();
      resetDeleteConfirm();
    }
  };

  const calculatedPrice = (price / ((width / 100) * (fLength / 100))).toFixed(2);

  const leftChildren = [
    <IconLabel label={`${width}cm`} icon={faRulerVertical} />,
    <IconLabel label={`${fLength}cm`} icon={faRulerHorizontal} />,
    <IconLabel label={`${price.toFixed(2)}€`} icon={faShoppingCart} />,
    <IconLabel label={`${calculatedPrice}€/m²`} icon={faMoneyBill} />,
  ];

  const rightChildren = [
    <FontAwesomeIcon icon={faEdit} onClick={editHandler} />,
    <FontAwesomeIcon icon={faTrash} onClick={deleteHandler} />,
  ];

  return (
    <CardWithTitle
      title={name}
      subTitle={manufacturer}
      leftChildren={leftChildren}
      rightChildren={rightChildren}
    />
  );
});

const mapStateToProps = (state: RootState) => ({
  materials: state.materials,
});

const mapDispatchToProps = (dispatch: any) => ({
  openOrCloseModal:
    (modalCompontent?: IModalComponentKeys): void => dispatch(updateUiModal(modalCompontent)),
});

interface IMaterialsProps {
  materials: IMaterialState
}

type reduxMaterialsProps = ReturnType<typeof mapStateToProps>&ReturnType<typeof mapDispatchToProps>

function Materials({ materials, openOrCloseModal }: IMaterialsProps & reduxMaterialsProps) {
  useDB('materials');

  return (
    <>
      <h1>Materials</h1>
      {[...materials.entries()].map(
        ([id, material]) => (
          <Material
            key={id}
            material={material}
            openOrCloseModal={openOrCloseModal}
          />
        ),
      )}
      <Button round><Link to="/materials/new"><FontAwesomeIcon icon={faPlus} /></Link></Button>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Materials);
