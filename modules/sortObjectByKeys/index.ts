/**
 * Recursively sorts an object's keys alphabetically, including nested objects and arrays.
 * @param obj - The object to sort
 * @returns A new object with all keys sorted alphabetically at every level
 */
export function sortObjectByKeys<T>(obj: T): T {
  // Base cases: return non-objects as is
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle arrays: recursively sort any objects contained in the array
  if (Array.isArray(obj)) {
    return obj.map((item) => sortObjectByKeys(item)) as unknown as T;
  }

  // For objects: create a new sorted object
  const sortedObj = {} as Record<string, any>;

  // Get all keys and sort them alphabetically
  const sortedKeys = Object.keys(obj).sort();

  // Add each property to the new object in sorted order
  for (const key of sortedKeys) {
    // Recursively sort any nested objects
    sortedObj[key] = sortObjectByKeys((obj as Record<string, any>)[key]);
  }

  return sortedObj as T;
}
