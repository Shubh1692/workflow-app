import React from 'react';
import './App.css';
import { CookiesProvider, withCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './login';
import HomePage from './home';
import WorkFlowPage from './workflow';
import { createStore } from 'redux';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer)
persistStore(store);

function PrivateRoute({ component: PrivateComponent, cookies, ...rest }) {
  const isUser = cookies.get('user');
  return (
    <Route
      {...rest}
      render={(props) =>
        isUser ? (
          <PrivateComponent
            {...{
              ...props,
            }}
          />
        ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
      }
    />
  );
}

const PrivateRouteWithCookies = withCookies(PrivateRoute);

function PublicRoute({ component: PublicComponent, cookies, ...rest }) {
  const isUser = cookies.get('user');
  console.log(isUser)
  return (
    <Route
      {...rest}
      render={(props) =>
        !isUser ? (
          <PublicComponent
            {...{
              ...props,
            }}
          />
        ) : (
          <Redirect
              to={{
                pathname: "/home"
              }}
            />
          )
      }
    />
  );
}

const PublicRouteWithCookies = withCookies(PublicRoute);

function App() {

  return (
    <Provider store={store}>
      
      <CookiesProvider>
        <Router>
          <Switch>
            <PublicRouteWithCookies
              exact
              title="login"
              path="/login"
              name="login"
              component={LoginPage}
            />
            <PrivateRouteWithCookies
              exact
              title="home"
              path="/home"
              name="Home"
              component={HomePage}
            />
            <PrivateRouteWithCookies
              exact
              title="workflow"
              path="/workflow"
              name="workflow"
              component={WorkFlowPage}
            />
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Router>
      </CookiesProvider>
    </Provider>
  );
}

export default App;