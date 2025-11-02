import { useEffect, useMemo, useState } from "react";

type OverrideSlot = "who" | "dimension" | "lot";

type ExtraSlot = "associate" | "embroidery" | "gift" | "message" | "other";

type OverridesState = Record<OverrideSlot, number | null>;
type ExtrasState = Record<ExtraSlot, number>;

const overridePriority: OverrideSlot[] = ["lot", "dimension", "who"];

export function usePriceManager(initialBase: number) {
  const [base, setBase] = useState<number>(initialBase);

  const [overrides, setOverrides] = useState<OverridesState>({
    who: null,
    dimension: null,
    lot: null,
  });

  const [extras, setExtras] = useState<ExtrasState>({
    associate: 0,
    embroidery: 0,
    gift: 0,
    message: 0,
    other: 0,
  });

  const activeBase = useMemo(() => {
    for (const key of overridePriority) {
      const v = overrides[key];
      if (typeof v === "number") return v;
    }
    return base;
  }, [base, overrides]);

  const extrasSum = useMemo(
    () => Object.values(extras).reduce((a, b) => a + b, 0),
    [extras]
  );

  const total = useMemo(() => activeBase + extrasSum, [activeBase, extrasSum]);

  const setOverride = (slot: OverrideSlot, value: number | null) =>
    setOverrides((prev) => ({ ...prev, [slot]: value }));

  const clearOverride = (slot: OverrideSlot) => setOverride(slot, null);

  const setExtra = (slot: ExtraSlot, value: number) =>
    setExtras((prev) => ({ ...prev, [slot]: Number(value) || 0 }));

  const clearExtra = (slot: ExtraSlot) => setExtra(slot, 0);

  useEffect(() => {
    setBase(initialBase);
  }, [initialBase]);

  return {
    base,
    activeBase,
    total,
    overrides,
    extras,
    setBase,
    setOverride,
    clearOverride,
    setExtra,
    clearExtra,
  };
}