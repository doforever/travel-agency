import React from 'react';
import PropTypes from 'prop-types';
import styles from './TripListOptions.scss';

import {Row, Col} from 'react-flexbox-grid';

class TripListOptions extends React.Component {
  handleTags(tag, checked){
    if(checked) {
      this.props.addTag(tag);
    } else {
      this.props.removeTag(tag);
    }
  }

  handleDuration(type, value){
    const durationChange = {};
    durationChange[type] = parseInt(value);
    this.props.changeDuration(durationChange);
  }

  handleSearch(phrase){
    this.props.changeSearchPhrase(phrase);
  }

  render(){
    const {tags, filters, regions} = this.props;
    return (
      <div className={styles.component}>
        <Row around="lg">
          <Col lg={3}>
            <div className={styles.filter}>
              <label>
                <input className={`${styles.input} ${styles.search}`} type='text' placeholder='Search...' value={filters.phrase} onChange={event => this.handleSearch(event.currentTarget.value)} />
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className={styles.filter}>
              <label>
                Duration from:
                <input className={`${styles.input} ${styles.number}`} type='number' value={filters.duration.from} min='1' max='14' onChange={event => this.handleDuration('from', event.currentTarget.value)} />
              </label>
              <label>
                to:
                <input className={`${styles.input} ${styles.number}`} type='number' value={filters.duration.to} min='1' max='14' onChange={event => this.handleDuration('to', event.currentTarget.value)} />
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className={styles.filter}>
              <details>
                <summary className={styles.toggle}>Filter by tags</summary>
                <div className={styles.dropdown}>
                  {Object.keys(tags).map(tag => (
                    <label key={tag} className={styles.option}>
                      <input type='checkbox' checked={filters.tags.indexOf(tag) > -1} onChange={event => this.handleTags(tag, event.currentTarget.checked)} />
                      {tag}
                    </label>
                  ))}
                </div>
              </details>
            </div>
          </Col>
          <Col lg={3}>
            <div className={styles.filter}>
              <select
                className={`${styles.input} ${styles.select}`}
                value={filters.region}
                onChange={event => this.props.changeRegion(event.currentTarget.value)}
              >
                <option key='null' value=''>All regions</option>
                {Object.keys(regions).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

TripListOptions.propTypes = {
  tags: PropTypes.object,
  regions: PropTypes.object,
  filters: PropTypes.object,
  changeSearchPhrase: PropTypes.func,
  changeDuration: PropTypes.func,
  addTag: PropTypes.func,
  removeTag: PropTypes.func,
  changeRegion: PropTypes.func,
};

export default TripListOptions;
