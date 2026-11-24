import RootDocument from '../components/RootDocument';
export { metadata } from '../components/RootDocument';
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="zh">{children}</RootDocument>;
}
