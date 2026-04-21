/**
 * Cron Syntax Helper
 * Developed by Ahmar Hussain (Stackaura)
 * https://www.stackaura.com/
 */

class CronHelper {
    static explain(expression) {
        const parts = expression.trim().split(/\s+/);
        if (parts.length !== 5) {
            return "Error: Invalid cron expression. Expected 5 parts (minute, hour, dom, month, dow).";
        }

        const [min, hour, dom, month, dow] = parts;

        const timeStr = this.parseTime(min, hour);
        const dayStr = this.parseDay(dom);
        const monthStr = this.parseMonth(month);
        const weekStr = this.parseWeek(dow);

        return `${timeStr}, ${dayStr}, ${monthStr}, and ${weekStr}.`.replace(/\s+/g, ' ');
    }

    static parseTime(min, hour) {
        if (min === '*' && hour === '*') return "Every minute";
        if (min === '*' && hour !== '*') return `Every minute at hour ${hour}`;
        if (min !== '*' && hour === '*') return `At minute ${min} of every hour`;
        
        let m = min === '*' ? 'every minute' : `minute ${min}`;
        let h = hour === '*' ? 'every hour' : `hour ${hour}`;
        
        // Simple 12-hour conversion for common cases
        if (!isNaN(hour)) {
            const hNum = parseInt(hour);
            const period = hNum >= 12 ? 'PM' : 'AM';
            const displayH = hNum % 12 || 12;
            const displayM = min.padStart(2, '0');
            return `At ${displayH}:${displayM} ${period}`;
        }

        return `At minute ${min} and hour ${hour}`;
    }

    static parseDay(dom) {
        if (dom === '*') return "every day";
        return `on day ${dom} of the month`;
    }

    static parseMonth(month) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if (month === '*') return "every month";
        if (!isNaN(month) && month >= 1 && month <= 12) return `in ${months[month - 1]}`;
        return `in month ${month}`;
    }

    static parseWeek(dow) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (dow === '*') return "every day of the week";
        if (!isNaN(dow) && dow >= 0 && dow <= 6) return `only on ${days[dow]}`;
        return `on day ${dow} of the week`;
    }
}

// CLI Support
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        printUsage();
    } else {
        console.log("\n🚀 Cron Explanation:");
        console.log("-------------------");
        console.log(CronHelper.explain(args[0]));
        console.log("-------------------\n");
    }
}

function printUsage() {
    console.log("Usage: node cron-helper.js \"* * * * *\"");
    console.log("Example: node cron-helper.js \"0 12 * * MON\"");
}

module.exports = CronHelper;
