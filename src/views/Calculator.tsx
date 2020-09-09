import React, { useState } from 'react';
import { connect } from 'react-redux';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { useDB } from '../hooks/useGetDB';
import { IMaterial } from '../interfaces/material';
import { RootState, IProductState, IMaterialState } from '../interfaces/state';
import { IProduct } from '../interfaces/product';

import Button from '../components/Button';
import Card, { CardWithTitle, CardBody } from '../components/Card';
import StepView, { Step } from '../components/StepView';

interface IChooseProduct {
  currProduct?: IProduct,
  products: IProductState,
  setCurrProduct: (product: IProduct) => void
}

function ChooseProduct({ currProduct, products, setCurrProduct }:IChooseProduct) {
  return (
    <>
      <h2>Wähle ein Produkt.</h2>
      {
        // @ts-ignore
        [...products.entries()].map(
          ([id, product]) => {
            const currentChoise = currProduct && currProduct.id === id;

            return (
              <CardWithTitle
                key={id}
                title={product.name}
                rightChildren={[
                  <Button
                    onClick={() => setCurrProduct(product)}
                    noShadow
                    noBackground={currentChoise}
                    disabled={currentChoise}
                    icon={currentChoise ? faCheckCircle : undefined}
                  >
                    {currentChoise ? 'Ausgewählt' : 'Auswählen'}
                  </Button>,
                ]}
              />
            );
          },
        )
      }
    </>
  );
}

interface IMatchPartToMaterial {
  currProduct?: IProduct,
  currMaterials: IMaterial[],
  materials: IMaterialState,
  setMaterial: (material: IMaterial, i?: number) => void
}

function MatchPartToMaterial({
  currProduct, setMaterial, currMaterials, materials,
}: IMatchPartToMaterial) {
  return (
    <>
      <h2>Wähle Material</h2>
      {
        // @ts-ignore
        currProduct.parts.map(
          // @ts-ignore
          (part, i) => (
            <Card>
              <CardBody>
                <p>{part + (currMaterials[i] ? ` = ${currMaterials[i].name}` : '')}</p>
                {i === currMaterials.length
                  && (
                  <div>
                    {materials && [...materials.entries()].map(
                      ([id, materialVal]) => (
                        <CardWithTitle
                          key={id}
                          title={materialVal.name}
                          rightChildren={[
                            <Button
                              onClick={() => setMaterial(materialVal)}
                              noShadow
                            >
                              Auswählen
                            </Button>,
                          ]}
                        />
                      ),
                    )}
                  </div>
                  )}
              </CardBody>
            </Card>
          ),
        )
      }
    </>
  );
}

interface ISum {
  currProduct?: IProduct,
  currMaterials: IMaterial[],
}

function Sum({
  currProduct, currMaterials,
}: ISum) {
  if (!currProduct || !currMaterials) return null;

  return (
    <>
      <h2>Ergebnis</h2>
      {
        // @ts-ignore
        currProduct.sizes && Object.entries(currProduct.sizes).map(
          // @ts-ignore
          ([size], i) => {
            let sum = 0;

            return (
              <Card>
                <CardBody>
                  <p>
                    Größe:
                    {' '}
                    {size}
                  </p>
                  <div>
                    {
                      // @ts-ignore
                    currProduct.parts && currProduct.parts.map((part) => {
                      const currSum = (currMaterials[i].price / ((currMaterials[i].width / 100) * (currMaterials[i].fLength / 100)))
                        * ((currProduct.sizes[size as any][part].height / 100) * (currProduct.sizes[size as any][part].width / 100));

                      sum += currSum;
                      return (
                        <CardWithTitle
                          title={part}
                          rightChildren={[
                            <span>
                              {currSum.toFixed(2)}
                              €
                            </span>,
                          ]}
                        />
                      );
                    })
                    }
                  </div>
                  <div>
                    Gesamt:
                    {' '}
                    {sum.toFixed(2)}
                    €
                  </div>
                </CardBody>
              </Card>
            );
          },
        )
      }
    </>
  );
}

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
        <Sum
          currProduct={currProduct}
          currMaterials={currMaterials}
        />
      </Step>
    </StepView>
  );
}
export default connect(mapStateToProps)(Calculator);
