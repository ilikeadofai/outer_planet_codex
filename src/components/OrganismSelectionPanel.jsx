function OrganismCard({ organism, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(organism.id)}
      className={`ui-selectable-card ${selected ? 'ui-selectable-card-active' : 'ui-selectable-card-inactive'}`}
    >
      <p className="text-sm font-semibold text-sky-100 break-words">{organism.name}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-300 break-words">특징: {organism.feature}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400 break-words">적응 전략: {organism.strategy}</p>
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
    <section className="ui-panel p-4 lg:col-span-5">
      <h2 className="ui-panel-title">생물 선택</h2>

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
