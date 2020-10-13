import React from 'react';
import styled from 'styled-components';
import SDK from 'papp-sdk';
import Copy from '@components/Copy';
import { useDispatch, useSelector } from 'react-redux';
import { actionTriggerSDK, sdkSelector } from '@components/index';

interface IProps {}

const Styled = styled.div``;

const PaymentAddress = (props: IProps) => {
  const dispatch = useDispatch();
  const { paymentAddress } = useSelector(sdkSelector);
  React.useEffect(() => {
    SDK.onPaymentAddressChange((paymentAddress: string) => {
      dispatch(
        actionTriggerSDK({
          key: 'paymentAddress',
          value: paymentAddress,
        })
      );
    });
  }, []);
  if (!paymentAddress) return null;
  return (
    <Styled>
      <Copy text={paymentAddress} />
    </Styled>
  );
};

export default PaymentAddress;
