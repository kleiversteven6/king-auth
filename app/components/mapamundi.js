import React from 'react';

import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

export default function Mapamundi() {
  const data = [['fo', 50], ['us', 1], ['jp', 100], ['in', 20]];

  const options = {
    chart: {
      map: 'custom/world',
    },
    colorAxis: {
      min: 0,
      stops: [[0, '#000022'], [0.67, '#222299'], [1, '#4444FF']],
    },
    title: {
      text:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarmando Pizzas.',
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    series: [
      {
        data,
        mapData: Highcharts.maps['custom/world'],
        name: 'Click Realizados',
        states: {
          hover: {
            color: '#a4edba',
          },
        },
      },
    ],
  };

  return (
    <>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
      />
    </>
  );
}
