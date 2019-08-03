import {Model} from '../../../../projects/fbs-shared/src/lib/models';

export interface WorkArea extends Model {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export function createWorkArea(
  id: number,
  name: string,
  description: string,
  active: boolean
): WorkArea {
  let workArea = {
    id: id,
    name: name,
    description: description,
    active: active
  };
  return workArea;
}
