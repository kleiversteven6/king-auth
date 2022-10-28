import React from 'react';
import { Segment } from 'semantic-ui-react';
import ShareComponent from '../../components/Share';

import Mapamundi from '../../components/mapamundi';
import GraphicLine from '../../components/GraphicLine';

export default function GraphicsPage() {
  const short = 'google.com';
  const stats = 'gooooooooooogle.com';

  return (
    <div>
      Graphics Page
      <Segment>
        <ShareComponent short={short} stats={stats} />
      </Segment>
      {/*----------------*/}
      <Segment>
        <GraphicLine />
      </Segment>
      <Segment>
        <Mapamundi />
      </Segment>
    </div>
  );
}
