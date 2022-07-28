import Entity from '../models/entity';

export default class Creature extends Entity {
  private grunt() {
    console.log(` - RGHRGHRGRHGRHGRHGR ${this.id} ${this.type}`);
  }

  private getHurt() {
    console.log(` - AI ${this.id} ${this.type}`);
  }
}
