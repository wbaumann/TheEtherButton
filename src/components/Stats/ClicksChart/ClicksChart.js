import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';

import './styles.css';

class ClicksChart extends Component {
  render() {
    const labels = [];
    const innerSeries = [];
    const series = [];

    // eslint-disable-next-line
    for (let index = this.props.numberOfClicksAtBlocksRemaining.length - 1; index >= 0; index -= 1) {
      labels.push(`${index}`);
      innerSeries.push(this.props.numberOfClicksAtBlocksRemaining[index]);
    }

    series.push(innerSeries);
    const data = { series, labels };

    const options = {
      axisY: {
        onlyInteger: true,
      },
    };

    return (
      <div>
        <p>Distribution of all clicks:</p>
        <ChartistGraph data={data} options={options} type="Bar" />
      </div>
    );
  }
}

ClicksChart.propTypes = {
  numberOfClicksAtBlocksRemaining: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ClicksChart;
