import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./cron/cron-service"


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

export class Server {
    public static start() {

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://localhost:3000.com'
                new CheckService(
                    fileSystemLogRepository,
                    ()=>console.log(`${url} is ok`),
                    (error)=>console.log(error)
                ).execute(url)
                // new CheckService().execute('http://localhost:3000')
            },
        )
    }
}