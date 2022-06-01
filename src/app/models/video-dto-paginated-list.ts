import { VideoDto } from './video-dto';
export interface VideoDtoPaginatedList {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  items?: null | Array<VideoDto>;
  pageIndex?: number;
  totalCount?: number;
  totalPages?: number;
}