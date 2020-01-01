const { isDebugMode } = global;

jest.setTimeout(isDebugMode ? 100000 : 15 * 1000);
