export interface ConfigItem {
  label: string;
  seconds: number;
  type: string;
}

export type Status = "NEW" | "ONGOING" | "COMPLETE";

export default class Timer {
  currentTimer: ConfigItem[] = [];
  beginDate?: number;
  currentRoundBeginDate?: number;
  currentRound?: number;
  status: Status = 'NEW'
  interval?: number;

  constructor(config: ConfigItem[]) {
    this.currentTimer = config;
    if (config.length === 0) {
      console.log('EMPTY TIMER')
      this.end()
    } else {
      console.log("STARTING TIMER");
      this.start()
    }
  }

  public getCurrentState() {
    return {
      config: this.currentTimer,
      round: this.currentRound,
      lastSyncDate: this.currentRoundBeginDate,
    };
  }

  private start() {
    this.status = "ONGOING";
    const currentDate = Date.now();
    this.beginDate = currentDate;
    this.currentRoundBeginDate = currentDate;
    this.currentRound = 0
    console.log('SETTING INTERVAL')
    this.interval = setInterval(this.checkTimer.bind(this), 100)
  }

  private checkTimer() {
    if (
      this.currentTimer.length &&
      this.currentRound !== undefined &&
      this.currentTimer[this.currentRound]
      && this.currentRoundBeginDate) {
        const currentRoundConfig = this.currentTimer[this.currentRound];
        let diff: number;
        diff = currentRoundConfig.seconds / 1000 - (Date.now() - this.currentRoundBeginDate) / 1000;
        if (diff <= 0) {
          this.nextRound();
        }
    }
  }

  private nextRound() {
    clearInterval(this.interval)
    const currentDate = Date.now()
    if (this.currentRound !== undefined && this.currentRound + 1 < this.currentTimer.length) {
      this.currentRound++;
      this.currentRoundBeginDate = currentDate;
      this.interval = setInterval(this.checkTimer.bind(this), 100);
    } else {
      this.end()
    }
  }

  public end() {
    clearInterval(this.interval);
    this.status = "COMPLETE";
  }
}
