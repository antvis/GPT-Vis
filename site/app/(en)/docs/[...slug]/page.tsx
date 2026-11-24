import Content, {
  generateStaticParams,
  pageMetadataFor,
} from '../../../docs/[...slug]/PageContent';
export { generateStaticParams };
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string[] }> };
export function generateMetadata(props: Props) {
  return pageMetadataFor(props, 'en');
}
export default function Page(props: Props) {
  return <Content {...props} locale="en" />;
}
