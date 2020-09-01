import React, { ReactNodeArray, Fragment } from 'react';

import Card, { CardBody } from './index';
import Grid from '../Grid';

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
      {[
        <CardBody key={1}>
          <Grid>
            {[
              <Grid key={1}>
                {[
                  <div className={styles.title}>
                    <Grid key={0} column>
                      {[
                        <h2 key={0} className="name">{title}</h2>,
                        ...subTitle ? [<span key={1} className="manufacturer">{subTitle}</span>] : [],
                      ]}
                    </Grid>
                  </div>,
                  ...leftChildren?.map((ele, i) => <Fragment key={i + 1}>{ele}</Fragment>) ?? [],
                ]}
              </Grid>,
              ...rightChildren ? [<Grid key={2}>{rightChildren.map((ele, i) => <Fragment key={i}>{ele}</Fragment>)}</Grid>] : [],
            ]}
          </Grid>
        </CardBody>,
      ]}
    </Card>
  );
}
