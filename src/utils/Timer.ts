export default class Timer {
  private static interval: number;
  private static expected: number;
  private timeout: number | null;
  private stopped: boolean;
  private workFunc: () => void;
  private errorFunc?: () => void;

  constructor(interval: number, workFunc: () => void, errorFunc?: () => void) {
    Timer.interval = interval;
    Timer.expected = 0;
    this.timeout = null;
    this.stopped = false;
    this.workFunc = workFunc;
    this.errorFunc = errorFunc;
    this.start();
    this.step();
  }

  start() {
    Timer.expected = performance.now() + Timer.interval;
    this.timeout = window.setTimeout(() => this.step(), Timer.interval);
  }

  stop() {
    this.stopped = true;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  step() {
    const drift = performance.now() - Timer.expected;
    if (drift > Timer.interval) {
      if (this.errorFunc) this.errorFunc();
    }
    if (!this.stopped) {
      this.workFunc();

      Timer.expected += Timer.interval;
      this.timeout = window.setTimeout(() => this.step(), Math.max(0, Timer.interval - drift));
    }
  }
}
