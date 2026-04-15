'use client';

import { useRouter } from 'next/navigation';
import { ChartPreview } from '../components/ChartPreview';
import { Sidebar } from '../components/SideBar';
import { groupedExamplesData } from './examplesData';

export default function ExamplesGallery() {
  const router = useRouter();
  return (
    <div className="flex">
      <Sidebar
        onItemClick={(id) => {
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }}
      />
      <div className="flex-1 ml-72">
        <div className="max-w-6xl mx-auto p-12">
          <header className="mb-10 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4">
              Examples Gallery
            </h1>
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
                <div className="flex flex-col gap-12">
                  {group.charts.map((chart, chartIdx) => (
                    <div key={chart.id} id={chart.id}>
                      <h3 className="text-2xl font-bold text-on-surface mb-6">{chart.name}</h3>
                      <div
                        className="group block bg-white rounded-xl border border-outline-variant hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer"
                        onClick={() => router.push(`/examples/${chart.id}`)}
                      >
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
                          <div className="w-full md:w-[400px] aspect-[3/2] flex items-center justify-center p-4">
                            <ChartPreview
                              visSyntax={chart.galleryExamples}
                              chartId={`${chart.id}-${chartIdx}`}
                              className="aspect-[3/2]"
                            />
                          </div>
                        </div>
                      </div>
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
