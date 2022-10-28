/* eslint-disable react/prop-types */
import React from 'react';
import { Segment } from 'semantic-ui-react';
import ShareComponent from '../../components/Share';

export default function GraphicsPage({ match }) {
  const short = 'google.com';
  const stats = 'gooooooooooogle.com';
  return (
    <div>
      Graphics Page
      <Segment>
        <h3>ID: {match.params.id}</h3>
        <ShareComponent short={short} stats={stats} />
      </Segment>
    </div>
  );
}
