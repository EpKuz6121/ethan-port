'use client';

import React, { useState } from 'react';
import {
  Award,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  logoDomain?: string;
  fallbackIcon: string;
  points: string[];
}

interface ProjectItem {
  id: string;
  title: string;
  period: string;
  tags: string[];
  description: string;
  award?: string;
  liveUrl?: string;
  codeUrl?: string;
  visualType: 'chart' | 'montecarlo' | 'matrix' | 'agent' | 'court';
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'PGA of America',
    role: 'Enterprise Technologies Intern',
    location: 'Frisco, TX',
    period: 'Jun. 2026 – Aug. 2026',
    logoDomain: 'pga',
    fallbackIcon: '⛳',
    points: [
      'Built a section-benchmarking web application giving all 41 PGA of America sections a single standardized view of their key metrics, with data pipelines from Looker, AWS, and Workday feeding automated yearly updates; expanded tracking to 23 new metrics — including first-ever aggregated counts — giving sections self-service visibility into numbers they previously had to request from HQ.',
      'Rebuilt the internal PTO system with a full-year calendar view, an optimizer identifying the highest-value windows to take leave, and a Perplexity Sonar agent for date lookups; added a planning interface that books selected days directly into Workday, increasing overall PTO scheduling by 30%.',
      'Developed a live event photo dashboard in TypeScript enabling staff to capture and store photos in an exportable database; adopted for continued nationwide use at Drive, Chip and Putt qualifiers.',
      'Built FaceAce, a company-wide Wordle-style game for learning coworkers’ names, driving 200 new users on release and a 50% increase in PGA’s internal HUB 2.0 usage.'
    ]
  },
  {
    company: 'Big Data & Analytics Association (OSU)',
    role: 'Data Analytics Project Leader',
    location: 'Columbus, OH',
    period: 'Aug. 2025 – Present',
    logoDomain: 'theohiostateuniversity',
    fallbackIcon: '📊',
    points: [
      'Led 30 students through a complete end-to-end data science project, from problem framing to a final live presentation, teaching participants with no prior experience.',
      'Delivered targeted written feedback and guided students on debugging, statistical reasoning, and storytelling.',
      'Ran project sessions covering Python, R, SQL, Tableau, Pandas, NumPy, Jupyter, and Git.'
    ]
  }
];

const PROJECTS: ProjectItem[] = [
  {
    id: 'pga-model',
    title: 'PGA Championship Prediction Model',
    period: 'May 2026',
    tags: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Jupyter'],
    description:
      'Built a Monte Carlo simulation that runs the tournament thousands of times to generate player win probabilities, modeling players on strokes-gained categories (off-the-tee, approach, around-the-green, putting). Backtested simulated probabilities against historical results and Vegas implied odds to validate the model.',
    codeUrl: 'https://github.com/EpKuz6121/pga-championship-model',
    liveUrl: 'https://github.com/EpKuz6121/pga-championship-model',
    visualType: 'montecarlo'
  },
  {
    id: 'mlb-shift',
    title: 'MLB Shift-Ban Defensive Impact Analysis',
    period: 'Mar. 2026',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'LightGBM'],
    description:
      'Studied how the 2023 MLB infield shift ban affected defensive value at shortstop and second base, using Gaussian Mixture Model clustering to define defensive archetypes and a Difference-in-Differences framework to isolate the effect. Trained gradient-boosted models on player-tracking data; found shallow-range shortstops lost value while shifted second basemen gained.',
    codeUrl: 'https://github.com/EpKuz6121/mlb-shift-ban-analysis',
    visualType: 'matrix'
  },
  {
    id: 'data-cleaner',
    title: 'Data Cleaner AI Agent',
    period: 'Dec. 2025',
    tags: ['Python', 'Transformers', 'TypeScript', 'Supabase', 'Lovable'],
    description:
      'Built an AI agent to guide early-stage data exploration by flagging high-null columns, detecting outliers, and summarizing key patterns. Enabled conversational dataset queries to give non-technical users accessible insights and explain abbreviations.',
    codeUrl: 'https://github.com/EpKuz6121/data-cleaner-agent',
    liveUrl: 'https://github.com/EpKuz6121/data-cleaner-agent',
    visualType: 'agent'
  },
  {
    id: 'consumer-credit',
    title: 'Consumer Credit & Loan Behavior Analysis',
    period: 'Apr. 2025',
    tags: ['Python', 'Pandas', 'Plotly', 'Tableau', 'PowerPoint'],
    award: 'Awarded Best Project in the OSU BDAA Data Science Project Series',
    description:
      'Analyzed loan behaviors across age groups for 36–60-month terms to surface borrowing patterns and average loan amounts, producing marketing insights to help businesses target demographics and predict lending outcomes.',
    codeUrl: 'https://github.com/EpKuz6121/credit-loan-analysis',
    visualType: 'chart'
  },
  {
    id: 'nba-mismatch',
    title: 'NBA Mismatch Efficiency Analysis',
    period: 'Jun. 2025',
    tags: ['Python', 'Pandas', 'Plotly'],
    description:
      'Analyzed NBA player-tracking data to evaluate how positional and size mismatches affect scoring efficiency, measuring points-per-shot to identify optimal shot-clock windows by position and inform lineup construction.',
    codeUrl: 'https://github.com/EpKuz6121/nba-mismatch-efficiency',
    visualType: 'court'
  }
];

