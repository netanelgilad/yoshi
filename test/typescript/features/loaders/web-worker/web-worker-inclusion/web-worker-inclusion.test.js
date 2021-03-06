const Scripts = require('../../../../../scripts');

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: Scripts.projectType.TS,
});

describe.each(['prod', 'dev'])('web-worker inclusion [%s]', mode => {
  it('integration', async () => {
    await scripts[mode](async () => {
      await page.goto(scripts.serverUrl);
      await page.waitFor(
        () => !!document.querySelector('#worker-text').textContent,
      );

      const result = await page.$eval(
        '#worker-text',
        ({ textContent }) => textContent,
      );

      expect(result).toBe('event from web worker');
    });
  });

  // TODO: we do not support this in jest-yoshi-preset

  // it('component tests', async () => {
  //   await scripts.test(mode);
  // });
});
