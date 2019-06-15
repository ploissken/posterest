import { combineReducers } from 'redux'
import dataset from './dataset'
import settings from './settings'
import login from './login'

export default combineReducers({
  dataset,
  settings,
  login
})
