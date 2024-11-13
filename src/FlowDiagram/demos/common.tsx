import { FlowDiagram } from '@antv/gpt-vis';
import React from 'react';

const data = {
  nodes: [
    { name: '访问注册页面' },
    { name: '填写并提交注册表单' },
    { name: '验证用户信息' },
    { name: '创建新用户账户' },
    { name: '提示修改错误信息' },
    { name: '发送验证邮件' },
    { name: '点击验证链接' },
    { name: '注册成功，跳转到登录页面' },
  ],
  edges: [
    { source: '访问注册页面', target: '填写并提交注册表单' },
    { source: '填写并提交注册表单', target: '验证用户信息' },
    { source: '验证用户信息', target: '创建新用户账户', name: '信息无误' },
    { source: '验证用户信息', target: '提示修改错误信息', name: '信息有误' },
    { source: '创建新用户账户', target: '发送验证邮件' },
    { source: '发送验证邮件', target: '点击验证链接' },
    { source: '点击验证链接', target: '注册成功，跳转到登录页面' },
  ],
};

export default () => <FlowDiagram data={data} containerStyle={{ height: 300 }} />;
