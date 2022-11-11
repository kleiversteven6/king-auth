/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  GridColumn,
  Segment,
} from 'semantic-ui-react';
import DiceAnimate from './dice';

let Box = {};

export default function DadosComponent() {
  const [bet, setBet] = useState({ total: '2', par: '', impar: '' });
  const [betType, setBetType] = useState('total');
  const [money, setMoney] = useState('');
  const [nDice, setNDice] = useState('2');
  const [resp, setResp] = useState({ total: '0', par: '', impar: '' });
  const [win, setWin] = useState('Aqui apareceran sus resultados.');
  const [diceKD, setDiceKD] = useState(true);

  const RollBack = async () => {
    const dados = await Box.roll(nDice).then(r => r);

    setResp({ total: dados.total });
    isWinner(dados);
    setDiceKD(false);
  };

  // Resultados
  function isWinner(dados) {
    switch (betType) {
      case 'total': {
        if (Number(dados.total) === Number(bet.total)) {
          setWin(`Prediccion Perfecta! +${money * 3}$`);
          break;
        }

        if (
          Number(dados.total) === Number(bet.total) - 1 ||
          Number(dados.total) === Number(bet.total) + 1
        ) {
          setWin(`Prediccion Aproximada. +${money * 1.5}$`);
          break;
        }

        setWin('Prediccion incorrecta.');
        break;
      }

      case 'par/impar': {
        let par = 0;
        let impar = 0;

        dados.sets[0].rolls.forEach(e => {
          if (e.value % 2 === 0) par += 1;
          else impar += 1;
        });

        console.log(par);
        console.log(impar);

        break;
      }

      default:
        break;
    }
  }

  useEffect(() => {
    Box = new DiceAnimate('#dicebox');
    Box.init();
  }, []);

  return (
    <>
      <Container>
        <h1>
          Dados en <i>4K</i>
        </h1>
        <Divider />
        <h3>{win}</h3>
        <Grid celled>
          <Grid.Row>
            {/* <== */}
            <GridColumn width={2}>
              <Form>
                <Button
                  icon="money"
                  content="Dinero a Apostar"
                  labelPosition="left"
                  size="mini"
                />

                <Segment secondary>
                  <Form.Input
                    type="number"
                    value={money}
                    onChange={e => setMoney(e.target.value)}
                  />
                </Segment>

                <Button
                  icon="th list"
                  content="Cantidad de Dados"
                  labelPosition="left"
                  size="mini"
                />
                <Segment secondary>
                  <Form.Radio
                    inline
                    label="2"
                    value="2"
                    checked={nDice === '2'}
                    onChange={(e, { value }) => setNDice(value)}
                  />
                  <Form.Radio
                    label="3"
                    value="3"
                    checked={nDice === '3'}
                    onChange={(e, { value }) => setNDice(value)}
                  />
                  <Form.Radio
                    label="4"
                    value="4"
                    checked={nDice === '4'}
                    onChange={(e, { value }) => setNDice(value)}
                  />
                  <Form.Radio
                    label="5"
                    value="5"
                    checked={nDice === '5'}
                    onChange={(e, { value }) => setNDice(value)}
                  />
                </Segment>
                <Form.Button
                  basic
                  color="green"
                  content="Jugar"
                  size="big"
                  onClick={() => RollBack()}
                />
              </Form>
            </GridColumn>

            {/* |==| */}
            <GridColumn width={12}>
              <Container
                id="dicebox"
                style={{ height: '450px', width: '900px', border: 'solid 1px' }}
              />
            </GridColumn>

            {/* ==> */}
            <GridColumn width={2}>
              <Form>
                <Button
                  icon="wrench"
                  content="Tipo de Apuesta"
                  labelPosition="left"
                  size="mini"
                />
                <Segment secondary>
                  <Form.Group>
                    <Form.Radio
                      inline
                      label="Par / Impar"
                      value="par/impar"
                      checked={betType === 'par/impar'}
                      onChange={(e, { value }) => setBetType(value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Radio
                      label="Total"
                      value="total"
                      checked={betType === 'total'}
                      onChange={(e, { value }) => setBetType(value)}
                    />
                  </Form.Group>
                </Segment>

                {betType === 'total' ? (
                  <>
                    <Button
                      icon="bookmark"
                      content="Apuesta a Total"
                      labelPosition="left"
                      size="mini"
                    />
                    <Segment secondary>
                      <Form.Input
                        type="text"
                        value={bet.total}
                        onChange={(e, { value }) => setBet({ total: value })}
                      />
                    </Segment>
                  </>
                ) : (
                  <>
                    <Button
                      icon="bookmark"
                      content="Apuesta a Par / Impar"
                      labelPosition="left"
                      size="mini"
                    />
                    <Segment secondary>
                      <Form.Input
                        label="Par"
                        type="text"
                        value={bet.par}
                        onChange={(e, { value }) => setBet({ par: value })}
                      />
                      <Form.Input
                        label="Impar"
                        type="text"
                        value={bet.impar}
                        onChange={(e, { value }) => setBet({ impar: value })}
                      />
                    </Segment>
                  </>
                )}
              </Form>
            </GridColumn>
          </Grid.Row>
        </Grid>
        {!diceKD &&
          (betType === 'total' ? (
            <h1>El total es {resp.total}</h1>
          ) : (
            <h1>
              Pares: {resp.par} | Impares: {resp.impar}
            </h1>
          ))}
      </Container>
    </>
  );
}
