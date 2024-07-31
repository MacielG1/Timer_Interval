export function changeFavicon(url: string) {
  const link = (document.querySelector("link[rel*='icon']") || document.createElement("link")) as HTMLLinkElement;
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}
