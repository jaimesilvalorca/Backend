import { CronService } from "./cron/cron-service"

export class Server {
    public static start() {

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                console.log('You will see this message every second');
            },
        )
    }
}