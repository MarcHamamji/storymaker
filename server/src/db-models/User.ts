import { Model, RelationMappings } from 'objection';
import Story from './Story';

export default class User extends Model {
  static get tableName() {
    return 'user';
  }

  id!: number;
  name!: string;
  email!: string;
  avatar_url!: string;
  created_at!: string;
  updated_at!: string;

  static relationMappings: RelationMappings = {
    story: {
      relation: Model.HasManyRelation,
      modelClass: Story,
      join: {
        from: 'user.id',
        to: 'story.user_id',
      }
    }
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
