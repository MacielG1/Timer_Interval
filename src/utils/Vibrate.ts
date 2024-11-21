export function isMobileDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
}

export default async function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(400);
  }
}
