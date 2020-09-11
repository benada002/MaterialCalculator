import React, { ReactNodeArray } from 'react';

import Card, { CardBody } from './index';
import Grid, { GridGutter, GridItem } from '../Grid';

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
        <GridGutter gutter="m">
          <Grid>
            <GridItem>
              <div className={styles.title}>
                <Grid column>
                  <GridItem>
                    <h2 className={styles.name}>{title}</h2>
                  </GridItem>
                  {
                        subTitle
                        && <GridItem><span className={styles.subtitle}>{subTitle}</span></GridItem>
                      }
                </Grid>
              </div>
            </GridItem>
            {
            leftChildren
            && (
            <GridItem margin="right">
              <GridGutter gutter="s">
                <Grid>{leftChildren.map((ele, i) => <GridItem key={i}>{ele}</GridItem>)}</Grid>
              </GridGutter>
            </GridItem>
            )
          }
            {rightChildren
            && (
              <GridItem margin="left">
                <GridGutter gutter="s">
                  <Grid>
                    {rightChildren.map((ele, i) => <GridItem key={i}>{ele}</GridItem>)}
                  </Grid>
                </GridGutter>
              </GridItem>
            )}
          </Grid>
        </GridGutter>
      </CardBody>
    </Card>
  );
}
