import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate link to correct address', () => {
    const id = 'id',
      tags = ['cat', 'dog', 'sheep'],
      image = 'image.jpg',
      name = 'name',
      cost = '100',
      days = 5;

    const component = shallow(<TripSummary id={id} tags={tags} image={image} name={name} cost={cost} days={days}/>);
    const expectedLink = `/trip/${id}`;
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should render <img> with correct src and alt attributes', () => {
    const id = 'id',
      tags = ['cat', 'dog', 'sheep'],
      image = 'image.jpg',
      name = 'name',
      cost = '100',
      days = 5;

    const component = shallow(<TripSummary id={id} tags={tags} image={image} name={name} cost={cost} days={days}/>);
    const renderedImg = component.find('img');
    expect(renderedImg.prop('src')).toEqual(image);
    expect(renderedImg.prop('alt')).toEqual(name);

  });

  it('should render props name, cost, days correctly', () => {
    const id = 'id',
      tags = ['cat', 'dog', 'sheep'],
      image = 'image.jpg',
      name = 'name',
      cost = '100',
      days = 5;

    const component = shallow(<TripSummary id={id} tags={tags} image={image} name={name} cost={cost} days={days}/>);
    expect(component.find('.title').text()).toEqual(name);
    const details = component.find('.details');
    expect(details.childAt(0).text()).toEqual(`${days} days`);
    expect(details.childAt(1).text()).toEqual(`from ${cost}`);
  });

  it('should throw error without id, image, name, cost or days', () => {
    const tags = ['cat', 'dog', 'sheep'];
    expect(() => shallow(<TripSummary tags={tags}/>)).toThrow();
  });

  it('should render tags in correct order', () => {
    const id = 'id',
      tags = ['cat', 'dog', 'sheep'],
      image = 'image.jpg',
      name = 'name',
      cost = '100',
      days = 5;

    const component = shallow(<TripSummary id={id} tags={tags} image={image} name={name} cost={cost} days={days}/>);
    for (let i = 0; i < tags.length; i++) {
      expect(component.find('.tag').at(i).text()).toEqual(tags[i]);
    }
  });

  it('should not render div.tags when tags prop is falsy', () => {
    const id = 'id',
      tags = [],
      image = 'image.jpg',
      name = 'name',
      cost = '100',
      days = 5;

    const component = shallow(<TripSummary id={id} tags={tags} image={image} name={name} cost={cost} days={days}/>);
    expect(component.exists('.tags')).toEqual(false);
  });
});
