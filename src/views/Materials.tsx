import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faMoneyBill, faRulerHorizontal, faRulerVertical, faEdit, faTrash, faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import { NavLink, useHistory, Link } from 'react-router-dom';
import { deleteDBItem, updateDBItem } from '../store/actions/asyncActions';
import { deleteMaterial, updateMaterial } from '../store/actions/materials';
import { resetForm, updateFrom } from '../store/actions/forms';
import { IMaterial } from '../interfaces/material';
import { RootState, IMaterialState } from '../interfaces/state';
import { useDB } from '../hooks/useGetDB';

import Button from '../components/Button';
import IconLabel from '../components/IconLabel';
import { CardWithTitle } from '../components/Card';

const mapStateToMaterialProps = (state: RootState) => ({
  deleteCurrentMaterial: state.forms.deleteCurrent,
});
const mapDispatchToMaterialProps = (dispatch: any) => ({
  deleteMaterial: (keys: number[]) => dispatch(deleteDBItem('materials', keys, deleteMaterial)),
  updateMaterial: (id: number, value: IMaterial) => dispatch(updateDBItem('materials', id, value, updateMaterial)),
  updateMaterialForm: (value: IMaterial) => dispatch(updateFrom('currMaterial', value)),
  resetDeleteConfirm: () => dispatch(resetForm('deleteCurrent')),
});

type reduxProps =
  ReturnType<typeof mapDispatchToMaterialProps>&ReturnType<typeof mapStateToMaterialProps>;
interface IMaterialProps {
  material: IMaterial,
  openOrCloseModal: (modalComponent?: string) => void,
}

const Material = connect(mapStateToMaterialProps, mapDispatchToMaterialProps)(({
  material,
  deleteCurrentMaterial,
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
  const deleteHandler = (): void => {
    if (!id) return;

    openOrCloseModal('deleteConfirm');
    if (deleteCurrentMaterial) deleteMaterial([id]);
    openOrCloseModal();
    resetDeleteConfirm();
  };

  const calculatedPrice = (price / ((width * fLength) / 100)).toFixed(2);

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

interface IMaterialsProps {
  materials: IMaterialState
  openOrCloseModal: (modalComponent?: string) => void
}

type reduxMaterialsProps = ReturnType<typeof mapStateToProps>

function Materials({ materials, openOrCloseModal }: IMaterialsProps & reduxMaterialsProps) {
  useDB('materials');

  const openModalMaterials = (): void => openOrCloseModal('materials');

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
      <Button><Link to="/materials/new"><FontAwesomeIcon icon={faPlus} /></Link></Button>
    </>
  );
}

export default connect(mapStateToProps)(Materials);
