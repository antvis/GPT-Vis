export const tableData = {
  id: 'table',
  name: 'Table',
  galleryDsl:
    'vis table\ndata\n  - Product Smartphone\n    Region "East China"\n    Sales Amount 4580\n    YoY Growth 23.5%\n    Rank 1\n  - Product Laptop\n    Region "South China"\n    Sales Amount 3200\n    YoY Growth 15.8%\n    Rank 2\n  - Product Tablet\n    Region "North China"\n    Sales Amount 2100\n    YoY Growth 8.2%\n    Rank 3\n  - Product "Smart Watch"\n    Region "Southwest"\n    Sales Amount 1850\n    YoY Growth 42.1%\n    Rank 4\n  - Product "Wireless Earbuds"\n    Region "Central China"\n    Sales Amount 1520\n    YoY Growth 31.6%\n    Rank 5\ntitle "2024 Q1 Sales Report"',
  galleryJson: {
    type: 'table',
    data: [
      {
        Product: 'Smartphone',
        Region: 'East China',
        Sales: 'Amount 4580',
        YoY: 'Growth 23.5%',
        Rank: 1,
      },
      {
        Product: 'Laptop',
        Region: 'South China',
        Sales: 'Amount 3200',
        YoY: 'Growth 15.8%',
        Rank: 2,
      },
      {
        Product: 'Tablet',
        Region: 'North China',
        Sales: 'Amount 2100',
        YoY: 'Growth 8.2%',
        Rank: 3,
      },
      {
        Product: 'Smart Watch',
        Region: 'Southwest',
        Sales: 'Amount 1850',
        YoY: 'Growth 42.1%',
        Rank: 4,
      },
      {
        Product: 'Wireless Earbuds',
        Region: 'Central China',
        Sales: 'Amount 1520',
        YoY: 'Growth 31.6%',
        Rank: 5,
      },
    ],
    title: '2024 Q1 Sales Report',
  },
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
            valueType: 'string',
            description: 'Value must be "table".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: "Table data. Each object's fields correspond to the table headers.",
          },
          {
            property: 'title',
            type: 'optional',
            valueType: 'string',
            description: 'Chart title.',
          },
          {
            property: 'theme',
            type: 'optional',
            valueType: "'default' | 'dark'",
            description: 'Table theme, default is "default".',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '2024 Q1 Product Sales Report',
      description: 'Display the 2024 Q1 product sales report.',
      json: {
        type: 'table',
        data: [
          {
            Product: 'Smartphone',
            Region: 'East China',
            Sales: 'Amount 4580',
            YoY: 'Growth 23.5%',
            Rank: 1,
          },
          {
            Product: 'Laptop',
            Region: 'South China',
            Sales: 'Amount 3200',
            YoY: 'Growth 15.8%',
            Rank: 2,
          },
          {
            Product: 'Tablet',
            Region: 'North China',
            Sales: 'Amount 2100',
            YoY: 'Growth 8.2%',
            Rank: 3,
          },
          {
            Product: 'Smart Watch',
            Region: 'Southwest',
            Sales: 'Amount 1850',
            YoY: 'Growth 42.1%',
            Rank: 4,
          },
          {
            Product: 'Wireless Earbuds',
            Region: 'Central China',
            Sales: 'Amount 1520',
            YoY: 'Growth 31.6%',
            Rank: 5,
          },
        ],
        title: '2024 Q1 Sales Report',
      },
      dsl: 'vis table\ndata\n  - Product Smartphone\n    Region "East China"\n    Sales Amount 4580\n    YoY Growth 23.5%\n    Rank 1\n  - Product Laptop\n    Region "South China"\n    Sales Amount 3200\n    YoY Growth 15.8%\n    Rank 2\n  - Product Tablet\n    Region "North China"\n    Sales Amount 2100\n    YoY Growth 8.2%\n    Rank 3\n  - Product "Smart Watch"\n    Region "Southwest"\n    Sales Amount 1850\n    YoY Growth 42.1%\n    Rank 4\n  - Product "Wireless Earbuds"\n    Region "Central China"\n    Sales Amount 1520\n    YoY Growth 31.6%\n    Rank 5\ntitle "2024 Q1 Sales Report"',
    },
    {
      title: 'Employee Performance Evaluation',
      description: 'Display employee performance evaluation table',
      json: {
        type: 'table',
        data: [
          {
            Name: 'Zhang Wei',
            Department: 'Engineering',
            KPI: 'Score 92',
            Attendance: 'Rate 98%',
            Rating: 'A',
          },
          {
            Name: 'Li Na',
            Department: 'Marketing',
            KPI: 'Score 88',
            Attendance: 'Rate 96%',
            Rating: 'A',
          },
          {
            Name: 'Wang Qiang',
            Department: 'Product',
            KPI: 'Score 85',
            Attendance: 'Rate 94%',
            Rating: 'B+',
          },
          {
            Name: 'Zhao Min',
            Department: 'Operations',
            KPI: 'Score 90',
            Attendance: 'Rate 97%',
            Rating: 'A',
          },
          {
            Name: 'Chen Chen',
            Department: 'Engineering',
            KPI: 'Score 78',
            Attendance: 'Rate 92%',
            Rating: 'B',
          },
        ],
        title: 'Employee Performance Table',
      },
      dsl: 'vis table\ndata\n  - Name Zhang Wei\n    Department "Engineering"\n    KPI Score 92\n    Attendance Rate 98%\n    Rating A\n  - Name Li Na\n    Department Marketing\n    KPI Score 88\n    Attendance Rate 96%\n    Rating A\n  - Name Wang Qiang\n    Department Product\n    KPI Score 85\n    Attendance Rate 94%\n    Rating B+\n  - Name Zhao Min\n    Department Operations\n    KPI Score 90\n    Attendance Rate 97%\n    Rating A\n  - Name Chen Chen\n    Department "Engineering"\n    KPI Score 78\n    Attendance Rate 92%\n    Rating B\ntitle "Employee Performance Table"',
    },
    {
      title: 'Server Monitoring Status',
      description: 'Display server monitoring status list.',
      json: {
        type: 'table',
        data: [
          { Server: 'web-prod-01', CPU: '72%', Memory: '85%', Disk: '60%', Status: 'Normal' },
          { Server: 'web-prod-02', CPU: '45%', Memory: '62%', Disk: '55%', Status: 'Normal' },
          { Server: 'db-master', CPU: '88%', Memory: '92%', Disk: '78%', Status: 'Warning' },
          { Server: 'db-slave', CPU: '35%', Memory: '58%', Disk: '45%', Status: 'Normal' },
          { Server: 'cache-01', CPU: '92%', Memory: '95%', Disk: '30%', Status: 'Warning' },
        ],
        title: 'Server Monitoring Status',
      },
      dsl: 'vis table\ndata\n  - Server web-prod-01\n    CPU 72%\n    Memory 85%\n    Disk 60%\n    Status Normal\n  - Server web-prod-02\n    CPU 45%\n    Memory 62%\n    Disk 55%\n    Status Normal\n  - Server db-master\n    CPU 88%\n    Memory 92%\n    Disk 78%\n    Status Warning\n  - Server db-slave\n    CPU 35%\n    Memory 58%\n    Disk 45%\n    Status Normal\n  - Server cache-01\n    CPU 92%\n    Memory 95%\n    Disk 30%\n    Status Warning\ntitle "Server Monitoring Status"',
    },
  ],
};
