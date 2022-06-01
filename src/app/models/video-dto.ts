import { Resolution } from './resolution';
export interface VideoDto {
  id?: null | number;
  title?: null | string;
  description?: null | string;
  thumbnailFilepath?: null | string;
  watchedCounter?: null | number;
  secondsLength?: null | number;
  thumbnail?: null | string;
  availableResolutions?: null | Resolution[];
}