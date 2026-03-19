function OrganismCard({ organism, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(organism.id)}
      className={`w-full rounded-lg border p-3 text-left transition ${
        selected
          ? 'border-sky-400 bg-sky-950/50 ring-2 ring-sky-500/60'
          : 'border-slate-700 bg-slate-800 hover:border-slate-500'
      }`}
    >
      <p className="text-sm font-semibold text-sky-100">{organism.name}</p>
      <p className="mt-1 text-xs text-slate-300">특징: {organism.feature}</p>
      <p className="mt-1 text-xs text-slate-400">적응 전략: {organism.strategy}</p>
    </button>
  );
}

function SelectionGroup({ title, organisms, selectedId, onSelect }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-sky-200">{title}</h3>
      <div className="grid gap-2 xl:grid-cols-2">
        {organisms.map((organism) => (
          <OrganismCard
            key={organism.id}
            organism={organism}
            selected={organism.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function OrganismSelectionPanel({
  producers,
  primaryConsumers,
  secondaryConsumers,
  selectedProducerId,
  setSelectedProducerId,
  selectedPrimaryId,
  setSelectedPrimaryId,
  selectedSecondaryId,
  setSelectedSecondaryId
}) {
  return (
    <section className="rounded-xl bg-slate-900 p-4 shadow-lg lg:col-span-5">
      <h2 className="mb-4 text-lg font-semibold text-sky-200">생물 선택</h2>

      <div className="space-y-4">
        <SelectionGroup
          title="생산자 (2개 중 1개 선택)"
          organisms={producers}
          selectedId={selectedProducerId}
          onSelect={setSelectedProducerId}
        />

        <SelectionGroup
          title="1차 소비자 (2개 중 1개 선택)"
          organisms={primaryConsumers}
          selectedId={selectedPrimaryId}
          onSelect={setSelectedPrimaryId}
        />

        <SelectionGroup
          title="2차 소비자 (2개 중 1개 선택)"
          organisms={secondaryConsumers}
          selectedId={selectedSecondaryId}
          onSelect={setSelectedSecondaryId}
        />
      </div>
    </section>
  );
}

export default OrganismSelectionPanel;