const SKILLS = {
  Languages: ['Python', 'R', 'SQL', 'Java', 'C', 'C++', 'x86 Assembly', 'HTML', 'LaTeX'],
  'Frameworks & Libraries': ['Pandas', 'NumPy', 'scikit-learn', 'Plotly', 'Jupyter', 'Transformers', 'XGBoost', 'RandomForest'],
  'Developer Tools & Cloud': ['AWS', 'Azure', 'Looker', 'Tableau', 'PowerBI', 'Git', 'Anaconda', 'Supabase', 'Snowflake', 'Databricks']
};

export default function Page() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'pga-model': true,
    'mlb-shift': true,
    'data-cleaner': false,
    'consumer-credit': false,
    'nba-mismatch': false
  });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('ethan.kuzmik@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#f4f4f5] antialiased selection:bg-zinc-800 selection:text-zinc-100">
      <main className="max-w-2xl mx-auto px-6 py-12 space-y-12">
        {/* 1. Header */}
        <header className="space-y-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Ethan Kuzmik
            </h1>
            <p className="text-sm text-zinc-400">
              B.S. in Data Analytics Honors @ Ohio State · Incoming Enterprise Technologies Intern @ PGA of America
            </p>
          </div>

          {/* Links Row */}
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-zinc-400">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-zinc-100 transition-colors underline-offset-4 hover:underline"
            >
              Resume PDF <span className="text-[10px]">↗</span>
            </a>
            <span className="text-zinc-700 select-none">·</span>
            <a
              href="https://github.com/EpKuz6121"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-zinc-100 transition-colors underline-offset-4 hover:underline"
            >
              GitHub <span className="text-[10px]">↗</span>
            </a>
            <span className="text-zinc-700 select-none">·</span>
            <a
              href="https://linkedin.com/in/ethan-kuzmik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-zinc-100 transition-colors underline-offset-4 hover:underline"
            >
              LinkedIn <span className="text-[10px]">↗</span>
            </a>
            <span className="text-zinc-700 select-none">·</span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 hover:text-zinc-100 transition-colors underline-offset-4 hover:underline text-left cursor-pointer"
              title="Click to copy email address"
            >
              {copiedEmail ? (
                <>
                  <span className="text-emerald-400">Copied!</span>
                  <Check className="w-3 h-3 text-emerald-400 inline" />
                </>
              ) : (
                <>
                  Email <span className="text-[10px]">↗</span>
                </>
              )}
            </button>
            <span className="text-zinc-700 select-none">·</span>
            <span className="text-zinc-500">330-414-7171</span>
          </nav>
        </header>

        {/* 2. Bio */}
        <section className="text-sm leading-relaxed text-zinc-300">
          <p>
            I am a Data Analytics Honors student at The Ohio State University specializing in machine learning, sports analytics, and data-driven infrastructure. Most recently, I developed enterprise benchmarking pipelines and scheduling engines at the PGA of America, while leading student cohorts in end-to-end data science projects on campus.
          </p>
        </section>

        {/* Education Section */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-mono font-medium">
            Education
          </h2>
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
              <span className="font-medium text-zinc-200">
                The Ohio State University
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Columbus, OH
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-zinc-400">
              <span>B.S. in Data Analytics, Arts & Sciences Honors College</span>
              <span className="font-mono text-zinc-400">Aug. 2024 – May 2028</span>
            </div>
          </div>
        </section>

        {/* 3. Experience */}
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-mono font-medium">
            Experience
          </h2>

          <div className="space-y-8">
            {EXPERIENCES.map((exp, idx) => (
              <article key={idx} className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="h-6 w-6 rounded border border-zinc-800 bg-zinc-900/50 p-1 flex items-center justify-center shrink-0 mt-0.5">
                    <img
                      src={`https://cdn.simpleicons.org/${exp.logoDomain}/ffffff`}
                      alt={`${exp.company} logo`}
                      className="h-3.5 w-3.5 object-contain opacity-80"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-icon')) {
                          const span = document.createElement('span');
                          span.className = 'fallback-icon text-[10px] select-none text-zinc-400';
                          span.textContent = exp.fallbackIcon;
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-2">
                      <h3 className="text-sm font-medium text-zinc-200">
                        {exp.company}
                      </h3>
                      <span className="text-xs font-mono text-zinc-400 shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-2 text-xs">
                      <span className="text-zinc-400">{exp.role}</span>
                      <span className="font-mono text-zinc-400">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 pl-8 text-xs leading-relaxed text-zinc-400">
                  {exp.points.map((bullet, bIdx) => (
                    <li key={bIdx} className="list-disc list-outside marker:text-zinc-600">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Projects */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-mono font-medium">
              Projects
            </h2>
            <span className="text-[11px] font-mono text-zinc-400">
              {PROJECTS.length} selected works
            </span>
          </div>

          <div className="space-y-7">
            {PROJECTS.map((project) => {
              const isExpanded = expandedProjects[project.id];

              return (
                <article key={project.id} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-medium text-zinc-200">
                        {project.title}
                      </h3>
                      <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 hover:text-zinc-100 hover:underline underline-offset-2"
                          >
                            Live <span className="text-[10px]">↗</span>
                          </a>
                        )}
                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 hover:text-zinc-100 hover:underline underline-offset-2"
                          >
                            Code <span className="text-[10px]">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">
                      {project.period}
                    </span>
                  </div>

                  {project.award && (
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-300/90 font-mono">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{project.award}</span>
                    </div>
                  )}

                  <p className="text-xs leading-relaxed text-zinc-400">
                    {project.description}
                  </p>

                  {/* Structured Code/Visual Container */}
                  <div className="overflow-hidden rounded-md border border-zinc-800 bg-[#0c0d14] relative">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800/80 bg-zinc-900/40 text-[11px] font-mono text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-zinc-700" />
                        <span className="w-2 h-2 rounded-full bg-zinc-700" />
                        <span className="w-2 h-2 rounded-full bg-zinc-700" />
                        <span className="ml-2 text-zinc-400">
                          {project.id}.py
                        </span>
                      </div>
                      <button
                        onClick={() => toggleProject(project.id)}
                        className="hover:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'hide diagram' : 'view diagram'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-3.5 sm:p-4 text-xs font-mono select-none">
                        {project.visualType === 'montecarlo' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11px] text-zinc-400">
                              <span>N = 10,000 Tournament Runs</span>
                              <span className="text-emerald-400">Backtested R² = 0.84</span>
                            </div>
                            <div className="space-y-1.5">
                              {[
                                { player: 'Player A (SG: OTT +1.4, APP +1.8)', winProb: '14.2%', bar: 'w-[75%]' },
                                { player: 'Player B (SG: OTT +0.8, ARG +1.2)', winProb: '9.8%', bar: 'w-[52%]' },
                                { player: 'Player C (SG: APP +1.5, PUTT +0.9)', winProb: '7.4%', bar: 'w-[39%]' },
                                { player: 'Field Average Baseline', winProb: '0.8%', bar: 'w-[10%]' }
                              ].map((row, rIdx) => (
                                <div key={rIdx} className="space-y-0.5">
                                  <div className="flex justify-between text-[10px] text-zinc-400">
                                    <span className="truncate pr-2">{row.player}</span>
                                    <span className="text-zinc-200">{row.winProb}</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden">
                                    <div className={`h-full bg-zinc-300 ${row.bar} rounded-full`} />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-zinc-400">
                              $ Calibrated stochastic simulation over 72-hole tournament conditions.
                            </p>
                          </div>
                        )}

                        {project.visualType === 'matrix' && (
                          <div className="space-y-2.5">
                            <div className="flex justify-between text-[11px] text-zinc-400">
                              <span>Diff-in-Differences Infield Shift Analysis</span>
                              <span className="text-zinc-400">Post-2023 Ban</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded border border-zinc-800/80 bg-zinc-900/30 space-y-1">
                                <span className="text-zinc-400 block text-[10px]">Shortstop (SS) Range</span>
                                <div className="text-rose-400 font-semibold">-0.38 OAA / 100 inn</div>
                                <p className="text-[10px] text-zinc-400">Shallow-range profiles suffered defensive devaluation.</p>
                              </div>
                              <div className="p-2 rounded border border-zinc-800/80 bg-zinc-900/30 space-y-1">
                                <span className="text-zinc-400 block text-[10px]">Second Base (2B) Range</span>
                                <div className="text-emerald-400 font-semibold">+0.51 OAA / 100 inn</div>
                                <p className="text-[10px] text-zinc-400">Shifted second basemen reclaimed defensive surplus.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {project.visualType === 'agent' && (
                          <div className="space-y-2 text-[11px] bg-zinc-950/60 p-3 rounded border border-zinc-800/50">
                            <div className="text-zinc-400 text-[10px]">
                              {'>>> agent.inspect(dataset="q3_customer_churn.csv")'}
                            </div>
                            <div className="text-zinc-300">
                              [Agent]: Scanned 48 columns (124,500 rows). Flagged 3 critical null clusters &gt; 42%.
                            </div>
                            <div className="text-emerald-400 text-[10px]">
                              ✔ Replaced synthetic outliers with median IQR bounds.
                              <br />✔ Transformed non-standard date encodings.
                            </div>
                            <div className="text-zinc-400 text-[10px]">
                              {'>>> "What does column \'acq_chnl_cd\' represent?"'}
                              <br />
                              <span className="text-zinc-300">
                                [Agent]: Standardized marketing channel code (Organic Search, Paid Referral, Affiliate).
                              </span>
                            </div>
                          </div>
                        )}

                        {project.visualType === 'chart' && (
                          <div className="space-y-2 text-[11px]">
                            <div className="flex justify-between text-zinc-400">
                              <span>Loan Term Risk Profiles (36m vs 60m)</span>
                              <span className="text-amber-300/80">Best Project Winner</span>
                            </div>
                            <div className="h-16 flex items-end gap-1.5 pt-2 px-1 border-b border-zinc-800">
                              <div className="flex-1 bg-zinc-700 h-[35%] rounded-t-sm flex items-center justify-center text-[9px] text-zinc-300">18-24</div>
                              <div className="flex-1 bg-zinc-600 h-[65%] rounded-t-sm flex items-center justify-center text-[9px] text-zinc-200">25-34</div>
                              <div className="flex-1 bg-zinc-500 h-[90%] rounded-t-sm flex items-center justify-center text-[9px] text-zinc-100">35-49</div>
                              <div className="flex-1 bg-zinc-600 h-[75%] rounded-t-sm flex items-center justify-center text-[9px] text-zinc-200">50-64</div>
                              <div className="flex-1 bg-zinc-700 h-[45%] rounded-t-sm flex items-center justify-center text-[9px] text-zinc-300">65+</div>
                            </div>
                            <p className="text-[10px] text-zinc-400">
                              Segmented loan volume peaked in 35-49 cohort with lowest default variance.
                            </p>
                          </div>
                        )}

                        {project.visualType === 'court' && (
                          <div className="space-y-2 text-[11px]">
                            <div className="flex justify-between text-zinc-400">
                              <span>Points-Per-Shot (PPS) by Clock Window & Mismatch</span>
                              <span className="text-zinc-400">Tracking Matrix</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                              <div className="p-1.5 rounded bg-zinc-900/40 border border-zinc-800">
                                <span className="text-zinc-400 block">Early (18-24s)</span>
                                <span className="text-zinc-200 font-medium">1.18 PPS</span>
                              </div>
                              <div className="p-1.5 rounded bg-zinc-900/40 border border-zinc-800">
                                <span className="text-zinc-400 block">Mid (8-17s)</span>
                                <span className="text-emerald-400 font-medium">1.26 PPS (Mismatch)</span>
                              </div>
                              <div className="p-1.5 rounded bg-zinc-900/40 border border-zinc-800">
                                <span className="text-zinc-400 block">Late (0-7s)</span>
                                <span className="text-rose-400 font-medium">0.88 PPS</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-400 pt-0.5">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="hover:text-zinc-200 transition-colors">
                        {tag}
                        {tIdx < project.tags.length - 1 && (
                          <span className="text-zinc-700 ml-1.5 mr-0.5">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 5. Technical Skills */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-mono font-medium">
            Technical Skills
          </h2>

          <div className="space-y-3 text-xs leading-relaxed">
            <div>
              <span className="text-zinc-400 font-mono text-[11px] block sm:inline sm:w-44 sm:inline-block">
                Languages:
              </span>
              <span className="text-zinc-300 font-mono">
                {SKILLS.Languages.join(', ')}
              </span>
            </div>

            <div>
              <span className="text-zinc-400 font-mono text-[11px] block sm:inline sm:w-44 sm:inline-block">
                Frameworks & Libraries:
              </span>
              <span className="text-zinc-300 font-mono">
                {SKILLS['Frameworks & Libraries'].join(', ')}
              </span>
            </div>

            <div>
              <span className="text-zinc-400 font-mono text-[11px] block sm:inline sm:w-44 sm:inline-block">
                Developer Tools & Cloud:
              </span>
              <span className="text-zinc-300 font-mono">
                {SKILLS['Developer Tools & Cloud'].join(', ')}
              </span>
            </div>
          </div>
        </section>

        {/* 6. Footer */}
        <footer className="pt-8 border-t border-zinc-800/80 text-xs text-zinc-400 font-mono text-center sm:text-left">
          <p>
            Ethan Kuzmik · Built with Next.js & Tailwind CSS · Deployed on Vercel
          </p>
        </footer>
      </main>
    </div>
  );
}
