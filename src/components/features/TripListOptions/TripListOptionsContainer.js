import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllRegions} from '../../../redux/regionsRedux';
import {getAllFilters, changeSearchPhrase, changeDuration, addTag, removeTag, changeRegion} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  regions: getAllRegions(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeDuration: durationChange => dispatch(changeDuration(durationChange)),
  addTag: tag => dispatch(addTag(tag)),
  removeTag: tag => dispatch(removeTag(tag)),
  changeRegion: regionName => dispatch(changeRegion(regionName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
