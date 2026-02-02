# Contributing to GPT-Vis Website

Thank you for your interest in contributing to the GPT-Vis official website! This guide will help you get started.

## 🤖 AI-Generated Code Policy

> **Important**: This project follows the GPT-Vis policy of only accepting AI-generated code.

To contribute:

1. **Submit an Issue** describing the improvement or feature
2. **Tag @copilot** or use an AI coding assistant to generate the implementation
3. **Submit a PR** with the AI-generated code
4. **Include** the AI conversation or prompt in your PR description

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/antvis/GPT-Vis.git
   cd GPT-Vis/site
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## 📝 What to Contribute

### Content Improvements

- Documentation clarity
- Code examples
- Error corrections
- Translation support

### Design Enhancements

- UI/UX improvements
- Accessibility features
- Mobile responsiveness
- Animation refinements

### New Features

- Additional pages
- Interactive demos
- Search functionality
- Dark mode support

### SEO Optimizations

- Meta tag improvements
- Structured data
- Performance enhancements

## 🎨 Design Guidelines

### Color Scheme

- Primary: `#691eff` (Purple)
- Use transparency for depth: `rgba(105, 30, 255, 0.1)`, `rgba(105, 30, 255, 0.3)`
- Maintain flat design aesthetic

### Typography

- Use system fonts for performance
- Clear hierarchy with font sizes
- Consistent spacing

### Components

- Keep components simple and reusable
- Follow Next.js App Router patterns
- Maintain TypeScript types

## 🔍 Code Standards

### File Structure

```
site/app/
├── page.tsx              # Homepage
├── [feature]/
│   └── page.tsx         # Feature page
├── layout.tsx           # Root layout
└── globals.css          # Global styles
```

### Naming Conventions

- Components: PascalCase (`MyComponent.tsx`)
- Pages: lowercase (`page.tsx`)
- Utilities: camelCase (`myUtil.ts`)

### TypeScript

- Always use TypeScript
- Define types for props
- Avoid `any` types

### Tailwind CSS

- Use Tailwind utility classes
- Avoid custom CSS when possible
- Keep styles maintainable

## 🧪 Testing

### Before Submitting

1. **Build the site**:

   ```bash
   npm run build
   ```

2. **Test locally**:

   ```bash
   npm start
   ```

3. **Check all pages**:
   - Homepage: http://localhost:3000
   - Docs: http://localhost:3000/docs
   - Examples: http://localhost:3000/examples

4. **Verify**:
   - [ ] All links work
   - [ ] Mobile responsive
   - [ ] No console errors
   - [ ] SEO tags present
   - [ ] Fast page load

## 📦 Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make** your changes (using AI)
4. **Test** thoroughly
5. **Commit** with clear messages:
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature
   ```
7. **Open** a Pull Request

### PR Description Template

```markdown
## Description

Brief description of changes

## AI Generation Details

- AI tool used: [e.g., GitHub Copilot, ChatGPT]
- Prompt used: [Include key prompts]

## Changes

- [ ] Homepage updates
- [ ] Documentation changes
- [ ] Example additions
- [ ] Styling improvements

## Screenshots

[Include before/after screenshots]

## Testing

- [ ] Tested locally
- [ ] Build succeeds
- [ ] All pages work
- [ ] Mobile responsive
- [ ] Links verified

## Checklist

- [ ] Code is AI-generated
- [ ] Follows design guidelines
- [ ] TypeScript types included
- [ ] Tailwind CSS used
- [ ] Documentation updated
```

## 🐛 Bug Reports

### Report Structure

```markdown
## Bug Description

Clear description of the issue

## Steps to Reproduce

1. Go to...
2. Click on...
3. See error...

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- Browser: [e.g., Chrome 120]
- Device: [e.g., Desktop, iPhone 14]
- OS: [e.g., macOS, Windows 11]

## Screenshots

[If applicable]
```

## 💡 Feature Requests

### Request Structure

```markdown
## Feature Description

Clear description of the feature

## Problem it Solves

What problem does this address?

## Proposed Solution

How should it work?

## Alternatives Considered

Other approaches explored

## AI-Friendly Implementation

How can AI help implement this?
```

## 📞 Getting Help

- **Issues**: [GitHub Issues](https://github.com/antvis/GPT-Vis/issues)
- **Discussions**: [GitHub Discussions](https://github.com/antvis/GPT-Vis/discussions)
- **AntV**: [AntV Community](https://antv.antgroup.com/)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions help make GPT-Vis better for everyone. We appreciate your time and effort!
