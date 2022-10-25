import {
  Button,
  Container,
  Form,
  Grid,
  Image,
  Message,
} from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import image from 'images/ciberseguridad.png';

export default function ValidateQr() {
  const [Response, setResponse] = useState({
    response: '',
    code: '',
  });
  const [Secret, setSecret] = useState('');
  const [Code, setCode] = useState('');
  const [content, setContent] = useState('');
  const validate = () => {
    fetch(
      `https://dev-gecko.ganaloterias.com/authenticator/validar?secret=${Secret}&code=${Code}`,
    )
      .then(result => result.json())
      .then(data => {
        setResponse(data);
        if (Response.response === 'false') {
          setContent(<Message color="red">Autenticación Errónea</Message>);
        } else {
          setContent(<Message color="green">Autenticación Exitosa</Message>);
        }
      });
  };
  useEffect(() => {}, []);
  return (
    <Container>
      <Grid>
        <Grid.Column width={4}>
          <Image src={image} size="big" />
        </Grid.Column>
        <Grid.Column width={12} verticalAlign="middle">
          <Form onSubmit={validate}>
            <Form.Field
              value={Secret}
              onChange={e => setSecret(e.target.value)}
              label="Secret"
              control="input"
            />
            <Form.Field
              value={Code}
              onChange={e => setCode(e.target.value)}
              label="Code"
              control="input"
            />
            <Button>Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
      {content}
    </Container>
  );
}
