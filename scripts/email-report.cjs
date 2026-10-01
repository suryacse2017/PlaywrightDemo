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


