export function changeFavicon(currentColor: string) {
  const svgTemplate = `
    <svg id="mySVG" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="${currentColor}" stroke="#000" stroke-width="5"/>
      <line x1="50" y1="52" x2="50" y2="20" stroke="#000" stroke-width="6"/>
      <line x1="50" y1="52" x2="75" y2="38" stroke="#000" stroke-width="6"/>
    </svg>
  `;

  const svgBlob = new Blob([svgTemplate], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  const link = (document.querySelector("link[rel*='icon']") || document.createElement("link")) as HTMLLinkElement;
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}
