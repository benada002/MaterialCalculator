import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useDB } from '../../hooks/useGetDB';
import { IMaterial } from '../../interfaces/material';
import { RootState } from '../../interfaces/state';
import { IProduct } from '../../interfaces/product';

import StepView, { Step } from '../../components/StepView';

import ChooseProduct from './ChooseProduct';
import MatchPartToMaterial from './MatchPartToMaterial';
import Result from './Result';

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  materials: state.materials,
});

type ICalculatorProps = ReturnType<typeof mapStateToProps>

function Calculator({ products, materials } :ICalculatorProps) {
  useDB('products');
  useDB('materials');
  const [currProduct, setCurrProduct] = useState<IProduct>();
  const [currMaterials, setCurrMaterials] = useState<IMaterial[]>([]);

  const setMaterial = (material: IMaterial, i?: number) => {
    const index = i ?? currMaterials.length;
    const materialsCpy = [...currMaterials];
    materialsCpy[index] = material;

    setCurrMaterials(materialsCpy);
  };

  return (
    <StepView>
      <Step name="Wähle ein Produkt" goForward={!!currProduct}>
        <ChooseProduct
          products={products}
          currProduct={currProduct}
          setCurrProduct={setCurrProduct}
        />
      </Step>
      <Step name="Wähle Material" goForward={currMaterials.length === currProduct?.parts.length}>
        <MatchPartToMaterial
          currProduct={currProduct}
          setMaterial={setMaterial}
          currMaterials={currMaterials}
          materials={materials}
        />
      </Step>
      <Step name="Ergebnis">
        <Result
          currProduct={currProduct}
          currMaterials={currMaterials}
        />
      </Step>
    </StepView>
  );
}
export default connect(mapStateToProps)(Calculator);
