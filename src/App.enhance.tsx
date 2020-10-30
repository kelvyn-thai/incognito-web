import React, { FunctionComponent, useEffect } from 'react';
import { goServices, getConfig } from 'incognito-js/build/web/module';
import ErrorBoundary from '@components/ErrorBoundary/index';
import { GlobalStyled } from '@styles/index';
import { BrowserRouter as Router } from 'react-router-dom';
import SDK from 'papp-sdk';
import { Provider } from 'react-redux';
import { configStore, IConfigStore } from '@redux/index';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor }: IConfigStore = configStore();

interface IProps {}

const enhance = (WrappedComponent: FunctionComponent) => (props: IProps) => {
  const [state, setState] = React.useState({
    loading: true,
    isCompatible: false,
  });
  const handleCheckSDKCompatible = async () => {
    try {
      const isCompatible = SDK.checkSDKCompatible();
      if (isCompatible) {
        console.debug('There are all methods supported', SDK);
        setState({ ...state, isCompatible: true });
      } else {
        throw new Error('SDK is only work on Incognito Wallet pApp');
      }
    } catch (error) {
      console.debug(`ERROR`, error?.message);
    } finally {
      setState({ ...state, loading: false });
    }
  };
  const handleLoadWebAssembly = async () => {
    try {
      const result = await goServices.implementGoMethodUseWasm();
      console.debug(`CONFIG`, getConfig(), result);
    } catch (error) {
      console.debug(`error`, error);
    }
  };

  useEffect(() => {
    handleLoadWebAssembly();
    handleCheckSDKCompatible();
  }, []);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <GlobalStyled />
            <WrappedComponent {...props} />
          </Router>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default enhance;
