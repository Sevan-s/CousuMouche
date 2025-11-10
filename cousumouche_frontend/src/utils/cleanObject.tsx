export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  if (!obj || typeof obj !== "object") return obj;

  const cleaned: any = Array.isArray(obj) ? [] : {};

  Object.entries(obj).forEach(([key, value]) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return;    }

    if (typeof value === "object" && !Array.isArray(value)) {
      const nested = cleanObject(value);
      if (Object.keys(nested).length > 0) {
        cleaned[key] = nested;
      }
    } else {
      cleaned[key] = value;
    }
  });

  return cleaned;
}