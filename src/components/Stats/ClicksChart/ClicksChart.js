import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';

import './styles.css';

class ClicksChart extends Component {
  render() {
    const data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2],
      ],
    };

    const options = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc(value, index) {
          return index % 2 === 0 ? value : null;
        },
      },
    };

    return (
      <div>
        <ChartistGraph data={data} options={options} type="Bar" />
      </div>
    );
  }
}

ClicksChart.propTypes = {
  numberOfClicksAtBlocksRemaining: PropTypes.shape.isRequired,
};

export default ClicksChart;
