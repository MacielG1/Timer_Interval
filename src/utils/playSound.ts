export default async function playSound(whichSound: string) {
  const audio = new Audio(whichSound);
  audio.play();
}
