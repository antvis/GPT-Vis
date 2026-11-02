import { notFound } from 'next/navigation';
import { docs } from '../../lib/docs';
import DocPage, { docMetadata } from '../components/DocPage';

type Props = { params: Promise<{ slug: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return docs.slice(1).map((doc) => ({ slug: doc.slug.split('/') }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = docs.find((entry) => entry.slug === slug.join('/'));
  return doc ? docMetadata(doc) : notFound();
}
export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const doc = docs.find((entry) => entry.slug === slug.join('/'));
  return doc ? <DocPage doc={doc} /> : notFound();
}
