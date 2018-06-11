import { getTypeFromId } from '../utils/getTypeFromId';
import * as ratioFromSensor from '../utils/ratioFromSensor';

export default class Sensor {
  constructor(sensor) {
    this.extends(sensor);
  }

  extends(sensor) {
    Object.assign(this, sensor);
    this.type = getTypeFromId(this.id);
  }

  get ratio() {
    if (ratioFromSensor[this.type]) {
      return ratioFromSensor[this.type](this.value);
    } else {
      return this.value < 100 ? this.value/100 : 1;
    }
  }
}
