const QualificationStats = ({ isVisible, stats }) => {
  return (
    <section className="py-12 border-y border-gray-800/50 bg-gradient-to-b from-gray-900/50 to-black/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`relative group transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm text-center">
                  <div
                    className={`inline-flex p-3 bg-gradient-to-br ${stat.color}/20 rounded-xl mb-3`}
                  >
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QualificationStats;
