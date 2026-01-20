const environments = [
  { value: "all", label: "All Environments" },
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "development", label: "Development" }
];

export default function EnvironmentFilter({ selected, onChange }) {
  const getButtonClass = (value) => {
    const base = "px-4 py-2 text-sm font-medium rounded-lg transition-colors";
    if (selected === value) {
      return `${base} bg-emerald-600 text-white`;
    }
    return `${base} bg-slate-700 text-slate-300 hover:bg-slate-600`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {environments.map((env) => (
        <button
          key={env.value}
          onClick={() => onChange(env.value)}
          className={getButtonClass(env.value)}
        >
          {env.label}
        </button>
      ))}
    </div>
  );
}
