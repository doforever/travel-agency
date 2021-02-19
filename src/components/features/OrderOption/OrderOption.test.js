import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const name = 'name',
      type = 'dropdown',
      component = shallow(<OrderOption name={name} type={type}/>);
    expect(component).toBeTruthy();
    // console.log(component.debug());
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render props name as title', () => {
    const name = 'name',
      type = 'dropdown',
      component = shallow(<OrderOption name={name} type={type}/>);
    expect(component.find('.title').text()).toEqual(name);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
        it('contains divs with class icon and icons', () => {
          const options = renderedSubcomponent.find('div.icon');
          expect(options.length).toBe(mockProps.values.length + 1);
          expect(options.at(0).text()).toEqual(expect.stringContaining('none'));
          for (let i = 0; i < mockProps.values.length; i++) {
            expect(options.at(i+1).text()).toEqual(expect.stringContaining(mockProps.values[i].name));
          }
          const icons = renderedSubcomponent.find('Icon');
          expect(icons.length).toBe(mockProps.values.length + 1);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('div.icon').at(mockProps.values.length).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkboxes': {
        it('contains correct label and inputs', () => {
          const labels = renderedSubcomponent.find('label');
          expect(labels.length).toBe(mockProps.values.length);
          for (let i = 0; i < mockProps.values.length; i++) {
            expect(labels.at(i).text()).toEqual(expect.stringContaining(mockProps.values[i].name));
          }
          const inputs = renderedSubcomponent.find('input');
          expect(inputs.length).toBe(mockProps.values.length);
          for (let i = 0; i < mockProps.values.length; i++) {
            expect(inputs.at(i).prop('value')).toBe(mockProps.values[i].id);
          }
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find(`[value="${testValue}"]`).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }
      case 'number': {
        it('contains single input with current value', () => {
          const input = renderedSubcomponent.find('input[type="number"]');
          expect(input.length).toBe(1);
          expect(input.prop('value')).toBe(mockPropsForType.number.currentValue);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        it('contains single text input', () => {
          const input = renderedSubcomponent.find('input[type="text"]');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });
        break;
      }
      case 'date': {
        it('contains single DatePicker component', () => {
          const picker = renderedSubcomponent.find(DatePicker);
          expect(picker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });
        break;
      }
    }
  });
}
