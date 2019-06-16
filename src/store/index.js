import { combineReducers } from 'redux'
import dataset from './dataset'
import settings from './settings'
import favorites from './favorites'
import login from './login'

export default combineReducers({
  dataset,
  settings,
  favorites,
  login
})
