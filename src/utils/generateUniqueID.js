let number = 0;
export default function generateUniqueId() {
  number++;
  return `id-${number}`;
}
