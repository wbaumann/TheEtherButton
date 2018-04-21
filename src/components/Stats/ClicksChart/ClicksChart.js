import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

import GameColors from '../../../utils/GameColors';

import './styles.css';

const Color = require('color');

class ClicksChart extends Component {
  render() {
    const backgroundColor = [];
    const borderColor = [];
    const hoverBackgroundColor = [];
    const hoverBorderColor = [];
    const labels = [];
    const data = [];

    // eslint-disable-next-line
    for (let index = this.props.numberOfClicksAtBlocksRemaining.length - 1; index >= 0; index -= 1) {
      const color = GameColors.getColor(index);
      hoverBackgroundColor.push(color);
      borderColor.push(color);
      hoverBorderColor.push(color);
      backgroundColor.push(Color(color).alpha(0.8).rgb().string());
      labels.push(`${index}`);
      data.push(this.props.numberOfClicksAtBlocksRemaining[index]);
    }

    const chartData = {
      labels,
      datasets: [
        {
          backgroundColor,
          borderColor,
          borderWidth: 1,
          hoverBackgroundColor,
          hoverBorderColor,
          data,
        },
      ],
    };

    const options = {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Block Number',
          },
        }],
      },
    };

    return (
      <div className="chart-separator">
        <p className="chart-title">Distribution of all clicks:</p>
        <div className="chart-holder">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    );
  }
}

ClicksChart.propTypes = {
  numberOfClicksAtBlocksRemaining: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ClicksChart;
