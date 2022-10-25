import React, { useState } from 'react';
import {
  Button,
  Divider,
  Form,
  Grid,
  GridColumn,
  Input,
  Segment,
  Table,
} from 'semantic-ui-react';

export default function CalculatePage() {
  const [bet, setBet] = useState('');
  const [dummy, setDummy] = useState('');
  const [format, setFormat] = useState('d');

  const q = [
    {
      id: 1,
      logro: '',
      americano: 0,
      fraccionario: 0,
      decimal: 0,
    },
  ];

  const [quotes, setQuotes] = useState(q);

  const toFrac = n => {
    let x = 1;
    let y = 1;
    let div;

    let x2 = 0;
    let y2 = 0;
    let div2;

    const res = Math.round((n - 1) * 100) / 100;
    let k = 0;
    let ok;

    while (0 < 1) {
      if (n - 1 <= 1 && n - 1 >= 0) {
        if (div !== res) {
          if (y <= 35) y += 1;
          else {
            x += 1;
            y = 1;
          }

          div = x / y;
        }

        if (div2 !== res) {
          if (y2 <= 35) {
            if (y2 === 25) y2 = 33;
            else y2 += 1;
          } else {
            x2 += 1;
            y2 = 1;
          }

          div2 = x2 / y2;

          const txtDiv = div2.toString();

          if (txtDiv.length > 4) {
            const aux = txtDiv.substring(0, 4);
            div2 = Number(aux);
          }
        }

        if (k < 100000) k += 1;
        else break;
      } else {
        if (div !== res) {
          if (x > y) y += 1;
          else {
            x += 1;
            y = 1;
          }

          div = x / y;
        }

        if (div2 !== res) {
          if (x2 > y2) y2 += 1;
          else {
            x2 += 1;
            y2 = 1;
          }

          div2 = x2 / y2;

          const txtDiv = div2.toString();

          if (txtDiv.length > 4) {
            const aux = txtDiv.substring(0, 4);
            div2 = Number(aux);
          }
        }

        if (k < 100000) k += 1;
        else break;
      }
    }

    if (div < div2) ok = `${x}/${y}`;
    else ok = `${x2}/${y2}`;

    return ok;
  };

  const toGring = n => {
    let ok = 0;

    if (n < 2) ok = -100 / (n - 1);
    else ok = (n - 1) * 100;

    return Math.round(ok);
  };

  const addQuote = () => {
    setQuotes([
      ...quotes,
      {
        id: quotes.length + 1,
        logro: '',
        americano: 0,
        fraccionario: 0,
        decimal: 0,
      },
    ]);
  };

  const deleteQuote = id => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  const editQuote = (id, e) => {
    setDummy(e);
    const foundQuote = quotes.find(quote => quote.id === id);
    foundQuote.logro = e;

    if (foundQuote) {
      switch (format) {
        case 'd': {
          if (dummy > 1) {
            foundQuote.decimal = e;
            foundQuote.americano = toGring(e);
            foundQuote.fraccionario = toFrac(e);
          }

          break;
        }

        case 'a': {
          let ok;

          if (e < 0) ok = 1 - 100 / e;
          else ok = 1 + e / 100;

          foundQuote.decimal = ok;
          foundQuote.americano = e;
          foundQuote.fraccionario = toFrac(ok);

          break;
        }

        case 'f': {
          let x = '';
          let y = '';
          let flag = false;

          for (let k = 0; k < e.length; k += 1) {
            if (e.charAt(k) === '/') flag = true;
            else if (!flag) x += e.charAt(k);
            else y += e.charAt(k);
          }

          let well = Number(x) / Number(y) + 1;
          const thisThing = well.toString();

          if (thisThing.length > 4) {
            const sucks = thisThing.substring(0, 4);
            well = Number(sucks);
          }

          const z = Number(well);

          foundQuote.decimal = z;
          foundQuote.americano = toGring(z);
          foundQuote.fraccionario = e;

          break;
        }

        default:
          break;
      }
    }

    if (foundQuote.logro === '') {
      foundQuote.decimal = 0;
      foundQuote.americano = 0;
      foundQuote.fraccionario = 0;
    }
  };

  return (
    <>
      <h1>Calculadora en HD</h1>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form style={{ textAlign: 'center' }}>
              Formato
              <select
                id={0}
                defaultValue="d"
                onChange={e => setFormat(e.target.value)}
              >
                <option value="d">Decimal</option>
                <option value="a">Americano</option>
                <option value="f">Fraccion</option>
              </select>
              Apuesta
              <Form.Input
                type="number"
                value={bet}
                onChange={e => setBet(e.target.value)}
              />
            </Form>
          </Grid.Column>

          <GridColumn />
        </Grid>
        <Divider vertical />
      </Segment>

      <Grid>
        <Grid.Row>
          <GridColumn>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Cell>ID</Table.Cell>
                  <Table.Cell>Cuota</Table.Cell>
                  <Table.Cell>Decimal</Table.Cell>
                  <Table.Cell>Americano</Table.Cell>
                  <Table.Cell>Fraccionado</Table.Cell>
                  <Table.Cell
                    content={<Button icon="plus" primary onClick={addQuote} />}
                  />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {quotes.map(row => (
                  <Table.Row key={row.id}>
                    <Table.Cell>{row.id}</Table.Cell>
                    <Table.Cell>
                      <Input
                        value={row.logro}
                        onChange={e => editQuote(row.id, e.target.value)}
                      />
                    </Table.Cell>
                    <Table.Cell>{row.decimal}</Table.Cell>
                    <Table.Cell>{row.americano}</Table.Cell>
                    <Table.Cell>{row.fraccionario}</Table.Cell>
                    <Table.Cell>
                      <Button
                        icon="trash"
                        negative
                        onClick={() => deleteQuote(row.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </>
  );
}
