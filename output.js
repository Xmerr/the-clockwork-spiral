import rl from 'readline';
import chalk from 'chalk';
import { createSpiral } from './createSpiral.js';

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
readline.question('What size?\n', input => {
    if (!input || isNaN(input)) {
        throw Error('invalid input');
    }

    const size = parseInt(input);
    const spiral = createSpiral(size);
    const largest = size * size;

    const getColor = number => {
        const percent = number / largest;
        const greenPercent = percent < 0.5 ? 1 : 0.5 / percent;
        const redPercent = percent > 0.5 ? 1 : percent / 0.5;

        const green = Math.round(255 * greenPercent);
        const red = Math.round(255 * redPercent);

        return { green, red };
    };

    if (process.argv.some(arg => arg.includes('--spiral'))) {
        console.clear();
        spiral.forEach(row => {
            row.forEach(cell => {
                const { green, red } = getColor(cell);
                process.stdout.write(chalk.rgb(red, green, 0)(`${cell}\t`));
            });
            process.stdout.write('\n');
        });
    } else {
        console.log(spiral);
    }

    process.exit();
});
