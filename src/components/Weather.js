import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Icon from '@material-ui/core/Icon';
import Chart from './Chart';
import Loading from './Loading';
import WeatherCard from './card';
import { fetchWeather } from '../actions/weatherActions';

const weatherStyle = {
  arrowLeft: {
    position: 'absolute',
    left: '5%',
    cursor: 'pointer',
    marginTop: '5%',
  },
  arrowRight: {
    position: 'absolute',
    right: '5%',
    cursor: 'pointer',
    marginTop: '5%',
  },
  weatherCards: {
    marginTop: '10%',
    marginLeft: '80px',
  },
};

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // holding the current index for the card that has to be rendered at each time on the screen
      pageIndex: 0,
      value: 'fahrenheit',
    };
  }

  componentDidMount() {
    this.props.fetchWeather();

    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
     
      document.querySelector('#insertion-point-jss')
    );
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  prevSlide = () => {
    const { pageIndex } = this.state;
    this.setState({
      pageIndex: pageIndex - 1,
    });
  };

  nextSlide = () => {
    const { pageIndex } = this.state;
    this.setState({
      pageIndex: pageIndex + 1,
    });
  };

  render() {
    let weather;
    const { weatherData } = this.props;
    const { value, pageIndex } = this.state;
    const chartTemperature = weatherData.map(item => item.main.temp);
    const chartCelcius = weatherData.map(item => Math.round(((item.main.temp - 32) * 5) / 9));
    
    // get current page index
    const index = pageIndex;
    // create a new array with 3 cards
    let firstthree = weatherData.slice(index, index + 3);
    // check the length of the new array (if it’s less than 3 when index is near the end of the array)
    if (firstthree.length < 3) {
      // if the cards length is lower than 3 cards then append missing cards from the beginning of the original array
      firstthree = firstthree.concat(weatherData.slice(0, 3 - firstthree.length));
    }

    if (value === 'fahrenheit') {
      const degree = '\u00b0F';

      weather = (
        <div>
          <Grid container direction="row" justify="center" alignItems="center">
            {firstthree.map(item => (
              <Grid item xs={3} key={Math.random()}>
                <WeatherCard
                  key={item.dt}
                  temp={Math.round(item.main.temp)}
                  unit={degree}
                  date={item.dt}
                />
              </Grid>
            ))}
          </Grid>

          <Chart temp={chartTemperature} label="Fahrenheit" />
        </div>
      );
    } else {
      const degree = '\u00b0C';
      weather = (
        <div>
          <Grid container direction="row" justify="center" alignItems="center">
            {firstthree.map(item => (
              <Grid item xs={3} key={Math.random()}>
                <WeatherCard
                  key={item.dt}
                  temp={Math.round(((item.main.temp - 32) * 5) / 9)}
                  unit={degree}
                  date={item.dt}
                />
              </Grid>
            ))}
          </Grid>

          <Chart temp={chartCelcius} label="Celcius" />
        </div>
      );
    }

    if (weatherData.length === 0) {
      return <Loading />;
    }
    return (
      <div>
        <FormControl component="fieldset">
          <RadioGroup value={value} onChange={this.handleChange} row>
            <FormControlLabel value="celsius" control={<Radio color="primary" />} label="Celsius" />

            <FormControlLabel
              value="fahrenheit"
              control={<Radio color="primary" />}
              label="Fahrenheit"
            />
          </RadioGroup>
        </FormControl>

        {pageIndex > 0 ? (
          <Icon
            className="fa fa-arrow-alt-circle-left"
            color="primary"
            fontSize="large"
            onClick={this.prevSlide}
            style={weatherStyle.arrowLeft}
          />
        ) : (
          ''
        )}
        {pageIndex > 6 ? (
          ''
        ) : (
          <Icon
            className="fa fa-arrow-alt-circle-right"
            color="primary"
            fontSize="large"
            onClick={this.nextSlide}
            style={weatherStyle.arrowRight}
          />
        )}
        <div style={weatherStyle.weatherCards}>{weather}</div>
      </div>
    );
  }
}

Weather.propTypes = {
  fetchWeather: PropTypes.func.isRequired,
  weatherData: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  weatherData: state.weather.items,
});

export default connect(
  mapStateToProps,
  { fetchWeather }
)(Weather);
