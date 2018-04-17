import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

/*
 * This component was insipred by ReactCountdownClock.
 *
 * https://www.npmjs.com/package/react-countdown-clock
 */
class CircularCountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.scale = window.devicePixelRatio || 1;
    this.radius = null;
    this.innerRadius = null;
  }

  componentDidMount() {
    this.measureComponents();
    this.layoutComponents();
    this.drawComponents();
  }

  componentDidUpdate() {
    this.measureComponents();
    this.layoutComponents();
    this.drawComponents();
  }

  measureComponents() {
    this.radius = this.props.size / 2;
    this.innerRadius = this.radius / 1.8;
  }

  layoutComponents() {
    this.background = this.background.getContext('2d');
    this.background.scale(this.scale, this.scale);
    this.countdownText = this.countdownText.getContext('2d');
    this.countdownText.textAlign = 'center';
    this.countdownText.textBaseline = 'middle';
    this.countdownText.scale(this.scale, this.scale);
    if (this.props.onClick) {
      this.component.addEventListener('click', this.props.onClick);
    }
  }

  drawComponents() {
    // First - clear our the existing rectangle
    this.background.clearRect(0, 0, this.background.width, this.background.height);
    this.countdownText.clearRect(0, 0, this.countdownText.width, this.countdownText.height);

    // Next - draw the background
    this.background.beginPath();
    this.background.globalAlpha = this.props.alpha / 3;
    this.background.fillStyle = this.props.color;
    this.background.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, false);
    this.background.arc(this.radius, this.radius, this.innerRadius, 0, Math.PI * 2, true);
    this.background.closePath();
    this.background.fill();

    // Finally - draw the countdown text
    const percent = 1 - this.props.currentValue / this.props.maximumValue;
    this.countdownText.globalAlpha = this.props.alpha;
    this.countdownText.fillStyle = this.props.color;
    this.countdownText.font = `bold ${this.radius / 2}px Arial`;
    this.countdownText.fillText(this.props.currentValue, this.radius, this.radius);
    this.countdownText.beginPath();
    this.countdownText.arc(
      this.radius,
      this.radius,
      this.radius,
      1.5 * Math.PI,
      2 * Math.PI * percent + 1.5 * Math.PI,
      true,
    );
    this.countdownText.arc(
      this.radius,
      this.radius,
      this.innerRadius,
      2 * Math.PI * percent + 1.5 * Math.PI,
      1.5 * Math.PI,
      false,
    );
    this.countdownText.closePath();
    this.countdownText.fill();

    if (percent === 0) {
      // Ensure we always fill the complete path if we have started counting down
      this.countdownText.beginPath();
      this.countdownText.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, false);
      this.countdownText.arc(this.radius, this.radius, this.innerRadius, 0, Math.PI * 2, true);
      this.countdownText.closePath();
      this.countdownText.fill();
    }
  }

  render() {
    const canvasStyle = { position: 'absolute', width: this.props.size, height: this.props.size };
    const canvasProps = {
      style: canvasStyle,
      height: this.props.size * this.scale,
      width: this.props.size * this.scale,
    };
    return (
      <div className={this.props.areButtonClicksAllowed ? 'circular-countdown-timer' : 'circular-countdown-timer-disabled'} >
        <div
          ref={(ref) => { this.component = ref; }}
          style={{ width: this.props.size, height: this.props.size }}
        >
          <canvas ref={(ref) => { this.background = ref; }} {...canvasProps} />
          <canvas ref={(ref) => { this.countdownText = ref; }} {...canvasProps} />
        </div>
      </div>
    );
  }
}

CircularCountdownTimer.propTypes = {
  maximumValue: PropTypes.number,
  currentValue: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  alpha: PropTypes.number,
  areButtonClicksAllowed: PropTypes.bool,
  onClick: PropTypes.func,
};

CircularCountdownTimer.defaultProps = {
  maximumValue: 20,
  currentValue: 20,
  size: 200,
  color: '#0000ff',
  areButtonClicksAllowed: true,
  alpha: 1,
  onClick: null,
};

export default CircularCountdownTimer;
