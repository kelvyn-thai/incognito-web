import React from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

interface IProps {
  label: String;
  component: React.FunctionComponentElement<any>;
}

const Styled = styled.div`
  .hook {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .hook label {
    font-weight: bold;
  }
  .hide {
    display: none;
  }
  .toggle {
  }
`;

const SDKItem = (props: IProps) => {
  const { label, component } = props;
  const [toggle, setToggle] = React.useState(false);
  return (
    <Styled>
      <button className='hook' onClick={() => setToggle(!toggle)}>
        {toggle ? <ExpandLess /> : <ExpandMoreIcon />}
        <label htmlFor=''>{label}</label>
      </button>
      <div className={toggle ? 'toggle' : 'hide'}>{component}</div>
    </Styled>
  );
};

export default SDKItem;
