import { Table } from 'lucide-react';

export const tableData = {
  id: 'table',
  name: 'Table',
  icon: Table,
  galleryExamples:
    'vis table\ndata\n  - Product Smartphone\n    Region "East China"\n    "Sales Amount" 4580\n    "YoY Growth" 23.5%\n    Ranking 1\n  - Product Laptop\n    Region "South China"\n    "Sales Amount" 3200\n    "YoY Growth" 15.8%\n    Ranking 2\n  - Product Tablet\n    Region "North China"\n    "Sales Amount" 2100\n    "YoY Growth" 8.2%\n    Ranking 3\n  - Product "Smart Watch"\n    Region "Southwest"\n    "Sales Amount" 1850\n    "YoY Growth" 42.1%\n    Ranking 4\n  - Product "Wireless Earbuds"\n    Region "Central China"\n    "Sales Amount" 1520\n    "YoY Growth" 31.6%\n    Ranking 5\ntitle "2024 Q1 Sales Report"',
  description:
    'A table is a structured way to organize data using rows and columns. Each row represents a data entity, and each column represents an attribute or field. Tables can clearly display large amounts of data, making it easy for users to search, compare, and analyze. Tables are commonly used to present structured data such as financial reports, grade sheets, product lists, etc. The core advantage of tables is alignment and comparison. Users can quickly locate data in a specific row or column and make horizontal or vertical comparisons. Tables also support sorting, filtering, and other operations to enhance data usability and interactivity.',
  knowledge: {
    introduction:
      'A table is a structured way to organize data using rows and columns. Each row represents a data entity, and each column represents an attribute or field. Tables can clearly display large amounts of data, making it easy for users to search, compare, and analyze. Tables are commonly used to present structured data such as financial reports, grade sheets, product lists, etc. The core advantage of tables is alignment and comparison. Users can quickly locate data in a specific row or column and make horizontal or vertical comparisons. Tables also support sorting, filtering, and other operations to enhance data usability and interactivity.',
    useCases: [
      'Display structured data such as details, lists, and reports.',
      'When data needs to be searched, sorted, filtered, or compared.',
      'When there is a large amount of data with multiple attributes per record.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: 'Chart type, required, string type, value must be "table".',
          },
          {
            property: 'data',
            type: 'required',
            description:
              "Table data, required, array of objects. Each object's fields must correspond to the table headers.",
          },
          {
            property: 'title',
            type: 'optional',
            description: 'Chart title, optional, string type.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '2024 Q1 Product Sales Report',
      description: 'Display the 2024 Q1 product sales report.',
      code: 'vis table\ndata\n  - Product Smartphone\n    Region "East China"\n    "Sales Amount" 4580\n    "YoY Growth" 23.5%\n    Ranking 1\n  - Product Laptop\n    Region "South China"\n    "Sales Amount" 3200\n    "YoY Growth" 15.8%\n    Ranking 2\n  - Product Tablet\n    Region "North China"\n    "Sales Amount" 2100\n    "YoY Growth" 8.2%\n    Ranking 3\n  - Product "Smart Watch"\n    Region "Southwest"\n    "Sales Amount" 1850\n    "YoY Growth" 42.1%\n    Ranking 4\n  - Product "Wireless Earbuds"\n    Region "Central China"\n    "Sales Amount" 1520\n    "YoY Growth" 31.6%\n    Ranking 5\ntitle "2024 Q1 Sales Report"',
    },
    {
      title: 'Employee Performance Evaluation',
      description: 'Display employee performance evaluation table',
      code: 'vis table\ndata\n  - Name Zhang Wei\n    Department "Engineering"\n    "KPI Score" 92\n    "Attendance Rate" 98%\n    Rating A\n  - Name Li Na\n    Department Marketing\n    "KPI Score" 88\n    "Attendance Rate" 96%\n    Rating A\n  - Name Wang Qiang\n    Department Product\n    "KPI Score" 85\n    "Attendance Rate" 94%\n    Rating B+\n  - Name Zhao Min\n    Department Operations\n    "KPI Score" 90\n    "Attendance Rate" 97%\n    Rating A\n  - Name Chen Chen\n    Department "Engineering"\n    "KPI Score" 78\n    "Attendance Rate" 92%\n    Rating B\ntitle "Employee Performance Table"',
    },
    {
      title: 'Server Monitoring Status',
      description: 'Display server monitoring status list.',
      code: 'vis table\ndata\n  - Server web-prod-01\n    CPU 72%\n    Memory 85%\n    Disk 60%\n    Status Normal\n  - Server web-prod-02\n    CPU 45%\n    Memory 62%\n    Disk 55%\n    Status Normal\n  - Server db-master\n    CPU 88%\n    Memory 92%\n    Disk 78%\n    Status Warning\n  - Server db-slave\n    CPU 35%\n    Memory 58%\n    Disk 45%\n    Status Normal\n  - Server cache-01\n    CPU 92%\n    Memory 95%\n    Disk 30%\n    Status Warning\ntitle "Server Monitoring Status"',
    },
  ],
};
