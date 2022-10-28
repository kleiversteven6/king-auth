import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function GraphicLine() {
  const options = {
    title: {
      text: 'Accesos por Facebook',
    },

    xAxis: {
      categories: [
        'Enero',
        'Febrero',
        'Marzo',
        'Diciembreeeee',
        'Queso',
        'Jamon',
        'Tortillas',
      ],
    },

    yAxis: {
      text: 'Clicks realizados',
    },

    series: [
      {
        name: 'Clicks en Facebook',
        data: [1, 2, 3, 5, 9, 2, -2],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
