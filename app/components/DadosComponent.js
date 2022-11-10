/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Container, Form, Grid, GridColumn } from 'semantic-ui-react';
import DiceAnimate from './dice';

let Box = {};
export default function DadosComponent() {
  useEffect(() => {
    Box = new DiceAnimate('#dicebox');
    Box.init();
  }, []);
  const [bet, setBet] = useState('');
  const RollBack = async () => {
    const response = await Box.roll().then(r => r);
    console.log(response);
  };
  return (
    <>
      index
      <Container>
        <Grid celled>
          <Grid.Row>
            <GridColumn width={2}>
              <Form onSubmit={() => RollBack()}>
                <Form.Input
                  type="number"
                  value={bet}
                  label="Apuesta"
                  onChange={e => setBet(e.target.value)}
                />
                <Form.Button basic color="green">
                  Jugar
                </Form.Button>
              </Form>
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
