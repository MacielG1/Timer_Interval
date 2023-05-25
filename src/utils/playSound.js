export default async function playSound(whichSound) {
  const audio = new Audio(whichSound);
  audio.play();
}
