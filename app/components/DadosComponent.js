import React, { useEffect } from 'react';
import { Button, Container, Grid, GridColumn } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import DiceAnimate from './dice';
export default function DadosComponent() {
  let Box = {};
  useEffect(() => {
    Box = new DiceAnimate('#dicebox');
    Box.init();
  }, []);

  const RollBack = () => {
    const response = Box.roll();
    response.forEach(element => {
      console.log(element.value);
    });
  };
  return (
    <>
      index
      <Container>
        <Grid celled>
          <Grid.Row>
            <GridColumn width={2}>
              <Button basic color="green" onClick={() => RollBack()}>
                Jugar
              </Button>
            </GridColumn>
            <GridColumn width={14}>
              <Container
                id="dicebox"
                style={{ height: '400px', width: '900px', border: 'solid 1px' }}
              />
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}
