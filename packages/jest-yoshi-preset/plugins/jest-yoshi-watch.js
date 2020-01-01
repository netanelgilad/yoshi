class JestYoshiWatchPlugin {
  constructor() {
    JestYoshiWatchPlugin.isDebugMode = false;
  }

  static setDebugMode(bool) {
    JestYoshiWatchPlugin.isDebugMode = bool;
  }

  static getDebugMode() {
    return JestYoshiWatchPlugin.isDebugMode;
  }

  /**
   * Generate prompt for watch menu.
   */
  getUsageInfo() {
    return {
      key: 'd',
      prompt: `run tests with ${
        JestYoshiWatchPlugin.isDebugMode ? 'closed' : 'open'
      } browser`,
    };
  }

  /**
   * Event when choosing item (d) from watch menu
   */
  async run() {
    if (JestYoshiWatchPlugin.isDebugMode) {
      JestYoshiWatchPlugin.setDebugMode(false);
    } else {
      JestYoshiWatchPlugin.setDebugMode(true);
    }
    return true;
  }
}

module.exports = JestYoshiWatchPlugin;
