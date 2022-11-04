/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { Container, Grid, Menu, Segment, Sidebar } from 'semantic-ui-react';
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
import TopMenu from '../../components/TopMenu';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const URLactual = window.location;
  const url = URLactual.pathname.split('/');

  return (
    <>
      <GlobalStyle />
      <Grid>
        {url[1] !== 'url' && (
          <Grid.Row>
            <Grid.Column>
              <TopMenu setVisible={setVisible} visible={visible} />
            </Grid.Column>
          </Grid.Row>
        )}

        <Grid.Row style={{ top: '46px' }}>
          <Grid.Column>
            <Sidebar.Pushable
              as={Segment}
              style={{
                minHeight: '100vh',
                flexFlow: 'column nowrap',
              }}
            >
              {url[1] !== 'url' && (
                <Grid.Row>
                  <Grid.Column>
                    <Sidebar
                      as={Menu}
                      animation="overlay"
                      icon="labeled"
                      inverted
                      onHide={() => setVisible(false)}
                      vertical
                      visible={visible}
                      width="thin"
                    >
                      <MenuComponent />
                    </Sidebar>
                  </Grid.Column>
                </Grid.Row>
              )}
              <Grid.Row>
                <Grid.Column>
                  <Container fluid>
                    <Container textAlign="center" style={{ margin: '40px' }}>
                      <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route
                          exact
                          path="/calculadora"
                          component={CalculatePage}
                        />
                        <Route exact path="/generar" component={GenerateQr} />
                        <Route exact path="/validar" component={ValidateQr} />

                        <Route
                          exact
                          path="/graficas"
                          component={GraphicsPage}
                        />
                        <Route
                          exact
                          path="/graficas/:id"
                          component={GraphicsPage}
                        />

                        <Route exact path="/acortar" component={ShortUrls} />
                        <Route
                          exact
                          path="/graficas/:id"
                          component={GraphicsPage}
                        />
                        <Route exact path="/url/:short" component={UrlPage} />
                        <Route component={NotFoundPage} />
                      </Switch>
                    </Container>
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
