import { CollectionRepository } from '../../collection/domain/repositories/CollectionRepository'
import { CollectionMother } from '../../../tests/component/collection/domain/models/CollectionMother'
import { Collection } from '../../collection/domain/models/Collection'
import { FakerHelper } from '../../../tests/component/shared/FakerHelper'

export class CollectionMockRepository implements CollectionRepository {
  getById(_id: string): Promise<Collection> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CollectionMother.createRealistic())
      }, FakerHelper.loadingTimout())
    })
  }
}
