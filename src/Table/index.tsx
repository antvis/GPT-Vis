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
      padding: 8px;
      text-align: left;
      font-size: 14px;
      color: #333;
    }
    th {
      background: #f5f5f5;
      font-weight: 600;
      color: #000000e0;
      position: relative;
    }
    th:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 25%;
      right: 0;
      width: 1px;
      height: 50%;
      background: #e0e0e0;
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

export type TableProps = {
  data: { [key: string]: any }[];
  title?: string;
};

const Table = (props: TableProps) => {
  const { data, title } = props;

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          title: key,
          key,
        }))
      : [];

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

export default Table;
