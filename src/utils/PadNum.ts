export default function pad(value: number | string) {
  if (typeof value === "number") {
    return value.toString().padStart(2, "0");
  } else if (typeof value === "string") {
    const parts = value.split(":");
    const paddedParts = parts.map((part) => part.padStart(2, "0"));
    return paddedParts.join(":");
  }
  return "";
}
