import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';

export interface PositionModel extends Model {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export function createPosition(
  id: number,
  name: string,
  description: string,
  active: boolean): PositionModel {
  let position: PositionModel;
  position = {
    id: id,
    name: name,
    description: description,
    active: active
  };
  return position;
}
