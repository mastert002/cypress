const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('after:run', async (results) => {
        const TM_API_KEY = process.env.TM_API_KEY;
        const TM_BASE_URL = process.env.TM_BASE_URL;
        const PROJECT_ID = process.env.TM_PROJECT_ID;

        if (!TM_API_KEY || !TM_BASE_URL || !PROJECT_ID) {
          console.log('OneAP env vars not set — skipping result push');
          return;
        }

        const runRes = await fetch(`${TM_BASE_URL}/ci/projects/${PROJECT_ID}/runs`, {
          method: 'POST',
          headers: { 'X-API-Key': TM_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `Cypress — ${new Date().toISOString().slice(0, 10)}`,
            environment: process.env.ENV || 'CI',
          }),
        }).then(r => r.json());

        const mapped = results.runs.flatMap(r =>
          r.tests.map(t => ({
            title: t.title.join(' '),
            status: t.state === 'passed' ? 'passed' : t.state === 'pending' ? 'skipped' : 'failed',
            duration_ms: t.duration,
            notes: t.displayError || '',
          }))
        );

        await fetch(`${TM_BASE_URL}/ci/runs/${runRes.id}/results`, {
          method: 'POST',
          headers: { 'X-API-Key': TM_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ results: mapped }),
        });

        await fetch(`${TM_BASE_URL}/ci/runs/${runRes.id}/complete`, {
          method: 'POST',
          headers: { 'X-API-Key': TM_API_KEY },
        });

        console.log(`OneAP run ${runRes.id} completed`);
      });
    },
  },
});