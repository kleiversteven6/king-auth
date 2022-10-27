/* eslint-disable react/prop-types */

import {
  Header,
  Icon,
  Input,
  Button,
  Grid,
  GridRow,
  GridColumn,
} from 'semantic-ui-react';
import React from 'react';

export default function ShareComponent({ short, stats, url }) {
  const urlOrigin = `mi url ${url}`;
  const urlShort = `mi url ${short}`;
  const urlStats = `mi url ${stats}`;

  return (
    <Grid celled="internally" relaxed="very">
      <GridRow>
        <GridColumn width={4}>
          <Header as="h2" icon>
            <Icon name="unlink" />
            Url Corta
          </Header>
        </GridColumn>
        <GridColumn width={12} textAlign="center">
          <GridRow>
            <Input
              action={{
                color: 'blue',
                icon: 'copy',
              }}
              defaultValue={urlShort}
            />
          </GridRow>
          <GridRow>
            <Button
              color="blue"
              content="Url Original"
              label={{
                basic: true,
                color: 'grey',
                pointing: 'left',
                content: `${urlOrigin}`,
              }}
            />
            <Button
              color="blue"
              content="Estadísticas"
              label={{
                as: 'a',
                basic: true,
                color: 'grey',
                pointing: 'left',
                content: `${urlStats}`,
              }}
            />
          </GridRow>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
