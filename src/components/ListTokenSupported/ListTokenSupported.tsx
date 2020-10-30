import React from 'react';
import styled from 'styled-components';
import SDK from 'papp-sdk';
import { TokenInfo } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { actionTriggerSDK, sdkSelector } from '../SDK';

interface IProps {}

const Styled = styled.div``;

const ListTokenSupported = (props: IProps) => {
  const dispatch = useDispatch();
  const { tokens } = useSelector(sdkSelector);
  React.useEffect(() => {
    SDK.onSupportedTokenListChange((tokens: any) => {
      dispatch(actionTriggerSDK({ key: 'tokens', value: tokens }));
    });
  }, []);
  if (!tokens) {
    return null;
  }
  return (
    <Styled>
      {tokens.map(
        ({
          id,
          name,
          symbol,
        }: {
          id: string;
          name: string;
          symbol: string;
        }) => (
          <div className={'token'}>
            <div>
              {Object.entries({ name, symbol, id }).map(([label, value]) => (
                <TokenInfo {...{ label, value }} />
              ))}
            </div>
          </div>
        )
      )}
    </Styled>
  );
};

export default ListTokenSupported;
