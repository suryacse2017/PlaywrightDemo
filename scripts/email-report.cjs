<<<<<<< HEAD
const fs = require('fs');

const reportPath = 'test-results.json';
const outputPath = 'email-report.html';

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

const tests = [];

function collectSpecs(suites) {
    for (const suite of suites || []) {

        for (const spec of suite.specs || []) {

            for (const test of spec.tests || []) {

                const results = test.results || [];

                let status = 'skipped';
                let duration = 0;

                if (results.length > 0) {
                    duration = results.reduce(
                        (total, result) => total + (result.duration || 0),
                        0
                    );

                    const statuses = results.map(result => result.status);

                    if (statuses.includes('failed') ||
                        statuses.includes('timedOut')) {
                        status = 'failed';
                    } else if (statuses.includes('passed')) {
                        status = statuses.length > 1 ? 'flaky' : 'passed';
                    } else if (statuses.includes('skipped')) {
                        status = 'skipped';
                    }
                }

                tests.push({
                    title: spec.title,
                    project: test.projectName || 'Demo1-Chrome',
                    status,
                    duration
                });
            }
        }

        collectSpecs(suite.suites);
    }
}

collectSpecs(report.suites);

const total = tests.length;
const passed = tests.filter(t => t.status === 'passed').length;
const failed = tests.filter(t => t.status === 'failed').length;
const flaky = tests.filter(t => t.status === 'flaky').length;
const skipped = tests.filter(t => t.status === 'skipped').length;

const overallStatus = failed > 0 ? 'FAILED' : 'SUCCESS';

function statusIcon(status) {
    if (status === 'passed') return '✓';
    if (status === 'failed') return '✗';
    if (status === 'flaky') return '⚠';
    return '−';
}

function statusText(status) {
    if (status === 'passed') return 'Passed';
    if (status === 'failed') return 'Failed';
    if (status === 'flaky') return 'Flaky';
    return 'Skipped';
}

const testRows = tests.map(test => `
<tr>
    <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
        <strong>${statusIcon(test.status)} ${test.title}</strong>
    </td>

    <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
        ${statusText(test.status)}
    </td>

    <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
        ${(test.duration / 1000).toFixed(2)}s
    </td>
</tr>
`).join('');

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<div style="max-width:800px;margin:auto;background:white;border-radius:8px;overflow:hidden;border:1px solid #ddd;">

    <div style="padding:22px;background:#111827;color:white;">
        <h2 style="margin:0;">
            Playwright Test Report
        </h2>

        <div style="margin-top:8px;font-size:16px;">
            ${overallStatus}
        </div>
    </div>

    <div style="padding:20px;">

        <h3 style="margin-top:0;">
            Project: Demo1-Chrome
        </h3>

        <table width="100%" cellspacing="8" cellpadding="0">
            <tr>

                <td style="background:#f3f4f6;padding:15px;text-align:center;">
                    <div style="font-size:26px;font-weight:bold;">
                        ${total}
                    </div>
                    <div>All</div>
                </td>

                <td style="background:#ecfdf5;padding:15px;text-align:center;">
                    <div style="font-size:26px;font-weight:bold;">
                        ${passed}
                    </div>
                    <div>Passed</div>
                </td>

                <td style="background:#fef2f2;padding:15px;text-align:center;">
                    <div style="font-size:26px;font-weight:bold;">
                        ${failed}
                    </div>
                    <div>Failed</div>
                </td>

                <td style="background:#fffbeb;padding:15px;text-align:center;">
                    <div style="font-size:26px;font-weight:bold;">
                        ${flaky}
                    </div>
                    <div>Flaky</div>
                </td>

                <td style="background:#f3f4f6;padding:15px;text-align:center;">
                    <div style="font-size:26px;font-weight:bold;">
                        ${skipped}
                    </div>
                    <div>Skipped</div>
                </td>

            </tr>
        </table>

        <h3 style="margin-top:30px;">
            Test Cases
        </h3>

        <table width="100%" cellspacing="0" cellpadding="0"
               style="border-collapse:collapse;border:1px solid #ddd;">

            <tr style="background:#f3f4f6;">
                <th align="left" style="padding:12px;">
                    Test
                </th>

                <th align="left" style="padding:12px;">
                    Status
                </th>

                <th align="left" style="padding:12px;">
                    Duration
                </th>
            </tr>

            ${testRows}

        </table>

        <div style="margin-top:25px;padding:15px;background:#f9fafb;border-radius:5px;">

            <strong>Branch:</strong>
            ${process.env.GITHUB_REF_NAME || 'Surya1'}
            <br><br>

            <strong>Repository:</strong>
            ${process.env.GITHUB_REPOSITORY || 'suryacse2017/PlaywrightDemo'}

        </div>

        <p style="margin-top:25px;color:#666;">
            The complete interactive Playwright HTML report is attached
            as <strong>playwright-report.zip</strong>.
        </p>

    </div>

</div>

