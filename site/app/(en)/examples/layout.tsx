import LayoutContent from '../../examples/LayoutContent';
export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutContent locale="en">{children}</LayoutContent>;
}
