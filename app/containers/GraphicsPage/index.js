/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { Header, Segment, Button, Tab } from 'semantic-ui-react';

import ShareComponent from '../../components/Share';
import SocialComponent from '../../components/Social';
import { getWebsite } from '../../firebase/api';

export default function GraphicsPage({ match }) {
  const [data, setData] = useState({});

  const getLink = async () => {
    const querySnapshot = await getWebsite(match.params.id);

    setData(querySnapshot.data());
  };
  console.log(data);

  const url = 'https://google.com';
  const short = 'google.com';
  const stats = 'gooooooooooogle.com';

  const panes = [
    {
      menuItem: { content: 'Estadísticas', icon: 'chart bar' },
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: { content: 'Ubicación', icon: 'map marker alternate' },
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
    {
      menuItem: { content: 'Estadística Mensual', icon: 'chart line' },
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: { content: 'Compartir', icon: 'share alternate' },
      render: () => (
        <Tab.Pane>
          <ShareComponent short={short} stats={stats} url={url} />
          <SocialComponent short={short} url={url} />
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    getLink();
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
