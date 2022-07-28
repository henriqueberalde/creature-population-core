import Entity from '../models/entity';

export default class World extends Entity {
  private changeSeason() {
    console.log(` - CHANGE_SEASON INSIDE ${this.id} ${this.type}`);
  }
}
