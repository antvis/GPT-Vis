import { Cloud } from 'lucide-react';

export const wordcloudData = {
  id: 'wordcloud',
  name: 'Word Cloud',
  icon: Cloud,
  galleryExamples:
    'vis word-cloud\ndata\n  - text "Machine Learning"\n    value 100\n  - text "Deep Learning"\n    value 95\n  - text "NLP"\n    value 88\n  - text "Computer Vision"\n    value 85\n  - text "LLM"\n    value 92\n  - text "Reinforcement Learning"\n    value 72\n  - text "Knowledge Graph"\n    value 65\n  - text "Data Mining"\n    value 70\n  - text "Neural Network"\n    value 80\n  - text "Transfer Learning"\n    value 60\n  - text "Generative AI"\n    value 90\n  - text "GAN"\n    value 55\n  - text "Attention Mechanism"\n    value 75\n  - text "Pre-training"\n    value 82\n  - text "Fine-tuning"\n    value 68\n  - text "Multimodal"\n    value 86\n  - text "Vector Database"\n    value 58\n  - text "Prompt Engineering"\n    value 78\n  - text "AI Agent"\n    value 84\n  - text "GNN"\n    value 50\n  - text "Bayesian"\n    value 45\n  - text "Federated Learning"\n    value 48\n  - text "Autonomous Driving"\n    value 76\n  - text "Speech Recognition"\n    value 62\n  - text "Recommendation System"\n    value 66\n  - text "Anomaly Detection"\n    value 42\n  - text "Time Series"\n    value 52\n  - text "Text Classification"\n    value 40\n  - text "Object Detection"\n    value 58\n  - text "Semantic Segmentation"\n    value 46\ntitle "AI Technology Keywords"',
  description:
    'A word cloud is a visualization method that displays the frequency or weight of words in text data, using different text sizes to represent word frequency. Word clouds help quickly identify the most commonly used or most important words in text data. The size of each word is typically proportional to its frequency — larger fonts represent more frequent or more important words, allowing users to intuitively see how often a word appears in the text. This visual approach enables users to quickly grasp the main content and core themes of the text.',
  knowledge: {
    introduction:
      'A word cloud is a visualization method that displays the frequency or weight of words in text data, using different text sizes to represent word frequency. Word clouds help quickly identify the most commonly used or most important words in text data. The size of each word is typically proportional to its frequency — larger fonts represent more frequent or more important words, allowing users to intuitively see how often a word appears in the text. This visual approach enables users to quickly grasp the main content and core themes of the text.',
    useCases: [
      'Analyze frequently used words in social media, reviews, or feedback.',
      'Identify keywords or topics in text analysis.',
      'Highlight the importance of specific terms, such as in news summaries or market research results.',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            valueType: 'string',
            description: 'Value must be "word-cloud".',
          },
          {
            property: 'data',
            type: 'required',
            valueType: 'Object[]',
            description: 'Chart data.',
          },
          {
            property: 'data.text',
            type: 'required',
            valueType: 'string',
            description: 'The word to display in the word cloud.',
          },
          {
            property: 'data.value',
            type: 'required',
            valueType: 'number',
            description: 'Importance score of the word (frequency, weight, etc.).',
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
            valueType: "'default' | 'dark' | 'academy'",
            description: 'Chart theme, default is "default".',
          },
          {
            property: 'style',
            type: 'optional',
            valueType: 'Object',
            description: 'Chart style.',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            valueType: 'string',
            description: 'Must be a valid color value.',
          },
          {
            property: 'style.palette',
            type: 'optional',
            valueType: 'string[]',
            description: 'Must be a valid color array.',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'Display the weight distribution of keywords in the AI technology field.',
      description: 'Display the weight distribution of keywords in the AI technology field.',
      code: 'vis word-cloud\ndata\n  - text "Machine Learning"\n    value 100\n  - text "Deep Learning"\n    value 95\n  - text "NLP"\n    value 88\n  - text "Computer Vision"\n    value 85\n  - text "LLM"\n    value 92\n  - text "Reinforcement Learning"\n    value 72\n  - text "Knowledge Graph"\n    value 65\n  - text "Data Mining"\n    value 70\n  - text "Neural Network"\n    value 80\n  - text "Transfer Learning"\n    value 60\n  - text "Generative AI"\n    value 90\n  - text "GAN"\n    value 55\n  - text "Attention Mechanism"\n    value 75\n  - text "Pre-training"\n    value 82\n  - text "Fine-tuning"\n    value 68\n  - text "Multimodal"\n    value 86\n  - text "Vector Database"\n    value 58\n  - text "Prompt Engineering"\n    value 78\n  - text "AI Agent"\n    value 84\n  - text "GNN"\n    value 50\n  - text "Bayesian"\n    value 45\n  - text "Federated Learning"\n    value 48\n  - text "Autonomous Driving"\n    value 76\n  - text "Speech Recognition"\n    value 62\n  - text "Recommendation System"\n    value 66\n  - text "Anomaly Detection"\n    value 42\n  - text "Time Series"\n    value 52\n  - text "Text Classification"\n    value 40\n  - text "Object Detection"\n    value 58\n  - text "Semantic Segmentation"\n    value 46\ntitle "AI Technology Keywords"',
    },
    {
      title: 'Display keyword weights for front-end development tech stack, custom colors',
      description: 'Display keyword weights for front-end development tech stack',
      code: 'vis word-cloud\ndata\n  - text React\n    value 100\n  - text Vue\n    value 92\n  - text TypeScript\n    value 88\n  - text Next.js\n    value 80\n  - text Webpack\n    value 65\n  - text Vite\n    value 78\n  - text CSS\n    value 85\n  - text Tailwind\n    value 75\n  - text Node.js\n    value 82\n  - text GraphQL\n    value 55\n  - text REST\n    value 60\n  - text Svelte\n    value 50\n  - text Angular\n    value 58\n  - text Redux\n    value 52\n  - text Zustand\n    value 45\n  - text ESLint\n    value 62\n  - text Prettier\n    value 48\n  - text Jest\n    value 56\n  - text Cypress\n    value 42\n  - text Storybook\n    value 40\n  - text Docker\n    value 68\n  - text SSR\n    value 70\n  - text SSG\n    value 55\n  - text PWA\n    value 38\n  - text WebAssembly\n    value 35\n  - text Three.js\n    value 44\n  - text D3.js\n    value 46\n  - text "Framer Motion"\n    value 40\n  - text "React Query"\n    value 52\n  - text SWR\n    value 36\ntitle "Front-End Development Tech Stack"\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n    - "#FB923C"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: 'Display keyword weights for data science terminology, custom palette',
      description: 'Display keyword weights for data science terminology',
      code: 'vis word-cloud\ndata\n  - text "Statistical Analysis"\n    value 95\n  - text "Regression Analysis"\n    value 88\n  - text "Hypothesis Testing"\n    value 72\n  - text "ANOVA"\n    value 55\n  - text "PCA"\n    value 65\n  - text "Cluster Analysis"\n    value 78\n  - text "Feature Engineering"\n    value 85\n  - text "Cross-Validation"\n    value 60\n  - text Regularization\n    value 52\n  - text "Gradient Descent"\n    value 75\n  - text "Loss Function"\n    value 68\n  - text Overfitting\n    value 62\n  - text "Data Cleaning"\n    value 80\n  - text Visualization\n    value 90\n  - text "A/B Testing"\n    value 70\n  - text "Confidence Interval"\n    value 48\n  - text "Decision Tree"\n    value 58\n  - text "Random Forest"\n    value 72\n  - text SVM\n    value 50\n  - text "Dimensionality Reduction"\n    value 45\n  - text Sampling\n    value 42\n  - text Normalization\n    value 55\n  - text Encoding\n    value 40\n  - text Pipeline\n    value 46\n  - text "Hyperparameter"\n    value 52\n  - text "Ensemble Learning"\n    value 65\n  - text "Cross-Entropy"\n    value 38\n  - text "Evaluation Metrics"\n    value 58\n  - text "Confusion Matrix"\n    value 44\n  - text "ROC Curve"\n    value 48\ntitle "Data Science Terminology"\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n    - "#CB997E"\n    - "#6B705C"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
