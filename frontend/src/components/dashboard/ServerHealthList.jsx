import ServerHealthCard from "./ServerHealthCard";

export default function ServerHealthList({ servers }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Server Health</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => (
          <ServerHealthCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
}
