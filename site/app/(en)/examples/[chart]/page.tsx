import Content, {
  generateStaticParams,
  pageMetadataFor,
} from '../../../examples/[chart]/PageContent';
export { generateStaticParams };
export const dynamicParams = false;
type Props = { params: Promise<{ chart: string }> };
export function generateMetadata(props: Props) {
  return pageMetadataFor(props, 'en');
}
export default function Page(props: Props) {
  return <Content {...props} locale="en" />;
}
