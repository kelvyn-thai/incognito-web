import React from 'react';
import styled from 'styled-components';
import SDK from 'papp-sdk';
import { TokenInfo } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { actionTriggerSDK, sdkSelector } from '@components/index';

interface IProps {}

const Styled = styled.div``;

const CurrentTokenInfo = (props: IProps) => {
  const dispatch = useDispatch();
  const { selectedPrivacy } = useSelector(sdkSelector);
  React.useEffect(() => {
    SDK.onTokenInfoChange((selected: any) => {
      if (selected) {
        dispatch(actionTriggerSDK({ key: 'selectedPrivacy', value: selected }));
      }
    });
  }, []);
  if (!selectedPrivacy) {
    return null;
  }
  return (
    <Styled>
      {Object.entries(selectedPrivacy).map(([label, value]: [any, any]) => (
        <TokenInfo {...{ label, value }} />
      ))}
    </Styled>
  );
};

export default CurrentTokenInfo;
