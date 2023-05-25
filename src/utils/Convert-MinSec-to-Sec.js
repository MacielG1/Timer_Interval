export default function convert_MinSec_to_Sec(str) {
  let [minute, second] = str.split(":");

  minute = parseInt(minute, 10);
  second = parseInt(second, 10);
  return minute * 60 + second;
}
