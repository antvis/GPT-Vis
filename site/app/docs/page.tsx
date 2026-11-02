import { docs } from '../lib/docs';
import DocPage, { docMetadata } from './components/DocPage';
import { LegacyDocRedirect } from './components/LegacyDocRedirect';

export const metadata = docMetadata(docs[0]);
export default function DocumentationPage() {
  return (
    <>
      <LegacyDocRedirect />
      <DocPage doc={docs[0]} />
    </>
  );
}
