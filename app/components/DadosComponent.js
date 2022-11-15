/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  GridColumn,
  Message,
  Segment,
} from 'semantic-ui-react';
import DiceAnimate from './dice';
import img from '../../public/assets/maps/kdtable.jpg';

let Box = {};
const MINIMO = 10;

export default function DadosComponent() {
  const [user, setUser] = useState({ id: 0, nombre: 'Jose', saldo: 500 });
  const [errorMsg, setErrorMsg] = useState('');
  const [inputs, setInputs] = useState({
    state: true,
    bet: false,
    total: false,
    par: false,
    impar: false,
  }); // Colores de error de los Inputs

  const [money, setMoney] = useState('');
  const [nDice, setNDice] = useState('2');
  const [betType, setBetType] = useState('total');
  const [bet, setBet] = useState([5, '-1', '']); // [ 0: Total | 1: Par | 2: Impar ]

  const [resp, setResp] = useState({ total: '0', par: '', impar: '' });
  const [win, setWin] = useState('Aqui apareceran sus resultados.');
  const [diceKD, setDiceKD] = useState(true);

  // Lanzar Dados
  async function RollBack() {
    if (validate(true)) {
      updateSaldo(user.saldo - money);
      setWin('Los dados se han lanzado...');
      setResp({ total: '?', par: '?', impar: '?' });

      const dados = await Box.roll(nDice).then(r => r);

      isWinner(dados);
      setDiceKD(false);
    }
  }

  // Resultados
  function isWinner(dados) {
    switch (betType) {
      case 'total': {
        setResp({ total: dados.total });

        if (Number(dados.total) === Number(bet[0])) {
          const a = money * 3 - money + user.saldo;
          setWin(`Prediccion Perfecta! +${money * 3}$`);
          updateSaldo(a);
          break;
        }

        if (
          Number(dados.total) === Number(bet[0]) - 1 ||
          Number(dados.total) === Number(bet[0]) + 1
        ) {
          setWin(`Prediccion Aproximada. +${money * 1}$`);
          updateSaldo(user.saldo);
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

        setResp({ par, impar });

        if (Number(bet[1]) === par && Number(bet[2]) === impar) {
          const a = money * 3 - money + user.saldo;
          setWin(`Prediccion Perfecta! +${money * 3}$`);
          updateSaldo(a);
        } else setWin('Prediccion incorrecta.');

        break;
      }

      default:
        break;
    }
  }

  function updateSaldo(amount) {
    setUser({ saldo: amount });
  }

  // Validacion
  function validate(x = false) {
    const err = [];

    // Validar Monto Apostado
    if (x && money === '') {
      err.push('• El monto a apostar debe ser un numero.');
      inputs.bet = true;
    } else if (x && Number(money) < MINIMO) {
      err.push(`• El monto minimo a apostar debe ser mayor a ${MINIMO}.`);
      inputs.bet = true;
    } else if (user.saldo - money < 0) {
      err.push('• El monto a apostar no puede ser menor que su saldo.');
      inputs.bet = true;
    } else inputs.bet = false;

    // Validar Apuesta a Total
    if (betType === 'total') {
      inputs.total = false;

      switch (nDice) {
        case '2': {
          if (bet[0] < 2 || bet[0] > 12) {
            err.push(
              '• La apuesta a total con 2 dados no puede ser menor a 2 o mayor a 12.',
            );
            inputs.total = true;
          }
          break;
        }

        case '3': {
          if (bet[0] < 3 || bet[0] > 18) {
            err.push(
              '• La apuesta a total con 3 dados no puede ser menor a 3 o mayor a 18.',
            );
            inputs.total = true;
          }
          break;
        }

        case '4': {
          if (bet[0] < 4 || bet[0] > 24) {
            err.push(
              '• La apuesta a total con 4 dados no puede ser menor a 4 o mayor a 24.',
            );
            inputs.total = true;
          }
          break;
        }

        case '5': {
          if (bet[0] < 5 || bet[0] > 30) {
            err.push(
              '• La apuesta a total con 5 dados no puede ser menor a 5 o mayor a 30.',
            );
            inputs.total = true;
          }
          break;
        }

        default:
          break;
      }
    }

    // Validar Apuesta Par / Impar
    if (betType === 'par/impar') {
      if (x && bet[1] === '?') {
        err.push(
          '• Debe seleccionar una apuesta Par e Impar para lanzar los dados.',
        );
        inputs.par = true;
        inputs.impar = true;
      } else {
        inputs.par = false;
        inputs.impar = false;
      }
    }

    // Todo chevere.
    if (err.length === 0) {
      setInputs({
        state: true,
        bet: false,
        total: false,
        par: false,
        impar: false,
      });

      setErrorMsg('');
      return true;
    }

    // Error AAAAAAAAAAAA
    inputs.state = false;
    setErrorMsg(
      <Message
        color="red"
        content={
          <>
            <h3>No se han podido lanzar los dados.</h3>
            <h4>Por favor corrija los siguientes inconvenientes</h4>
            <Divider />
            {err.map(e => (
              <p key={e}>{e}</p>
            ))}
          </>
        }
      />,
    );

    return false;
  }

  useEffect(() => {
    validate();
  }, [money, nDice, bet[0], betType]);

  // Inicializar
  useEffect(() => {
    Box = new DiceAnimate('#dicebox');
    Box.init();
  }, []);

  // Variables que honestamente me gustaria que no estuvieran aqui. Muchas gracias eslint.
  function setParImpar(e) {
    if (e === '-1') setBet([5, '?', ' ']);
    else setBet([5, e, nDice - e]);
  }

  useEffect(() => {
    setBet([bet[0], '?', ' ']);
  }, [nDice]);

  const parErrorStyle = {
    background: '#fff6f6',
    borderColor: '#e0b4b4',
    color: '#9f3a38',
  };

  return (
    <>
      <Container fluid>
        <h1>
          Dados en <i>4K</i>
        </h1>
        <Divider />
        <h3>{win}</h3>
        {errorMsg}
        <Grid celled>
          <Grid.Row>
            {/* <== */}
            <GridColumn width={2}>
              <Form>
                <Button.Group vertical>
                  <Button content="Saldo" size="mini" />
                  <Button
                    basic
                    color="grey"
                    icon="dollar"
                    content={user.saldo}
                    size="mini"
                  />
                </Button.Group>

                <Divider />
                <Button
                  icon="money"
                  content="Dinero a Apostar"
                  labelPosition="left"
                  size="mini"
                />
                <Segment secondary>
                  <Form.Input
                    error={inputs.bet}
                    type="text"
                    value={money}
                    onChange={(e, { value }) => value >= 0 && setMoney(value)}
                  />
                </Segment>

                <Divider />
                <Button
                  icon="th list"
                  content="Cantidad de Dados"
                  labelPosition="left"
                  size="mini"
                />
                <Segment secondary>
                  <Form.Radio
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

                <Divider />
                <Form.Button
                  basic
                  color={inputs.state ? 'green' : 'red'}
                  content="Jugar"
                  size="big"
                  onClick={() => RollBack()}
                />
              </Form>
            </GridColumn>

            {/* |==| */}
            <GridColumn width={12}>
              <div
                id="dicebox"
                style={{
                  width: '815px',
                  height: '550px',
                  border: 'solid 1px',
                  backgroundImage: `url(${img})`,
                }}
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

                <Divider />
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
                        error={inputs.total}
                        type="number"
                        value={bet[0]}
                        onChange={e => setBet([e.target.value, '-1', ''])}
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
                      <b>Par</b>
                      <select
                        defaultValue={-1}
                        onChange={e => setParImpar(e.target.value)}
                        style={inputs.par ? parErrorStyle : {}}
                      >
                        <option value={-1}>?</option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        {nDice >= 3 && <option value={3}>3</option>}
                        {nDice >= 4 && <option value={4}>4</option>}
                        {nDice >= 5 && <option value={5}>5</option>}
                      </select>

                      <br />
                      <b>Impar</b>
                      <Form.Input
                        error={inputs.impar}
                        value={bet[2]}
                        readOnly
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
