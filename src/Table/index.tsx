import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  .table-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #1d2129;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    th,
    td {
      border-bottom: 1px solid #f0f0f0;
      padding: 12px 16px;
      text-align: left;
      font-size: 14px;
      color: #333;
    }
    th {
      background: #f5f5f5;
      font-weight: 500;
      color: #1d2129;
    }
    tr: {
      transition: background 0.2s;
      cursor: pointer;
    }
    tr:hover {
      background: #f5f5f5;
    }
  }
`;

export interface VisTableProps {
  columns: { title: string; key: string }[];
  data: { [key: string]: any }[];
  title?: string;
}

const VisTable = (props: VisTableProps) => {
  const { columns, data, title } = props;
  return (
    <TableWrapper>
      {title && <div className="table-title">{title}</div>}
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default VisTable;
