import {connect} from 'react-redux';
import Trip from './Trip';
import {getTripById} from '../../../redux/tripsRedux';
import {getCountryByCode} from '../../../redux/countriesRedux';
import {changeOrder} from '../../../redux/orderRedux';

const mapStateToProps = (state, props) => {
  const trip = getTripById(state, props.match.params.id);
  const country = getCountryByCode(state, trip.country.code);

  return {
    ...trip,
    country,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setOrder: value => dispatch(changeOrder(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
