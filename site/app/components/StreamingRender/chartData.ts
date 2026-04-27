export const CHART_DATA = [
  {
    id: 'pie',
    title: 'Pie Chart',
    code: 'vis pie\ndata\n  - category Hotpot\n    value 22\n  - category Buffet\n    value 12\n  - category Fast Food\n    value 8\n  - category Western\n    value 6\n  - category Others\n    value 44\ntitle Restaurant Revenue Share',
  },
  {
    id: 'treemap',
    title: 'Treemap',
    code: 'vis treemap\ndata\n  - name Engineering\n    value 100\n    children\n      - name Frontend\n        value 40\n      - name Backend\n        value 35\n      - name QA\n        value 25\n  - name Product\n    value 80\n    children\n      - name Product Design\n        value 50\n      - name User Research\n        value 30',
  },
  {
    id: 'waterfall',
    title: 'Waterfall',
    code: 'vis waterfall\ndata\n  - category Q1\n    value 120000000\n  - category Q2\n    value 569000000\n  - category Q3\n    value 231000000\n  - category "H1 Subtotal"\n    isIntermediateTotal true\n  - category Q4\n    value 185000000\n  - category Adjustments\n    value -142000000\n  - category Total\n    isTotal true\ntitle Quarterly Revenue Waterfall',
  },
  {
    id: 'scatter',
    title: 'Scatter',
    code: 'vis scatter\ndata\n  - x 161.2\n    y 51.6\n  - x 167.5\n    y 59\n  - x 159.5\n    y 49.2\n  - x 176.2\n    y 66.8\n  - x 170\n    y 59\n  - x 155.8\n    y 53.6\n  - x 172.5\n    y 55.2\n  - x 165.1\n    y 64.1\n  - x 182.9\n    y 81.8\n  - x 152.4\n    y 47.3\naxisXTitle Height (cm)\naxisYTitle Weight (kg)',
  },
  {
    id: 'line',
    title: 'Line Chart',
    code: 'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle Global Average Temperature Anomaly\naxisXTitle Year\naxisYTitle Temperature Anomaly (°C)',
  },
  {
    id: 'column',
    title: 'Column Chart',
    code: 'vis column\ndata\n  - category Jan\n    value 820\n  - category Feb\n    value 650\n  - category Mar\n    value 780\n  - category Apr\n    value 860\n  - category May\n    value 920\n  - category Jun\n    value 1350\n  - category Jul\n    value 890\n  - category Aug\n    value 850\n  - category Sep\n    value 960\n  - category Oct\n    value 1100\n  - category Nov\n    value 2180\n  - category Dec\n    value 1250\ntitle 2024 E-commerce Monthly GMV\naxisXTitle Month\naxisYTitle GMV (100M CNY)',
  },
  {
    id: 'area',
    title: 'Area Chart',
    code: 'vis area\ndata\n  - time 2018\n    value 201\n  - time 2019\n    value 221\n  - time 2020\n    value 307\n  - time 2021\n    value 460\n  - time 2022\n    value 620\n  - time 2023\n    value 830\n  - time 2024\n    value 1080\ntitle Global EV Sales Trend\naxisXTitle Year\naxisYTitle Sales (10K units)',
  },
  {
    id: 'bar',
    title: 'Bar Chart',
    code: 'vis bar\ndata\n  - category Python\n    value 28.1\n  - category JavaScript\n    value 18.5\n  - category Java\n    value 15.6\n  - category "C/C++"\n    value 12.3\n  - category TypeScript\n    value 8.2\n  - category Go\n    value 5.7\n  - category Rust\n    value 3.8\n  - category Kotlin\n    value 2.9\ntitle 2024 Programming Language Popularity\naxisXTitle Popularity Index\naxisYTitle Language',
  },
  {
    id: 'histogram',
    title: 'Histogram',
    code: 'vis histogram\ndata\n  - 68\n  - 72\n  - 85\n  - 56\n  - 91\n  - 74\n  - 63\n  - 88\n  - 79\n  - 67\n  - 82\n  - 95\n  - 58\n  - 76\n  - 84\n  - 71\n  - 93\n  - 65\n  - 78\n  - 87\n  - 52\n  - 73\n  - 81\n  - 69\n  - 90\n  - 62\n  - 75\n  - 86\n  - 59\n  - 77\n  - 83\n  - 70\n  - 94\n  - 66\n  - 80\n  - 89\n  - 55\n  - 72\n  - 85\n  - 64\n  - 92\n  - 68\n  - 76\n  - 83\n  - 57\n  - 88\n  - 74\n  - 81\n  - 67\n  - 95\n  - 61\n  - 79\n  - 86\n  - 53\n  - 91\n  - 70\n  - 78\n  - 84\n  - 63\n  - 87\n  - 75\n  - 82\n  - 69\n  - 93\n  - 58\n  - 73\n  - 80\n  - 66\n  - 89\n  - 54\n  - 77\n  - 85\n  - 62\n  - 90\n  - 71\n  - 79\n  - 83\n  - 65\n  - 94\n  - 60\n  - 76\n  - 88\n  - 56\n  - 92\n  - 68\n  - 81\n  - 74\n  - 86\n  - 64\n  - 78\n  - 84\n  - 72\n  - 87\n  - 59\n  - 75\n  - 82\n  - 67\n  - 91\n  - 55\n  - 80\n  - 85\n  - 63\n  - 89\n  - 70\n  - 77\n  - 83\n  - 66\n  - 93\n  - 61\n  - 79\n  - 88\n  - 57\n  - 90\n  - 73\n  - 82\nbinNumber 10\ntitle Student Exam Score Distribution\naxisXTitle Score\naxisYTitle Count',
  },
  {
    id: 'word-cloud',
    title: 'Word Cloud',
    code: 'vis word-cloud\ndata\n  - text "Machine Learning"\n    value 100\n  - text "Deep Learning"\n    value 95\n  - text "NLP"\n    value 88\n  - text "Computer Vision"\n    value 85\n  - text "LLM"\n    value 92\n  - text "Reinforcement Learning"\n    value 72\n  - text "Knowledge Graph"\n    value 65\n  - text "Data Mining"\n    value 70\n  - text "Neural Network"\n    value 80\n  - text "Transfer Learning"\n    value 60\n  - text "Generative AI"\n    value 90\n  - text "GAN"\n    value 55\n  - text "Attention Mechanism"\n    value 75\n  - text "Pre-training"\n    value 82\n  - text "Fine-tuning"\n    value 68\n  - text "Multimodal"\n    value 86\n  - text "Vector Database"\n    value 58\n  - text "Prompt Engineering"\n    value 78\n  - text "AI Agent"\n    value 84\n  - text "GNN"\n    value 50\n  - text Bayesian\n    value 45\n  - text "Federated Learning"\n    value 48\n  - text "Autonomous Driving"\n    value 76\n  - text "Speech Recognition"\n    value 62\n  - text "Recommendation System"\n    value 66\n  - text "Anomaly Detection"\n    value 42\n  - text "Time Series"\n    value 52\n  - text "Text Classification"\n    value 40\n  - text "Object Detection"\n    value 58\n  - text "Semantic Segmentation"\n    value 46\ntitle AI Technology Keywords',
  },
  {
    id: 'dual-axes',
    title: 'Dual Axes Chart',
    code: 'vis dual-axes\ncategories\n  - Jan\n  - Feb\n  - Mar\n  - Apr\n  - May\n  - Jun\n  - Jul\n  - Aug\n  - Sep\n  - Oct\n  - Nov\n  - Dec\nseries\n  - type column\n    axisYTitle "Sales (10K CNY)"\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle "Profit Rate (%)"\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle Monthly Sales and Profit Rate\naxisXTitle Month',
  },
  {
    id: 'radar',
    title: 'Radar Chart',
    code: 'vis radar\ndata\n  - name Performance\n    value 85\n  - name Ecosystem\n    value 92\n  - name "Learning Curve"\n    value 78\n  - name "Community Activity"\n    value 88\n  - name Engineering\n    value 90\n  - name "Mobile Support"\n    value 82\ntitle Frontend Framework Evaluation',
  },
  {
    id: 'liquid',
    title: 'Liquid Chart',
    code: 'vis liquid\npercent 0.72\nshape circle\ntitle Server CPU Usage',
  },
  {
    id: 'funnel',
    title: 'Funnel Chart',
    code: 'vis funnel\ndata\n  - category "Browse Products"\n    value 1000\n  - category "Add to Cart"\n    value 450\n  - category "Submit Order"\n    value 250\n  - category "Complete Payment"\n    value 180\n  - category "Confirm Receipt"\n    value 150\ntitle E-commerce User Conversion Funnel',
  },
  {
    id: 'sankey',
    title: 'Sankey Diagram',
    code: 'vis sankey\ndata\n  - source Coal\n    target Electricity\n    value 320\n  - source Coal\n    target Steel\n    value 180\n  - source Coal\n    target "Chemical Industry"\n    value 120\n  - source Oil\n    target Transportation\n    value 280\n  - source Oil\n    target "Chemical Industry"\n    value 150\n  - source "Natural Gas"\n    target Electricity\n    value 200\n  - source "Natural Gas"\n    target Heating\n    value 160\n  - source "Natural Gas"\n    target "Chemical Industry"\n    value 80\n  - source Hydropower\n    target Electricity\n    value 180\n  - source Nuclear\n    target Electricity\n    value 100\n  - source Wind\n    target Electricity\n    value 90\n  - source Solar\n    target Electricity\n    value 60\nnodeAlign justify\ntitle Global Energy Flow',
  },
  {
    id: 'venn',
    title: 'Venn Diagram',
    code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label "Bought Phone"\n  - sets B\n    value 2800\n    label "Bought Earphones"\n  - sets C\n    value 2200\n    label "Bought Charger"\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600\ntitle Overlap in User Purchase Behaviors',
  },
  {
    id: 'boxplot',
    title: 'Boxplot',
    code: 'vis boxplot\ndata\n  - category Math\n    value 72\n  - category Math\n    value 85\n  - category Math\n    value 68\n  - category Math\n    value 91\n  - category Math\n    value 76\n  - category Math\n    value 83\n  - category Math\n    value 65\n  - category Math\n    value 88\n  - category Math\n    value 79\n  - category Math\n    value 94\n  - category Math\n    value 70\n  - category Math\n    value 82\n  - category Math\n    value 86\n  - category Math\n    value 74\n  - category Math\n    value 90\n  - category Math\n    value 67\n  - category Math\n    value 78\n  - category Math\n    value 84\n  - category Math\n    value 73\n  - category Math\n    value 89\n  - category "Language Arts"\n    value 78\n  - category "Language Arts"\n    value 82\n  - category "Language Arts"\n    value 75\n  - category "Language Arts"\n    value 88\n  - category "Language Arts"\n    value 80\n  - category "Language Arts"\n    value 85\n  - category "Language Arts"\n    value 72\n  - category "Language Arts"\n    value 90\n  - category "Language Arts"\n    value 77\n  - category "Language Arts"\n    value 83\n  - category "Language Arts"\n    value 79\n  - category "Language Arts"\n    value 86\n  - category "Language Arts"\n    value 74\n  - category "Language Arts"\n    value 91\n  - category "Language Arts"\n    value 76\n  - category "Language Arts"\n    value 84\n  - category "Language Arts"\n    value 81\n  - category "Language Arts"\n    value 73\n  - category "Language Arts"\n    value 87\ntitle Exam Score Distribution by Subject\naxisXTitle Subject\naxisYTitle Score',
  },
  {
    id: 'violin',
    title: 'Violin Chart',
    code: 'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\ntitle Iris Sepal Length Distribution\naxisYTitle "Sepal Length (cm)"',
  },
  {
    id: 'flow-diagram',
    title: 'Flow Diagram',
    code: 'vis flow-diagram\ntitle User Registration Flow\ndata\n  nodes\n    - name "Visit Registration Page"\n    - name "Fill and Submit Form"\n    - name "Verify User Info"\n    - name "Create New Account"\n    - name "Send Verification Email"\n    - name "Click Verification Link"\n    - name "Registration Complete"\  edges\n    - source "Visit Registration Page"\n      target "Fill and Submit Form"\n    - source "Fill and Submit Form"\n      target "Verify User Info"\n    - source "Verify User Info"\n      target "Create New Account"\n    - source "Create New Account"\n      target "Send Verification Email"\n    - source "Send Verification Email"\n      target "Click Verification Link"\n    - source "Click Verification Link"\n      target "Registration Complete"',
  },
  {
    id: 'network-graph',
    title: 'Network Graph',
    code: 'vis network-graph\ndata\n  nodes\n    - name "Harry Potter"\n    - name "Hermione Granger"\n    - name "Ron Weasley"\n    - name "Voldemort"\n  edges\n    - source "Harry Potter"\n      target "Hermione Granger"\n      name Friend\n    - source "Harry Potter"\n      target "Ron Weasley"\n      name Friend\n    - source "Harry Potter"\n      target Voldemort\n      name Enemy\n    - source Voldemort\n      target "Harry Potter"\n      name "Attempted to Kill"\ntitle Harry Potter Character Relationships',
  },
  {
    id: 'organization-chart',
    title: 'Organization Chart',
    code: 'vis organization-chart\ndata\n  name "Alice Johnson"\n  description "Chief Technology Officer"\n  children\n    - name "Bob Smith"\n      description "Senior Software Engineer"\n      children\n        - name "Charlie Brown"\n          description "Software Engineer"\n        - name "Diana White"\n          description "Software Engineer"\n    - name "Eve Black"\n      description "IT Support Department Head"\n      children\n        - name "Frank Green"\n          description "IT Support Specialist"\n        - name "Grace Blue"\n          description "IT Support Specialist"',
  },
  {
    id: 'indented-tree',
    title: 'Indented Tree',
    code: 'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json',
  },
  {
    id: 'mindmap',
    title: 'Mindmap',
    code: 'vis mindmap\ndata\n  name "Project Plan"\n  children\n    - name Research\n      children\n        - name "Market Research"\n        - name "Technical Feasibility"\n    - name Design\n      children\n        - name "Product Features"\n        - name "UI Design"\n    - name Development\n      children\n        - name Coding\n        - name "Unit Testing"\n    - name Testing\n      children\n        - name "Functional Testing"\n        - name "Performance Testing"\ntitle "Project Plan"',
  },
  {
    id: 'fishbone-diagram',
    title: 'Fishbone Diagram',
    code: 'vis fishbone-diagram\ntitle "Low Production Efficiency"\ndata\n  name "Low Production Efficiency"\n  children\n    - name Equipment\n      children\n        - name "Aging Equipment"\n        - name "Delayed Maintenance"\n    - name Personnel\n      children\n        - name "Insufficient Skills"\n        - name "Poor Work Attitude"\n    - name Process\n      children\n        - name "Complex Processes"\n        - name "Lack of Standardization"',
  },
  {
    id: 'table',
    title: 'Table',
    code: 'vis table\ndata\n  - Product Smartphone\n    Region "East China"\n    Sales 4580\n    "YoY Growth" "23.5%"\n    Rank 1\n  - Product Laptop\n    Region "South China"\n    Sales 3200\n    "YoY Growth" "15.8%"\n    Rank 2\n  - Product Tablet\n    Region "North China"\n    Sales 2100\n    "YoY Growth" "8.2%"\n    Rank 3\n  - Product Smartwatch\n    Region Southwest\n    Sales 1850\n    "YoY Growth" "42.1%"\n    Rank 4\n  - Product Earbuds\n    Region "Central China"\n    Sales 1520\n    "YoY Growth" "31.6%"\n    Rank 5\ntitle "2024 Q1 Sales Report"',
  },
  {
    id: 'summary',
    title: 'Summary',
    code: `# Q4 Sales Report

[Total Revenue](metric_name) reached [¥5.2M](metric_value, origin=5200000), growing by [18%](ratio_value, origin=0.18, assessment="positive"). [North America](dim_value) accounts for [40%](contribute_ratio, origin=0.40).`,
  },
];
