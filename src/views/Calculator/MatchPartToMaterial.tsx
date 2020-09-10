import React from 'react';

import { IProduct } from '../../interfaces/product';
import { IMaterial } from '../../interfaces/material';
import { IMaterialState } from '../../interfaces/state';

import Card, { CardBody, CardWithTitle } from '../../components/Card';
import Button from '../../components/Button';

interface IMatchPartToMaterial {
    currProduct?: IProduct,
    currMaterials: IMaterial[],
    materials: IMaterialState,
    setMaterial: (material: IMaterial, i?: number) => void
  }

export default function MatchPartToMaterial({
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
