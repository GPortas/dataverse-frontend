import { ReactElement } from 'react'
import { Collection } from './Collection'
import { DatasetJSDataverseRepository } from '../../dataset/infrastructure/repositories/DatasetJSDataverseRepository'
import { useSearchParams } from 'react-router-dom'
import { CollectionJSDataverseRepository } from '../../collection/infrastructure/repositories/CollectionJSDataverseRepository'
import { INFINITE_SCROLL_ENABLED } from './config'

const datasetRepository = new DatasetJSDataverseRepository()
const repository = new CollectionJSDataverseRepository()
export class CollectionFactory {
  static create(): ReactElement {
    return <CollectionWithSearchParams />
  }
}

function CollectionWithSearchParams() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : undefined
  const id = searchParams.get('id') ? (searchParams.get('id') as string) : 'root'

  return (
    <Collection
      repository={repository}
      datasetRepository={datasetRepository}
      page={page}
      id={id}
      infiniteScrollEnabled={INFINITE_SCROLL_ENABLED}
    />
  )
}
