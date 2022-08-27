import type { DrawflowExport } from 'drawflow';

export default interface Story {
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
  user_id: number;
  flow: DrawflowExport;
}
