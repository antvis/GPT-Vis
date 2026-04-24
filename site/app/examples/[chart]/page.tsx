import { Breadcrumb } from '@/app/components/Breadcrumb';
import { PageTitle } from '@/app/components/PageTitle';
import { CheckCircle, Lightbulb } from 'lucide-react';
import { use } from 'react';
import { ChartPreview } from '../../components/ChartPreview';
import { groupedExamplesData } from '../examplesData';

const allCharts = groupedExamplesData.flatMap((g) => g.charts);

export function generateStaticParams() {
  return allCharts.map((t) => ({ chart: t.id }));
}

export default function ChartDocContent({ params }: { params: Promise<{ chart: string }> }) {
  const { chart } = use(params);
  const chartData = allCharts.find((t) => t.id === chart);
  return (
    <>
      <div className="px-4 md:px-12 pt-6">
        <Breadcrumb
          items={[
            { label: 'Examples', href: '/examples' },
            { label: chartData?.name || chart, href: `/examples/${chart}` },
          ]}
        />
      </div>
      <div className="max-w-6xl px-4 md:px-12 pb-10">
          <header className="mb-10">
            <PageTitle title={chartData?.name || ''} />
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {chartData?.description}
            </p>
          </header>

          <section className="mb-8">
            <div className="bg-surface-container p-4 rounded-lg border border-outline-variant">
              <h2 className="text-[28px] font-bold mb-4 text-on-surface flex items-center gap-2">
                <Lightbulb className="text-primary w-5 h-5" />
                Use Cases
              </h2>
              <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {chartData?.knowledge?.useCases?.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3 text-on-surface-variant">
                    <CheckCircle className="w-4 h-4 mt-1 text-primary shrink-0" />
                    <span className="text-sm">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-grow bg-outline-variant" />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant/60">
                Visual Examples
              </h2>
              <div className="h-[1px] flex-grow bg-outline-variant" />
            </div>

            <div className="flex flex-col gap-8">
              {chartData?.examples?.map((ex, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-[#691eff] transition-colors">
                    {/* Example Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                      <h4 className="text-xl font-semibold text-gray-900 truncate">{ex.title}</h4>
                    </div>

                    <ChartPreview wrapper visSyntax={ex.code} chartId={`${chart}-${index}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] flex-grow bg-outline-variant" />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant/60">
                Options
              </h2>
              <div className="h-[1px] flex-grow bg-outline-variant" />
            </div>

            <div className="flex flex-col gap-8">
              {chartData?.knowledge?.config?.map((group) => (
                <div key={group.name}>
                  <h3 className="text-2xl font-semibold text-on-surface mb-3 px-1">{group.name}</h3>
                  <div className="overflow-x-auto overflow-hidden bg-white border border-outline-variant rounded-lg shadow-sm">
                    <table className="w-full text-left border-collapse min-w-[520px]">
                      <thead>
                        <tr className="bg-surface-container-high/80">
                          <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-on-surface-variant/60">
                            Property
                          </th>
                          <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-on-surface-variant/60">
                            Type
                          </th>
                          <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-on-surface-variant/60">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant">
                        {group.config?.map((opt, i) => (
                          <tr
                            key={`${opt.property}-${i}`}
                            className="hover:bg-surface-container/50 transition-colors"
                          >
                            <td className="px-6 py-4 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                              {(opt.property.match(/\./g)?.length ?? 0) > 0 && (
                                <span
                                  className="inline-block"
                                  style={{ width: (opt.property.match(/\./g)!.length) * 16 }}
                                />
                              )}
                              {opt.property}
                            </td>
                            <td className="px-6 py-4 text-sm text-on-surface">{opt.type}</td>
                            <td className="px-6 py-4 text-sm text-on-surface-variant">
                              {opt.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
      </div>
    </>
  );
}
