export function LodgingListToolbar({
  toolbarRef,
  activeFilterMenu,
  setActiveFilterMenu,
  filterSummary,
  updateParams,
  availableOnly,
  optionCounts,
  type,
  features,
  priceBand,
  regionFilter,
  tastes,
  discounts,
  grades,
  facilities,
  toggleQueryValue,
  lodgingSortOptions,
  sort,
}) {
  return (
    <section className="list-toolbar">
      <div ref={toolbarRef} className="list-filter-bar">
        <div className="list-filter-menu">
          <button
            type="button"
            className={`list-filter-trigger${activeFilterMenu === "theme" ? " is-active" : ""}`}
            onClick={() => setActiveFilterMenu((current) => (current === "theme" ? null : "theme"))}
          >
            <span className="list-filter-trigger-row">
              <span className="list-filter-trigger-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M3 5h14M5.5 10h9M8 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className="list-filter-trigger-copy">
                <span>필터</span>
                <strong>{filterSummary.length ? `${filterSummary[0]}${filterSummary.length > 1 ? ` 외 ${filterSummary.length - 1}` : ""}` : "전체"}</strong>
              </span>
            </span>
          </button>
          {activeFilterMenu === "theme" ? (
            <div className="list-filter-sheet">
              <div className="list-filter-sheet-head">
                <strong>필터</strong>
                <div className="list-filter-head-actions">
                  <button
                    type="button"
                    className="list-filter-reset"
                    onClick={() => updateParams({ type: "", priceBand: "", regionFilter: "", features: "", tastes: "", discounts: "", grades: "", facilities: "", minPrice: "", maxPrice: "", available: "" })}
                  >
                    초기화
                  </button>
                  <button
                    type="button"
                    className="list-filter-close"
                    onClick={() => setActiveFilterMenu(null)}
                    aria-label="필터 닫기"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="list-filter-toggle-row">
                <span>매진 숙소 제외</span>
                <button
                  type="button"
                  className={`list-toggle${availableOnly ? " is-on" : ""}`}
                  onClick={() => {
                    updateParams({ available: availableOnly ? "" : "1" });
                    setActiveFilterMenu(null);
                  }}
                >
                  <span />
                </button>
              </div>

              <FilterSection title="숙소유형">
                {optionCounts.types.filter((option) => option.count > 0).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`list-filter-option${type === option.value ? " is-selected" : ""}`}
                    onClick={() => {
                      updateParams({ type: option.value === "all" ? "" : option.value });
                      setActiveFilterMenu(null);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="예약 조건">
                {optionCounts.features.filter((option) => option.count > 0).map((option) => {
                  const isSelected = features.includes(option.value);
                  const nextFeatures = isSelected
                    ? features.filter((item) => item !== option.value)
                    : [...features, option.value];

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`list-filter-option${isSelected ? " is-selected" : ""}`}
                      onClick={() => {
                        updateParams({ features: nextFeatures.length ? nextFeatures.join(",") : "" });
                        setActiveFilterMenu(null);
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </FilterSection>

              <FilterSection title="가격대">
                {optionCounts.priceBands.filter((option) => option.count > 0).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`list-filter-option${priceBand === option.value ? " is-selected" : ""}`}
                    onClick={() => {
                      updateParams({ priceBand: option.value === "all" ? "" : option.value });
                      setActiveFilterMenu(null);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="지역">
                {optionCounts.regions.filter((option) => option.count > 0).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`list-filter-option${regionFilter === option.value ? " is-selected" : ""}`}
                    onClick={() => {
                      updateParams({ regionFilter: option.value === "all" ? "" : option.value });
                      setActiveFilterMenu(null);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="#취향">
                {optionCounts.tastes.filter((option) => option.count > 0).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`list-filter-option${tastes.includes(option.value) ? " is-selected" : ""}`}
                    onClick={() => toggleQueryValue("tastes", tastes, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="할인혜택">
                {optionCounts.discounts.filter((option) => option.count > 0).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`list-filter-option${discounts.includes(option.value) ? " is-selected" : ""}`}
                    onClick={() => toggleQueryValue("discounts", discounts, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="등급">
                {optionCounts.grades.filter((option) => option.count > 0).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`list-filter-option${grades.includes(option.value) ? " is-selected" : ""}`}
                    onClick={() => {
                      const nextValues = grades.includes(option.value) ? [] : [option.value];
                      updateParams({ grades: nextValues.length ? nextValues.join(",") : "" });
                      setActiveFilterMenu(null);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </FilterSection>

              <div className="list-filter-section">
                <h3>시설</h3>
                <div className="list-facility-groups">
                  {optionCounts.facilities.map((group) => (
                    <div key={group.title} className="list-facility-group">
                      <strong>{group.title}</strong>
                      <div className="list-filter-chip-grid">
                        {group.options.filter((option) => option.count > 0).map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className={`list-filter-option${facilities.includes(option.value) ? " is-selected" : ""}`}
                            onClick={() => toggleQueryValue("facilities", facilities, option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="list-filter-sheet-footer">
                <span>{filterSummary.length ? `${filterSummary.length}개 조건 적용 중` : "전체 숙소 보기"}</span>
                <button type="button" className="primary-button list-filter-apply" onClick={() => setActiveFilterMenu(null)}>
                  적용
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="list-filter-menu">
          <button
            type="button"
            className={`list-filter-trigger${activeFilterMenu === "sort" ? " is-active" : ""}`}
            onClick={() => setActiveFilterMenu((current) => (current === "sort" ? null : "sort"))}
          >
            <span className="list-filter-trigger-row">
              <span className="list-filter-trigger-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M6 4v12m0 0-3-3m3 3 3-3M14 16V4m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="list-filter-trigger-copy">
                <span>정렬</span>
                <strong>{lodgingSortOptions.find((item) => item.value === sort)?.label ?? "추천순"}</strong>
              </span>
            </span>
          </button>
          {activeFilterMenu === "sort" ? (
            <div className="list-filter-popover list-filter-popover-sort">
              {lodgingSortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`list-filter-option${sort === option.value ? " is-selected" : ""}`}
                  onClick={() => {
                    updateParams({ sort: option.value });
                    setActiveFilterMenu(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="list-filter-section">
      <h3>{title}</h3>
      <div className="list-filter-chip-grid">{children}</div>
    </div>
  );
}
