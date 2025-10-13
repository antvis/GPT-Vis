import { Table } from '@antv/gpt-vis';
import React from 'react';

export default () => {
  const initialData = [
    {
      姓名: 'John Brown',
      语文: 90,
      数学: 85,
      英语: 88,
    },
    {
      姓名: 'Jim Green',
      语文: 78,
      数学: 92,
      英语: 80,
    },
    {
      姓名: 'Joe Black',
      语文: 85,
      数学: 89,
      英语: 90,
    },
  ];
  return <Table data={initialData} title="学生考试成绩表单" />;
};
