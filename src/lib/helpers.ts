export function hexa(hex: string, alpha: number): string {
  if (hex.length === 7) {
    return `${hex}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}`;
  }
  return hex;
}
