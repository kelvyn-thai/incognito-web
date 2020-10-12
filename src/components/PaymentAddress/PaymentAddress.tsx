import React from 'react';
import styled from 'styled-components';
import SDK from 'papp-sdk';
import Copy from '@components/Copy';

interface IProps {}

const Styled = styled.div``;

const PaymentAddress = (props: IProps) => {
  const [paymentAddress, setPaymentAddress] = React.useState('');
  React.useEffect(() => {
    // SDK.onPaymentAddressChange((paymentAddress: string) => {
    //   setPaymentAddress(paymentAddress);
    // });
    setPaymentAddress(
      `12RtBR9Bge5EXnhhqpS226rjvVgae4pwNozK9XBQg2sFTXz5jSRHei3KPKM74LHajm3tFeo1ndRQZpY2mPJp4vRYtxxgfEWLqAE3Uux`
    );
  }, []);
  console.debug(`paymentAddress`, paymentAddress);
  if (!paymentAddress) return null;
  return (
    <Styled>
      <Copy text={paymentAddress} />
    </Styled>
  );
};

export default PaymentAddress;
