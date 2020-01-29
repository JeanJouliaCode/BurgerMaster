var Reserve = class Reserve {
  constructor() {}

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  init() {}
};
