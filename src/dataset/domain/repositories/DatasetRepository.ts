import { Dataset } from '../models/Dataset'
import { DatasetPaginationInfo } from '../models/DatasetPaginationInfo'
import { DatasetDTO } from '../useCases/DTOs/DatasetDTO'
import { DatasetsWithCount } from '../models/DatasetsWithCount'

export interface DatasetRepository {
  getByPersistentId: (persistentId: string, version?: string) => Promise<Dataset | undefined>
  getByPrivateUrlToken: (privateUrlToken: string) => Promise<Dataset | undefined>
  create: (dataset: DatasetDTO, collectionId?: string) => Promise<{ persistentId: string }>
  getAllWithCount: (
    collectionId: string,
    paginationInfo: DatasetPaginationInfo
  ) => Promise<DatasetsWithCount>
}