</body>
</html>
`;

fs.writeFileSync(outputPath, html);

console.log(`Email report created: ${outputPath}`);


=======
const fs = require('node:fs');

const reportPath = 'test-results.json';
const outputPath = process.env.EMAIL_REPORT_OUTPUT || 'email-report.html';
const report = fs.existsSync(reportPath)
  ? JSON.parse(fs.readFileSync(reportPath, 'utf8'))
  : null;
const tests = [];

function collectSpecs(suites) {
  for (const suite of suites || []) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const results = test.results || [];
        const resultStatuses = results.map(result => result.status);
        let status = 'skipped';

        if (resultStatuses.includes('failed') || resultStatuses.includes('timedOut')) {
          status = resultStatuses.includes('passed') ? 'flaky' : 'failed';
        } else if (resultStatuses.includes('passed')) {
          status = 'passed';
        } else if (resultStatuses.some(resultStatus => resultStatus !== 'skipped')) {
          status = 'failed';
        }

        tests.push({
          title: spec.title,
          project: test.projectName || 'Playwright',
          status,
          duration: results.reduce((total, result) => total + (result.duration || 0), 0),
        });
      }
    }

    collectSpecs(suite.suites);
  }
}

collectSpecs(report?.suites);

const counts = {
  total: tests.length,
  passed: tests.filter(test => test.status === 'passed').length,
  failed: tests.filter(test => test.status === 'failed').length,
  flaky: tests.filter(test => test.status === 'flaky').length,
  skipped: tests.filter(test => test.status === 'skipped').length,
};
const status = process.env.WORKFLOW_STATUS || (counts.failed > 0 ? 'failure' : 'success');
const runUrl = process.env.RUN_URL || '';
const branch = process.env.GITHUB_REF_NAME || 'unknown';
const repository = process.env.GITHUB_REPOSITORY || 'unknown';
const reportTitle = process.env.REPORT_TITLE || 'Playwright Test Report';
const duration = report?.stats?.duration;
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

const testRows = tests.map(test => {
  const color = {
    passed: '#15803d',
    failed: '#b91c1c',
    flaky: '#b45309',
    skipped: '#475569',
  }[test.status];

  return `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(test.title)}</td>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;color:${color};font-weight:bold;text-transform:capitalize;">${escapeHtml(test.status)}</td>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">${(test.duration / 1000).toFixed(2)}s</td>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(test.project)}</td>
    </tr>`;
}).join('');

const summaryCards = [
  ['Total', counts.total, '#f1f5f9', '#0f172a'],
  ['Passed', counts.passed, '#dcfce7', '#15803d'],
  ['Failed', counts.failed, '#fee2e2', '#b91c1c'],
  ['Skipped', counts.skipped, '#e2e8f0', '#475569'],
  ['Flaky', counts.flaky, '#fef3c7', '#b45309'],
].map(([label, count, background, foreground]) => `
  <td style="padding:8px;width:20%;">
    <div style="background:${background};border-radius:8px;padding:16px 8px;text-align:center;">
      <div style="color:${foreground};font-size:28px;font-weight:bold;">${count}</div>
      <div style="color:#475569;font-size:13px;">${label}</div>
    </div>
  </td>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <div style="max-width:820px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <div style="padding:24px;background:#0f172a;color:#ffffff;">
      <div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#cbd5e1;">Playwright automation</div>
      <h1 style="margin:8px 0;font-size:26px;">${escapeHtml(reportTitle)}</h1>
      <div style="font-size:15px;">Workflow status: <strong>${escapeHtml(status)}</strong></div>
    </div>
    <div style="padding:24px;">
      <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 -8px 20px;">${summaryCards}</table>
      <table style="width:100%;border-collapse:collapse;margin-bottom:22px;">
        <tr><td style="padding:5px 0;color:#64748b;">Branch</td><td style="padding:5px 0;text-align:right;font-weight:bold;">${escapeHtml(branch)}</td></tr>
        <tr><td style="padding:5px 0;color:#64748b;">Repository</td><td style="padding:5px 0;text-align:right;font-weight:bold;">${escapeHtml(repository)}</td></tr>
        <tr><td style="padding:5px 0;color:#64748b;">Duration</td><td style="padding:5px 0;text-align:right;font-weight:bold;">${typeof duration === 'number' ? `${(duration / 1000).toFixed(1)}s` : 'Unavailable'}</td></tr>
      </table>
      <h2 style="margin:24px 0 10px;font-size:19px;">Test results</h2>
      ${tests.length > 0 ? `
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;font-size:14px;">
        <thead><tr style="background:#f8fafc;text-align:left;">
          <th style="padding:12px;">Test</th><th style="padding:12px;">Status</th>
          <th style="padding:12px;">Duration</th><th style="padding:12px;">Project</th>
        </tr></thead>
        <tbody>${testRows}</tbody>
      </table>` : '<p style="padding:14px;background:#fff7ed;color:#9a3412;border-radius:6px;">Test results were not generated. Check the workflow run for setup or test errors.</p>'}
      ${runUrl ? `<p style="margin:24px 0;"><a href="${escapeHtml(runUrl)}" style="display:inline-block;padding:12px 18px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;">Open workflow run and download full report</a></p>` : ''}
      <p style="color:#64748b;font-size:13px;">The attached ZIP contains the complete Playwright HTML report and its supporting files when a report was generated.</p>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(outputPath, html);
console.log(`Email report created: ${outputPath}`);
>>>>>>> origin/main
