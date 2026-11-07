import 'server-only';
import vi from '../../messages/docs/vi.json';
import en from '../../messages/docs/en.json';
import type { DocsContent } from '@/types/docs';

export function getDocs(locale: string): DocsContent {
  return locale === 'en' ? en : vi;
}
