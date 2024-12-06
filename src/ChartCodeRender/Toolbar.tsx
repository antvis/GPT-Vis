import React from 'react';
import styled from 'styled-components';

const StyledToolbar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Toolbar = () => {
  return <StyledToolbar className="gpt-vis-toolbar"></StyledToolbar>;
};

export default Toolbar;
