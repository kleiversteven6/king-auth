import React, { useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

export default function GenerateQr() {
  const [Response, setResponse] = useState({
    secret: '',
    url: '',
    response: '',
  });
  const generate = () => {
    fetch('https://dev-gecko.ganaloterias.com/authenticator/generarqr')
      .then(result => result.json())
      .then(data => setResponse(data));
  };
  return (
    <Card>
      <Image src={Response.url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>King-auth</Card.Header>
        <Card.Description>{Response.secret}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={generate}>Generar QR</Button>
      </Card.Content>
    </Card>
  );
}
