
// /**
//  * Created by sheldonyee
//  * github petercheng1 
//  * 构造redux
//  * 
//  * combineReducer ==> applyMiddlers ==> createStore === store
//  */

// import {/*compose*/createStore, combineReducers, applyMiddleware} from 'redux';

// import loginReducer from './reducers/login'

// import panelReducer from './reducers/panel'

// import subscribeReducer from './reducers/subscribe'

// import friendReducer from './reducers/friends'

// import thunk from 'redux-thunk';

// const reducers = {
//     login : loginReducer,
//     panel:panelReducer,
//     subscribe:subscribeReducer,
//     friend:friendReducer
// }

// const _reducers = combineReducers(reducers)

// const middlewares = [thunk];

// let finalCreateStore = applyMiddleware(...middlewares)(createStore);

// const store = finalCreateStore(_reducers)

// export default store;

