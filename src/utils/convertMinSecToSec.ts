export default function convertMinSecToSec(str: string): string {
  const [minuteStr, secondStr] = str.split(":");
  const minute = parseInt(minuteStr, 10);
  const second = parseInt(secondStr, 10);

  return `${minute * 60 + second}`;
}
