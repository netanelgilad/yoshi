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
      prompt: 'run tests in debug mode',
    };
  }

  /**
   * Event when choosing item (d) from watch menu
   */
  run() {
    if (JestYoshiWatchPlugin.isDebugMode) {
      return JestYoshiWatchPlugin.setDebugMode(false);
    } else {
      return JestYoshiWatchPlugin.setDebugMode(true);
    }
  }
}

module.exports = JestYoshiWatchPlugin;
