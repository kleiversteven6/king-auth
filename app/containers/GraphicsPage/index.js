/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { Header, Segment, Button, Tab } from 'semantic-ui-react';

import ShareComponent from '../../components/Share';
import SocialComponent from '../../components/Social';
import GraphicLine from '../../components/GraphicLine';
import Mapamundi from '../../components/mapamundi';
import { getWebsite, getGroupCountry } from '../../firebase/api';
import { getNavigator } from '../../services/services';

export default function GraphicsPage({ match }) {
  const [data, setData] = useState({});
  const [database, setDatabase] = useState({});
  const [detebase, setDetebase] = useState({});
  const [ditibase, setDitibase] = useState({});

  const getLink = async () => {
    const querySnapshot = await getWebsite(match.params.id);

    const dete = querySnapshot.data();
    setData(dete);
  };

  const test = async () => {
    console.log(match.params.id);
    const querySnapshot = await getGroupCountry(match.params.id);

    setDatabase(querySnapshot.mapamundi);
    setDetebase(querySnapshot.line);
    setDitibase(querySnapshot.drill);
  };

  const url = 'https://google.com';

  const short = 'google.com';
  const stats = 'gooooooooooogle.com';

  const panes = [
    {

      menuItem: { content: 'Estadísticas', icon: 'chart area' },
      render: () => (
        <Tab.Pane key={1}>
          <GraphicLine data={detebase} drill={ditibase} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { content: 'Ubicación', icon: 'map marker alternate' },
      render: () => (
        <Tab.Pane key={2}>
          <Mapamundi data={database} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { content: 'Estadística Mensual', icon: 'chart line' },
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: { content: 'Compartir', icon: 'share alternate' },
      render: () => (
        <Tab.Pane key={3}>
          <ShareComponent short={short} stats={stats} url={url} />
          <SocialComponent short={short} url={url} />
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    getLink();
    test();
  }, []);

  return (
    <div>
      <Segment>
        <Header>{url}</Header>
        <Button
          key={url}
          color="blue"
          content="Url Original"
          label={{
            basic: true,
            color: 'grey',
            pointing: 'left',
            content: `${url}`,
          }}
        />
        <Button
          key={short}
          color="blue"
          content="Short"
          label={{
            as: 'a',
            basic: true,
            color: 'grey',
            pointing: 'left',
            content: `${short}`,
          }}
        />
      </Segment>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true, color: 'blue' }}
        panes={panes}
      />
    </div>
  );
}
