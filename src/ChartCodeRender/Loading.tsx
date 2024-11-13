import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 300px;
  background-image: linear-gradient(135deg, #e3f3ff 0%, #f1eeff 100%);
  color: rgba(0, 0, 0, 88%);

  &-icon {
    margin-bottom: 6px;
  }
`;

const Loading = () => {
  return (
    <StyledLoading className="gpt-vis-loading">
      <div className="gpt-vis-loading-icon">
        <LoadingOutlined style={{ fontSize: '24px', color: 'rgb(56, 177, 246)' }} />
      </div>
      <p>数据生成中</p>
    </StyledLoading>
  );
};

export default Loading;
