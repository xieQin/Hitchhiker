import { BaseProcessHandler } from './base_process_handler';
import { StressMessageType } from '../../common/enum/stress_type';
import { Log } from '../../utils/log';

export class StressNodejsWorkerHandler extends BaseProcessHandler {

    isFinish: boolean;

    handleMessage(msg: any) {
        Log.info(`stress nodejs worker handle msg`);
        if (msg === 'ready') {
            this.process.send({ type: StressMessageType.start });
        } else if (msg === 'finish' || msg === 'error') {
            this.isFinish = true;
        }

        if (this.call) {
            this.call(msg);
        }
    }

    afterProcessCreated() {
        Log.info(`stress nodejs worker process created`);
    }
}