// selectors
export const getOrder = ({order}) => order;
export const getOrderOptions = ({order}) => order.options;

// action name creator
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const SET_OPTION = createActionName('SET_OPTION');
export const CHANGE_ORDER = createActionName('CHANGE_ORDER');

// action creators
export const setOrderOption = payload => ({ payload, type: SET_OPTION });
export const changeOrder = payload => ({payload, type: CHANGE_ORDER});

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SET_OPTION:
      return {
        ...statePart,
        options: {
          ...statePart.options,
          ...action.payload,
        },
      };
    case CHANGE_ORDER:
      return {
        ...statePart,
        ...action.payload,
      };
    default:
      return statePart;
  }
}
