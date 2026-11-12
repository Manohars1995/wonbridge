const Features = () => {
 const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "95% Faster Vehicle Processing",
    tag: "Core",
    description: "Automate weighment, vehicle entry, and slip generation with real-time accuracy.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    title: "24/7 Live Mining Visibility",
    tag: "Live",
    description: "Monitor CCTV feeds, weighbridges, vehicles, and mining operations in real time.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "90% Less Manual Operations",
    tag: "Smart",
    description: "Replace manual registers and disconnected systems with intelligent automation.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "70% Faster Decision Making",
    tag: "Insights",
    description: "Access live reports, operational analytics, alerts, and mining performance instantly.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "99.9% Operational Reliability",
    tag: "Trusted",
    description: "Enterprise-grade backup, sync, and disaster recovery built for nonstop mining operations.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "100% Audit Transparency",
    tag: "Security",
    description: "Track every operation, correction, and approval with secure audit logs and role access.",
  },
];

  return (
    <section id="features" className="py-16 bg-[#fdf8f3] my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Powerful Features for{" "}
            <span className="text-orange-500">Smarter Operations</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-400 hover:border-orange-500 hover:shadow-lg transition-all duration-300 text-center"
            >
              {/* Tag — always visible, top-right */}
              <span className="absolute top-3 right-3 bg-orange-500 group-hover:bg-white text-white group-hover:text-orange-500 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full transition-colors duration-300">
                {feature.tag}
              </span>

              {/* Icon circle */}
              <div className="w-14 h-14 bg-orange-50 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <span className="text-orange-500 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 group-hover:text-orange-100 leading-relaxed transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;