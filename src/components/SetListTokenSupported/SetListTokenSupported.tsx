import React from 'react';
import styled from 'styled-components';
import SDK from 'papp-sdk';
import { Checkbox } from '@components/index';
import { actionTriggerSDK, sdkSelector } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {}

const Styled = styled.div``;

const SetListTokenSupported = (props: IProps) => {
  const { supportedTokenIds, allTokens, customId } = useSelector(sdkSelector);
  const dispatch = useDispatch();
  const handleSetTokenSupported = ({
    checked,
    tokenId,
  }: {
    checked: boolean;
    tokenId: string;
  }) => {
    let tokensIds = checked
      ? [...supportedTokenIds].filter((item) => item !== tokenId)
      : [...supportedTokenIds, tokenId];
    dispatch(
      actionTriggerSDK({
        key: 'supportedTokenIds',
        value: tokensIds,
      })
    );
    SDK?.setListSupportTokenById(tokensIds);
  };
  const renderMain = () => {
    return Object.entries(allTokens).map(([label, tokenId]: [any, any]) => {
      const checked = supportedTokenIds.includes(tokenId);
      const onHandleChecked = () =>
        handleSetTokenSupported({ tokenId, checked });
      return (
        <Checkbox
          {...{
            label,
            checked,
            onHandleChecked,
          }}
        />
      );
    });
  };
  return (
    <Styled>
      <p>Select tokens that the app will support</p>
      {renderMain()}
    </Styled>
  );
};

export default SetListTokenSupported;
