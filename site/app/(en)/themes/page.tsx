import Content, { pageMetadataFor } from '../../themes/PageContent';
export const metadata = pageMetadataFor('en');
export default function Page() {
  return <Content locale="en" />;
}
