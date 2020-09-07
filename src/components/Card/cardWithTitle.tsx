import React, { ReactNodeArray } from 'react';

import Card, { CardBody } from './index';
import Grid, { GridItem } from '../Grid';

import styles from './Card.module.css';

interface ICardWithTitleProps {
    title: string,
    subTitle?: string,
    leftChildren?: ReactNodeArray,
    rightChildren?: ReactNodeArray,
}

export default function CardWithTitle({
  title, subTitle, leftChildren, rightChildren,
}: ICardWithTitleProps) {
  return (
    <Card>
      <CardBody>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>
                <div className={styles.title}>
                  <Grid column>
                    <GridItem>
                      <h2 className="name">{title}</h2>
                    </GridItem>
                    {
                        subTitle
                        && <GridItem><span className="manufacturer">{subTitle}</span></GridItem>
                      }
                  </Grid>
                </div>
              </GridItem>
              {
                  leftChildren
                  && leftChildren.map((ele, i) => <GridItem key={i}>{ele}</GridItem>)
                }
            </Grid>
          </GridItem>
          {rightChildren
            && (
              <GridItem>
                <Grid>
                  {rightChildren.map((ele, i) => <GridItem key={i}>{ele}</GridItem>)}
                </Grid>
              </GridItem>
            )}
        </Grid>
      </CardBody>
    </Card>
  );
}
