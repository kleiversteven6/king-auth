/* eslint-disable react/prop-types */

import { Header, Icon, Input, Button, Grid, GridRow } from 'semantic-ui-react';
import React from 'react';

export default function ShareComponent({ short, stats }) {
  const urlShort = `mi url ${short}`;
  const urlStats = `mi url ${stats}`;

  return (
    <Grid textAlign="center">
      <GridRow>
        <Header as="h2" icon>
          <Icon name="window minimize" />
          Url Corta
        </Header>
      </GridRow>
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
          color="red"
          content="Link Original"
          label={{
            basic: true,
            color: 'red',
            pointing: 'left',
            content: `${urlShort}`,
          }}
        />
        <Button
          color="blue"
          content="Estadísticas"
          label={{
            as: 'a',
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: `${urlStats}`,
          }}
        />
      </GridRow>
    </Grid>
  );
}
ShareComponent.defaultProps = {
  short: 'String',
  stats: 'String',
};
