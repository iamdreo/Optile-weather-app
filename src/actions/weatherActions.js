import axios from 'axios';
import { FETCH_WEATHER} from './types';

/*Api wasn't working for fetching daily weather
 so just left it like this
 */
export const fetchWeather = () => dispatch => {
  axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=10&units=imperial')
    .then(res => {
      dispatch({
        type: FETCH_WEATHER,
        payload: res.data.list
      })     
    })
};

