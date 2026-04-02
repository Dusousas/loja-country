export function shouldDisableImageOptimization(src: string) {
  return src.startsWith("blob:") || src.startsWith("data:");
}
