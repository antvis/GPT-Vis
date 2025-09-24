import { VisTable } from '@antv/gpt-vis';
import React from 'react';

export default () => {
  const columns = [
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '英语',
      key: 'english',
    },
    {
      title: '语文',
      key: 'chinese',
    },
    {
      title: '数学',
      key: 'math',
    },
  ];

  const initialData = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 90,
      math: 85,
      english: 88,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 78,
      math: 92,
      english: 80,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 85,
      math: 89,
      english: 90,
    },
  ];
  return <VisTable columns={columns} data={initialData} title="学生考试成绩表单" />;
};
