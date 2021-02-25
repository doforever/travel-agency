import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon/Icon';
import styles from './DynamicPhone.scss';

class DynamicPhone extends React.Component {
  constructor(){
    super();
    window.setInterval(() => this.forceUpdate(), 1000);
    /* run this.forceUpdate() every second */
  }

  static propTypes = {
    info: PropTypes.string,
  };

  getNumber() {
    const phoneNumbers = {
      amanda: '678.243.8455',
      tobias: '278.443.6443',
      helena: '167.280.3970',
    };

    const hour = new Date().getUTCHours();
    if (hour < 8) return null;
    if (hour < 12) return phoneNumbers.amanda;
    if (hour < 16) return phoneNumbers.tobias;
    if (hour < 22) return phoneNumbers.helena;
    return null;
  }

  render() {
    const {info} = this.props;

    return (
      <div className={styles.component}>
        <Icon name='phone' />
        <span className={styles.phone}>{this.getNumber() || info}</span>
      </div>
    );
  }
}

export default DynamicPhone;
