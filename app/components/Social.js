/* eslint-disable react/prop-types */

import {
  Button,
  Grid,
  GridRow,
  Header,
  Icon,
  TextArea,
  GridColumn,
} from 'semantic-ui-react';
import React from 'react';

export default function SocialComponent(props) {
  const urlShare = `${props.url} | ${props.short}`;
  return (
    <Grid celled="internally" relaxed="very">
      <GridRow>
        <GridColumn width={4}>
          <Header as="h2" icon>
            <Icon name="share alternate" />
            Compartir Url
          </Header>
        </GridColumn>
        <GridColumn width={12}>
          <GridRow>
            <TextArea value={urlShare} />
          </GridRow>
          <GridRow>
            <Button icon="facebook f" content="Facebook" basic color="blue" />
            <Button icon="twitter" content="Twitter" basic color="blue" />
          </GridRow>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
