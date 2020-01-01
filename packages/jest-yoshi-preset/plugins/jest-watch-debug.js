class JestWatchDebug {
  constructor() {
    JestWatchDebug.isDebugMode = global.__isDebugMode__ || false;
  }

  static setDebugMode(bool) {
    JestWatchDebug.isDebugMode = bool;
  }

  static getDebugMode() {
    return JestWatchDebug.isDebugMode;
  }

  /**
   * Generate prompt for watch menu.
   */
  getUsageInfo() {
    return {
      key: 'd',
      prompt: `run tests with ${
        JestWatchDebug.isDebugMode ? 'closed' : 'open'
      } browser`,
    };
  }

  /**
   * Event when choosing item (d) from watch menu
   */
  async run() {
    if (JestWatchDebug.isDebugMode) {
      JestWatchDebug.setDebugMode(false);
    } else {
      JestWatchDebug.setDebugMode(true);
    }
    return true;
  }
}

module.exports = JestWatchDebug;
