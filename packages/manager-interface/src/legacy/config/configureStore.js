import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Router from 'next/router';
import queryString from 'query-string';
import { routeMap } from '../actions/routes';
import reducerMap from '../reducers';
import rootSaga from '../sagas';

const routerMiddleware = () => {
  return next => action => {
    if (!routeMap[action.type]) {
      return next(action);
    }

    const search = action.payload && action.payload.query && `?${queryString.stringify(action.payload.query)}` || '';
    const path =`${routeMap[action.type]}${search}`;
    Router.push(path);

    const complete = (error, url = error) => {
      Router.router.events.off('routeChangeComplete', complete);
      Router.router.events.off('routeChangeError', complete);

      if (url === path) {
        return next(action);
      }
    };

    Router.router.events.on('routeChangeComplete', complete);
    Router.router.events.on('routeChangeError', complete);
  };
};

export const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware({
    onError: global.Raven ? global.Raven.captureException : undefined,
  });

  // The router middleware has to run before the saga middleware.
  const middlewares = applyMiddleware(routerMiddleware, sagaMiddleware);

  // TODO: For security reasons (intercepting passwords and stuff), disable
  // redux devtools on production!
  /* eslint-disable no-underscore-dangle */
  const devTools =
    global.__REDUX_DEVTOOLS_EXTENSION__ &&
    (process.env.NODE_ENV === 'development' || ELECTRON)
      ? global.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;
  /* eslint-enable */

  const enhanced = compose(
    middlewares,
    devTools,
  );

  const store = createStore(
    combineReducers({ ...reducerMap }),
    preloadedState,
    enhanced,
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
