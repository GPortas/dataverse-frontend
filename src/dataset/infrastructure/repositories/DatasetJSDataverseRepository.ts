import { DatasetRepository } from '../../domain/repositories/DatasetRepository'
import { Dataset } from '../../domain/models/Dataset'
import {
  getDataset,
  getDatasetCitation,
  getDatasetSummaryFieldNames,
  WriteError,
  Dataset as JSDataset,
  DatasetUserPermissions as JSDatasetPermissions,
  getPrivateUrlDataset,
  getPrivateUrlDatasetCitation,
  getDatasetUserPermissions
} from '@iqss/dataverse-client-javascript'
import { JSDatasetMapper } from '../mappers/JSDatasetMapper'

export class DatasetJSDataverseRepository implements DatasetRepository {
  getByPersistentId(persistentId: string, version?: string): Promise<Dataset | undefined> {
    return getDataset
      .execute(persistentId, this.versionToVersionId(version))
      .then((jsDataset) =>
        Promise.all([
          jsDataset,
          getDatasetSummaryFieldNames.execute(),
          getDatasetCitation.execute(jsDataset.id, this.versionToVersionId(version)),
          getDatasetUserPermissions.execute(jsDataset.id)
        ])
      )
      .then(
        ([jsDataset, summaryFieldsNames, citation, jsDatasetPermissions]: [
          JSDataset,
          string[],
          string,
          JSDatasetPermissions
        ]) =>
          JSDatasetMapper.toDataset(jsDataset, citation, summaryFieldsNames, jsDatasetPermissions)
      )
      .catch((error: WriteError) => {
        if (!version) {
          throw new Error(error.message)
        }
        return this.getByPersistentId(persistentId)
      })
  }

  getByPrivateUrlToken(privateUrlToken: string): Promise<Dataset | undefined> {
    return Promise.all([
      getPrivateUrlDataset.execute(privateUrlToken),
      getDatasetSummaryFieldNames.execute(),
      getPrivateUrlDatasetCitation.execute(privateUrlToken)
    ])
      .then(
        ([jsDataset, summaryFieldsNames, citation]: [JSDataset, string[], string]) =>
          JSDatasetMapper.toDataset(jsDataset, citation, summaryFieldsNames, {
            canEditDataset: true,
            canPublishDataset: true,
            canManageDatasetPermissions: true,
            canDeleteDatasetDraft: true,
            canViewUnpublishedDataset: true
          }) // TODO Connect with JS dataset permissions
      )
      .catch((error: WriteError) => {
        throw new Error(error.message)
      })
  }

  versionToVersionId(version?: string): string | undefined {
    if (version === 'DRAFT') {
      return ':draft'
    }

    return version
  }
}
