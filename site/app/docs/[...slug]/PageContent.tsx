import { notFound } from 'next/navigation';
import { docs } from '../../lib/docs';
import type { Locale } from '../../lib/i18n';
import DocPage, { docMetadata } from '../components/DocPage';

type Props = { params: Promise<{ slug: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return docs.slice(1).map((doc) => ({ slug: doc.slug.split('/') }));
}
export async function pageMetadataFor({ params }: Props, locale: Locale) {
  const { slug } = await params;
  const doc = docs.find((entry) => entry.slug === slug.join('/'));
  return doc ? docMetadata(doc, locale) : notFound();
}
export default async function ChapterPage({ params, locale }: Props & { locale: Locale }) {
  const { slug } = await params;
  const doc = docs.find((entry) => entry.slug === slug.join('/'));
  return doc ? <DocPage doc={doc} locale={locale} /> : notFound();
}
