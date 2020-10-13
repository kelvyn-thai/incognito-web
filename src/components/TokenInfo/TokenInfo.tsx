import { ellipsisCenter } from '@src/utils/ellipsis';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  value: string;
  label: string;
}

const Styled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
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

const TokenInfo = (props: IProps) => {
  const { label, value } = props;
  return (
    <Styled className='item'>
      <p className='label'>{label}</p>
      <p className='value'>{ellipsisCenter({ str: value, limit: 10 })}</p>
    </Styled>
  );
};

export default React.memo(TokenInfo);
