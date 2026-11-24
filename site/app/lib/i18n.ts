import zh from '../../messages/zh.json';

export type Locale = 'en' | 'zh';
export const LANGUAGE_STORAGE_KEY = 'gpt-vis.locale';
const translations: Record<string, string> = zh;

export function getLocale(pathname: string): Locale {
  return /^\/zh(?:\/|$)/.test(pathname) ? 'zh' : 'en';
}

export function stripLocale(path: string): string {
  return path.replace(/^\/zh(?=\/|[?#]|$)/, '') || '/';
}

/** Only page URLs are localized; downloads, images and external URLs stay shared. */
export function localeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const bare = stripLocale(href);
  const path = bare.startsWith('/') ? bare : `/${bare}`;
  if (!/^\/(?:[?#]|$|(?:docs|examples|themes)(?:[/?#]|$))/.test(path)) return href;
  return locale === 'zh' ? `/zh${path === '/' ? '' : path}` : path;
}

export function getTranslator(locale: Locale) {
  return (message: string, values?: Record<string, string | number>) => {
    const translated = locale === 'zh' ? (translations[message] ?? message) : message;
    return values
      ? translated.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match))
      : translated;
  };
}

/** Localize sample content without changing configuration keys or numeric values. */
export function localizeSample<T>(value: T, locale: Locale): T {
  if (locale === 'en') return value;
  const t = getTranslator(locale);
  if (typeof value === 'string') {
    if (value.startsWith('vis ')) {
      return value
        .split('\n')
        .map((line) =>
          line.replace(
            /^(\s*(?:-\s*)?(?:title|axisXTitle|axisYTitle|name|description|category|group|time|source|target)\s+)(.+)$/,
            (_, prefix: string, raw: string) => {
              const label = raw.replace(/^"(.*)"$/, '$1');
              const translated = t(label);
              return translated === label
                ? `${prefix}${raw}`
                : `${prefix}${JSON.stringify(translated)}`;
            },
          ),
        )
        .join('\n') as T;
    }
    return t(value) as T;
  }
  if (Array.isArray(value)) return value.map((item) => localizeSample(item, locale)) as T;
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localizeSample(item, locale)]),
    ) as T;
  return value;
}
