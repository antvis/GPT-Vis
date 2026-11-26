import { ArrowLeft, ArrowRight, Check, Lightbulb } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from '../../components/LocaleLink';
import { getTranslator, type Locale } from '../../lib/i18n';

export function ExampleDetailHeading({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <header className="example-detail-heading">
      <div>
        <p className="site-eyebrow">{eyebrow}</p>
        <h1 className="text-balance">{title}</h1>
        <p className="text-pretty">{description}</p>
      </div>
      <span className="example-detail-icon" aria-hidden="true">
        {icon}
      </span>
    </header>
  );
}

export function ExampleUseCases({ items, locale }: { items: readonly string[]; locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <aside className="example-use-cases">
      <div className="example-use-cases-label">
        <Lightbulb className="size-4" aria-hidden="true" />
        <h2>{t('When to use it')}</h2>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check className="size-3.5" aria-hidden="true" />
            <span>{t(item)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ExampleSectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="example-section-heading">
      <div>
        <p className="site-eyebrow">{eyebrow}</p>
        <h2 id={id} className="text-balance">
          {title}
        </h2>
      </div>
      {description && <p className="text-pretty">{description}</p>}
    </div>
  );
}

export type ExampleOption = {
  property: string;
  valueType: string;
  typeHref?: string;
  type: string;
  description: string;
  defaultValue?: string;
};
export function ExampleOptions({
  groups,
  locale,
}: {
  groups: readonly { name: string; config: readonly ExampleOption[] }[];
  locale: Locale;
}) {
  const t = getTranslator(locale);
  return (
    <div className="example-options-groups">
      {groups.map((group) => {
        const defaults = group.config.some((option) => option.defaultValue !== undefined);
        return (
          <div key={group.name}>
            <h3>{t(group.name)}</h3>
            <div
              className="example-options-scroll"
              role="region"
              aria-label={t(group.name)}
              tabIndex={0}
            >
              <table className="example-options-table">
                <thead>
                  <tr>
                    <th scope="col">{t('Property')}</th>
                    <th scope="col">{t('Type')}</th>
                    <th scope="col">{t('Required')}</th>
                    {defaults && <th scope="col">{t('Default')}</th>}
                    <th scope="col">{t('Description')}</th>
                  </tr>
                </thead>
                <tbody>
                  {group.config.map((option, index) => (
                    <tr key={`${option.property}-${index}`}>
                      <th scope="row">
                        <code>{option.property}</code>
                      </th>
                      <td>
                        <code>
                          {option.typeHref ? (
                            <Link href={option.typeHref} className="underline underline-offset-4">
                              {option.valueType}
                            </Link>
                          ) : option.valueType === 'BuiltinThemeName | ThemeSpec' ? (
                            <>
                              <Link
                                href="/docs/themes#built-in-theme-names"
                                className="underline underline-offset-4"
                              >
                                BuiltinThemeName
                              </Link>
                              {' | '}
                              <Link
                                href="/docs/reference/theme-spec"
                                className="underline underline-offset-4"
                              >
                                ThemeSpec
                              </Link>
                            </>
                          ) : (
                            option.valueType
                          )}
                        </code>
                      </td>
                      <td>
                        <span
                          className="example-option-badge"
                          data-required={option.type === 'required'}
                        >
                          {t(option.type)}
                        </span>
                      </td>
                      {defaults && (
                        <td>
                          <code>{t(option.defaultValue ?? '—')}</code>
                        </td>
                      )}
                      <td>{t(option.description)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type AdjacentExample = { href: string; title: string };
export function ExamplePagination({
  previous,
  next,
  locale,
  kind = 'charts',
}: {
  previous?: AdjacentExample;
  next?: AdjacentExample;
  locale: Locale;
  kind?: 'charts' | 'annotations';
}) {
  const t = getTranslator(locale);
  return (
    <nav
      className="example-pagination"
      aria-label={t(kind === 'annotations' ? 'More annotations' : 'More chart types')}
    >
      {previous ? (
        <Link href={previous.href}>
          <span>
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            {t(kind === 'annotations' ? 'Previous annotation' : 'Previous chart')}
          </span>
          <strong>{previous.title}</strong>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href}>
          <span>
            {t(kind === 'annotations' ? 'Next annotation' : 'Next chart')}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <strong>{next.title}</strong>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
