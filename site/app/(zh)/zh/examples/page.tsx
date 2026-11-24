import Content, { pageMetadataFor } from '../../../examples/PageContent';
export const metadata = pageMetadataFor('zh');
export default function Page() {
  return <Content locale="zh" />;
}
