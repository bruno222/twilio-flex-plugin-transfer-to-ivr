import { AppState as FlexAppState } from '@twilio/flex-ui';
import { combineReducers, Action as ReduxAction } from 'redux';

import { CustomTaskListState, reduce as CustomTaskListReducer } from './CustomTaskListState';

// Register your redux store under a unique namespace
export const namespace = 'twilio-flex-forward-to-ivr';

// Extend this payload to be of type that your ReduxAction is
export interface Action extends ReduxAction {
  payload?: any;
}

// Register all component states under the namespace
export interface AppState {
  flex: FlexAppState;
  'twilio-flex-forward-to-ivr': {
    customTaskList: CustomTaskListState;
    // Other states
  };
}

// Combine the reducers
export default combineReducers({
  customTaskList: CustomTaskListReducer
});
