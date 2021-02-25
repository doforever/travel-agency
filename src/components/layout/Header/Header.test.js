import React from 'react';
import {shallow} from 'enzyme';
import Header from './Header';

describe('Component Header', () => {
  it('should render DynamicPhone', () => {
    const component = shallow(<Header />);
    expect(component.exists('DynamicPhone')).toEqual(true);
  });
});
