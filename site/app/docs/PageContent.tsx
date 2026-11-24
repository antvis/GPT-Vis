import { docs } from '../lib/docs';
import type { Locale } from '../lib/i18n';
import DocPage, { docMetadata } from './components/DocPage';
import { LegacyDocRedirect } from './components/LegacyDocRedirect';

export const pageMetadataFor = (locale: Locale) => docMetadata(docs[0], locale);
export default function DocumentationPage({ locale }: { locale: Locale }) {
  return (
    <>
      <LegacyDocRedirect />
      <DocPage doc={docs[0]} locale={locale} />
    </>
  );
}
