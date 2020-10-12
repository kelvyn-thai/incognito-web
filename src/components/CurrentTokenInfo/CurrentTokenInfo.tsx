import React from 'react';
import styled from 'styled-components';
import SDK from 'papp-sdk';
import Copy from '../Copy';
import { ellipsisCenter } from '@src/utils/ellipsis';
import { useSelector } from 'react-redux';

interface IProps {}

const Styled = styled.div`
  .item {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 15px;
  }
  .label {
    flex: 1 0 30%;
    text-transform: capitalize;
  }
  .value {
    flex: 1 0 70%;
    overflow-y: hidden;
    overflow-x: scroll;
    font-weight: bold;
  }
`;

const CurrentTokenInfo = (props: IProps) => {
  const [tokenInfo, setTokenInfo]: [any, any] = React.useState(null);
  const _tokenInfo = SDK?.getStore()?.tokenInfo;
  React.useEffect(() => {
    SDK.onTokenInfoChange((token: any) => {
      if (token) {
        return setTokenInfo(token);
      }
    });
  }, [_tokenInfo]);
  if (!tokenInfo) {
    return null;
  }
  return (
    <Styled>
      {Object.entries(tokenInfo).map(([key, value]: [any, any]) => (
        <div className={'item'}>
          <p className='label'>{key}</p>
          <p className='value'>{ellipsisCenter({ str: value, limit: 10 })}</p>
        </div>
      ))}
    </Styled>
  );
};

export default CurrentTokenInfo;
