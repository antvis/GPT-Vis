import Link from 'next/link';
import { Breadcrumb } from '../components/Breadcrumb';
import { ChartPreview } from '../components/ChartPreview';
import { PageTitle } from '../components/PageTitle';
import { Sidebar } from '../components/SideBar';
import { groupedExamplesData } from './examplesData';

export default function ExamplesGallery() {
  return (
    <div className="max-w-screen-xl mx-auto flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="px-12 pt-6">
          <Breadcrumb items={[{ label: 'Examples', href: '/examples' }]} />
        </div>
        <div className="max-w-6xl px-12 pb-10">
          <header className="mb-10 max-w-3xl">
            <PageTitle title="Examples Gallery" />
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Explore 21 AI-friendly chart types with comprehensive knowledge base and live examples
            </p>
          </header>

          <div className="flex flex-col gap-16">
            {groupedExamplesData.map((group) => (
              <section key={group.id}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-8">
                  {group.title}
                </h2>
                <div className="flex flex-col gap-20">
                  {group.charts.map((chart, chartIdx) => (
                    <div key={chart.id} id={chart.id}>
                      <h3 className="text-2xl font-bold text-on-surface mb-6 group flex items-center gap-1.5">
                        {chart.name}
                        <a
                          href={`#${chart.id}`}
                          className="opacity-0 group-hover:opacity-40 hover:!opacity-70 text-on-surface-variant font-normal text-xl transition-opacity"
                          aria-label={`Link to ${chart.name}`}
                        >
                          #
                        </a>
                      </h3>
                      <Link href={`/examples/${chart.id}`}>
                        <div className="group block bg-white rounded-lg border border-outline-variant hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer">
                          <div className="flex flex-col md:flex-row h-full">
                            <div className="flex-1 p-8 flex flex-col justify-center">
                              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                                {chart.description}
                              </p>
                              <div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 block mb-2">
                                  Use Cases
                                </span>
                                <ul className="flex flex-col gap-1 list-disc list-inside text-xs font-medium text-on-surface-variant">
                                  {chart.knowledge.useCases.map((uc: string) => (
                                    <li key={uc} className="marker:text-primary">
                                      {uc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="w-full md:w-[400px] flex items-center justify-center p-4">
                              <ChartPreview
                                visSyntax={chart.galleryExamples}
                                chartId={`${chart.id}-${chartIdx}`}
                                // className="aspect-[3/2]"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
