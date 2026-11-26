import Content, { pageMetadataFor } from '../../../examples/annotations/PageContent';

export const metadata = pageMetadataFor('en');
export default function Page() {
  return <Content locale="en" />;
}
