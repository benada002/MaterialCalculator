import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useDB } from 'src/hooks/useGetDB';
import { IMaterial } from 'src/interfaces/material';
import Card, { CardWithTitle, CardBody } from '../components/Card';
import { RootState, IProductState, IMaterialState } from '../interfaces/state';
import StepView from '../components/StepView';
import { IProduct } from '../interfaces/product';

interface IChooseProduct {
  currProduct: IProduct|{},
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
          ([id, product]) => <div onClick={() => { setCurrProduct(product); }}><CardWithTitle key={id} title={product.name} /></div>,
        )
      }
    </>
  );
}

interface IMatchPartToMaterial {
  currProduct: IProduct|{},
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
              {[
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
                          rightChildren={[<button type="button" onClick={() => setMaterial(materialVal)}>Auswählen</button>]}
                        />
                      ),
                    )}
                  </div>
                  )}
                </CardBody>,
              ]}
            </Card>
          ),
        )
      }
    </>
  );
}

interface ISum {
  currProduct: IProduct|{},
  currMaterials: IMaterial[],
}

function Sum({
  currProduct, currMaterials,
}: ISum) {
  console.log(currProduct, currMaterials);
  return (
    <>
      <h2>Ergebniss</h2>
      {
        // @ts-ignore
        currProduct.sizes && Object.entries(currProduct.sizes).map(
          // @ts-ignore
          ([size], i) => {
            let sum = 0;

            return (
              <Card>
                {[
                  <CardBody>
                    <p>{size}</p>
                    <div>
                      {
                      // @ts-ignore
                    currProduct.parts && currProduct.parts.map((part) => {
                      const currSum = (currMaterials[i].price
                        / ((currMaterials[i].width * currMaterials[i].fLength) / 100))
                        // @ts-ignore
                        * (((currProduct.sizes[size][part].height
                        // @ts-ignore
                        * currProduct.sizes[size][part].width) / 100));

                      sum += currSum;
                      return (
                        <CardWithTitle
                          title={part}
                          rightChildren={[
                            <span>
                              {currSum}
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
                      {sum}
                      €
                    </div>
                  </CardBody>,
                ]}
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
  const [currProduct, setCurrProduct] = useState({});
  const [currMaterials, setCurrMaterials] = useState<IMaterial[]>([]);

  const setMaterial = (material: IMaterial, i?: number) => {
    const index = i ?? currMaterials.length;
    const materialsCpy = [...currMaterials];
    materialsCpy[index] = material;

    setCurrMaterials(materialsCpy);
  };

  return (
    <StepView steps={[
      {
        name: 'Wähle Ein Produkt',
        element: <ChooseProduct
          products={products}
          currProduct={currProduct}
          setCurrProduct={setCurrProduct}
        />,
      },
      {
        name: 'Wähle Material',
        element: <MatchPartToMaterial
          currProduct={currProduct}
          setMaterial={setMaterial}
          currMaterials={currMaterials}
          materials={materials}
        />,
      },
      {
        name: 'Ergebniss',
        element: <Sum
          currProduct={currProduct}
          currMaterials={currMaterials}
        />,
      },
    ]}
    />
  );
}
export default connect(mapStateToProps)(Calculator);
