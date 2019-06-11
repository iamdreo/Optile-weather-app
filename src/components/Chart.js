import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: [
          'Day 1',
          'Day 2',
          'Day 3',
          'Day 4',
          'Day 5',
          'Day 6',
          'Day 7',
          'Day 8',
          'Day 9',
          'Day 10',
        ],
        datasets: [
          {
            label: this.props.label,
            data: this.props.temp,
            backgroundColor: [
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
              '#E5E7E9',
            ],
            hoverBackgroundColor: '#3f51b5',
            borderColor: '#aaa',
            borderWidth: 1,
          },
        ],
      },
    };
  }

  componentDidUpdate(prevProps) {
    const { temp, label } = this.props;

    if (temp !== prevProps.temp) {
      this.setState({
        chartData: {
          labels: [
            'Day 1',
            'Day 2',
            'Day 3',
            'Day 4',
            'Day 5',
            'Day 6',
            'Day 7',
            'Day 8',
            'Day 9',
            'Day 10',
          ],
          datasets: [
            {
              label,
              data: temp,
              backgroundColor: [
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
                '#E5E7E9',
              ],
              hoverBackgroundColor: '#3f51b5',
              borderColor: '#aaa',
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }

  render() {
    const { chartData } = this.state;
    return (
      <div>
        <Bar
          data={chartData}
          width={100}
          height={300}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{ ticks: {
                beginAtZero: true
            },
              display: false 
            }],
              xAxes: [{ display: false }],
            },

            legend: {
              display: true,
              position: 'bottom',
            },
          }}
        />
      </div>
    );
  }
}
Chart.propTypes = {
  temp: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string.isRequired,
};

export default Chart;
