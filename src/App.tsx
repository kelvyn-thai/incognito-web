import React from 'react';
import styled from 'styled-components';
import withApp from './App.enhance';
import Header from './components/Header/index';
import SDK from 'papp-sdk';
import {
  CurrentTokenInfo,
  PaymentAddress,
  ListTokenSupported,
  SetListTokenSupported,
} from '@components/index';
import SDKItem from '@components/SDKItem';

interface IProps {}

interface IState {
  isCompatible: Boolean;
}

interface ISDKComponent {
  label: String;
  component: React.FunctionComponentElement<any>;
}

interface INocomptible {}

const Styled = styled.div`
  max-width: 414px;
  margin: 0 auto;
  min-height: 100vh;
  min-width: 320px;
  padding: 2%;
  width: 100%;
  overflow: scroll;
  .no-compatible {
    margin-top: 50px;
  }
  .no-compatible-text {
    margin-bottom: 15px;
    :last-child {
      margin-bottom: 0;
    }
  }
`;

const Nocompatible: React.FunctionComponent<INocomptible> = React.memo(() => {
  return (
    <div className='no-compatible'>
      <p className='no-compatible-text'>No compatible with Web Environment.</p>
      <p className='no-compatible-text'>Please open in Incognito App</p>
    </div>
  );
});

const App: React.FunctionComponent<IProps> = (props) => {
  const [state, setState] = React.useState({
    isCompatible: false,
  });
  const { isCompatible } = state;
  const sdkComponentFactories: Array<ISDKComponent> = [
    {
      label: 'Payment Address',
      component: <PaymentAddress />,
    },
    {
      label: 'List of supported tokens',
      component: <ListTokenSupported />,
    },
    {
      label: 'Set list of supported tokens',
      component: <SetListTokenSupported />,
    },
    {
      label: 'Current Token Info',
      component: <CurrentTokenInfo />,
    },
  ];
  const handleCheckSDKCompatible = () => {
    try {
      const isCompatibleWidthSDK = SDK.checkSDKCompatible();
      setState({ ...state, isCompatible: isCompatibleWidthSDK });
      if (!isCompatibleWidthSDK) {
        throw new Error('Not compatible');
      }
    } catch (error) {
      console.debug(`ERROR`, error?.message);
    }
  };
  React.useEffect(() => {
    handleCheckSDKCompatible();
  }, []);
  return (
    <Styled className='app'>
      <div className='main'>
        <Header />
        {isCompatible ? (
          <div className='container'>
            {sdkComponentFactories.map((item, index) => (
              <SDKItem key={index} {...item} />
            ))}
          </div>
        ) : (
          <Nocompatible />
        )}
      </div>
    </Styled>
  );
};

export default withApp(App);
