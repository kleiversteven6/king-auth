/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { Container, Grid } from 'semantic-ui-react';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import CalculatePage from '../CalculatePage';
import GenerateQr from '../GenerateQr';
import ValidateQr from '../ValidateQr';
import MenuComponent from '../../components/Menu';
import GraphicsPage from '../GraphicsPage';
import ShortUrls from '../ShortUrls';

import UrlPage from '../UrlPage';


export default function App() {
  return (
    <>
      <GlobalStyle />
      <Container fluid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} padded="vertically">
              <MenuComponent />
            </Grid.Column>

            <Grid.Column width={13}>
              <Container fluid textAlign="center">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/calculadora" component={CalculatePage} />
                  <Route exact path="/generar" component={GenerateQr} />
                  <Route exact path="/validar" component={ValidateQr} />

                  <Route exact path="/graficas" component={GraphicsPage} />
                  <Route exact path="/graficas/:id" component={GraphicsPage} />

                  <Route exact path="/acortar" component={ShortUrls} />
                  <Route exact path="/graficas/:id" component={GraphicsPage} />
                  <Route exact path="/url/:short" component={UrlPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}
