import { createStore, combineReducers } from 'redux'
import todos from '../reducer/todo'
import user from '../reducer/user'
import error from '../reducer/error'
import review from '../reducer/review'

const rootReducer = combineReducers({user: user, todos:todos, error:error, review: review})

const store = createStore(rootReducer);

// const unsubscribe = store.subscribe(() => console.log(store.getState()))

export default store;