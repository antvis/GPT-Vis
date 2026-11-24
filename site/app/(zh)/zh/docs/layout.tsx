import LayoutContent from '../../../docs/LayoutContent';
export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutContent locale="zh">{children}</LayoutContent>;
}
