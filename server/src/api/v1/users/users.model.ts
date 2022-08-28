import { Model, RelationMappings } from 'objection';
import StoryModel from '../stories/stories.model';

export default class UserModel extends Model {
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
      modelClass: StoryModel,
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
