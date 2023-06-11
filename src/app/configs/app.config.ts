import { environment as envDev} from '../../environments/environment';
import { environment as envProd } from 'src/environments/environment.prod';

export class AppConfig {
    private static prod = false;
    private static environment = this.prod ? envProd : envDev;

    public static ApiRoot = this.environment.remoteServer;
}
