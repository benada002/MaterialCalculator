import React from 'react';

import { IProduct } from '../../interfaces/product';
import { IMaterial } from '../../interfaces/material';

import Card, { CardBody, CardWithTitle } from '../../components/Card';

interface IResult {
    currProduct?: IProduct,
    currMaterials: IMaterial[],
}

export default function Result({
  currProduct, currMaterials,
}: IResult) {
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
