import { Model } from 'objection';

export default class StoryModel extends Model {
  static get tableName() {
    return 'story';
  }

  id!: string;
  user_id!: number;
  name!: string;
  flow!: object;
  created_at!: string;
  updated_at!: string;

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

