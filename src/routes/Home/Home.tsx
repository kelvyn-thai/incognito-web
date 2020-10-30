import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div`
  &.home {
    border-width: 1;
    min-height: 50vh;
    width: 100%;
    border-color: #fff;
    margin-top: 50px;
  }
  .title {
    color: #fff;
  }
`;

const Home: FunctionComponent<IProps> = (props) => {
  return (
    <div className='home'>
      <h1 className='title'>Hello! I'm PAPP-SDK</h1>
    </div>
  );
};

export default Home;
