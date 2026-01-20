import PipelineCard from "./PipelineCard";

export default function PipelineList({ pipelines }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Recent Pipelines</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pipelines.map((pipeline) => (
          <PipelineCard key={pipeline.id} pipeline={pipeline} />
        ))}
      </div>
    </div>
  );
}
