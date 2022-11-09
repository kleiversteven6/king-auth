import React, { useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import Animacion from '../../components/DiceGame/src';

let Box = {};

export default function HomePage() {
  const [Dados, setDados] = useState({ d1: '?', d2: '?' });

  useEffect(() => {
    Box = new Animacion('#dicebox');
    Box.init();
  }, []);

  return (
    <>
      <h1>aaaaaaaaaaaaaaaaaa</h1>
      <h3>Dado 1: {Dados.d1}</h3>
      <h3>Dado 2: {Dados.d2}</h3>
      <div style={{ textAlign: 'center' }}>
        <Container
          id="dicebox"
          style={{
            border: '1px solid black',
            height: '500px',
            width: '700px',
          }}
        />
        <Button
          type="button"
          onClick={() => setDados(Box.roll())}
          id="rollBtn"
          content="Tirar de nuevo"
        />
      </div>
    </>
  );
}
