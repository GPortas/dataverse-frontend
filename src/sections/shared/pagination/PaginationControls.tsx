import { Col, Pagination, Row } from '@iqss/dataverse-design-system'
import { PageNumbersButtonsWithEllipsis } from './PageNumbersButtonsWithEllipsis'
import { PageSizeSelector } from './PageSizeSelector'
import styles from './Pagination.module.scss'
import { PaginationInfo } from '../../../shared/domain/models/PaginationInfo'
import { useEffect, useState } from 'react'
import { FilePaginationInfo } from '../../../files/domain/models/FilePaginationInfo'
import { DatasetPaginationInfo } from '../../../dataset/domain/models/DatasetPaginationInfo'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  onPaginationInfoChange: (
    paginationInfo: PaginationInfo<DatasetPaginationInfo | FilePaginationInfo>
  ) => void
  initialPaginationInfo: PaginationInfo<DatasetPaginationInfo | FilePaginationInfo>
  showPageSizeSelector?: boolean
  updateQueryParam?: boolean
}
const NO_PAGES = 0
export function PaginationControls({
  onPaginationInfoChange,
  initialPaginationInfo,
  showPageSizeSelector = true,
  updateQueryParam = false
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [paginationInfo, setPaginationInfo] = useState<DatasetPaginationInfo | FilePaginationInfo>(
    initialPaginationInfo
  )
  const goToPage = (newPage: number) => {
    setPaginationInfo(paginationInfo.goToPage(newPage))
  }
  const goToPreviousPage = () => {
    setPaginationInfo(paginationInfo.goToPreviousPage())
  }
  const goToNextPage = () => {
    setPaginationInfo(paginationInfo.goToNextPage())
  }
  const setPageSize = (newPageSize: number) => {
    setPaginationInfo(paginationInfo.withPageSize(newPageSize))
  }

  useEffect(() => {
    onPaginationInfoChange(paginationInfo)
  }, [paginationInfo.pageSize])

  useEffect(() => {
    onPaginationInfoChange(paginationInfo)
    updateQueryParam && setSearchParams({ page: paginationInfo.page.toString() })
  }, [paginationInfo.page])

  useEffect(() => {
    setPaginationInfo(paginationInfo.withTotal(initialPaginationInfo.totalItems))
  }, [initialPaginationInfo.totalItems])

  if (paginationInfo.totalPages === NO_PAGES) {
    return <></>
  }
  return (
    <Row className={styles.row}>
      <Col md="auto">
        <div className={styles.container}>
          <Pagination>
            <Pagination.First
              onClick={() => goToPage(1)}
              disabled={!paginationInfo.hasPreviousPage}
            />
            <Pagination.Prev
              onClick={() => goToPreviousPage()}
              disabled={!paginationInfo.hasPreviousPage}
            />
            <PageNumbersButtonsWithEllipsis
              selectedPageIndex={paginationInfo.page - 1}
              pageCount={paginationInfo.totalPages}
              goToPage={goToPage}
            />
            <Pagination.Next
              onClick={() => goToNextPage()}
              disabled={!paginationInfo.hasNextPage}
            />
            <Pagination.Last
              onClick={() => goToPage(paginationInfo.totalPages)}
              disabled={!paginationInfo.hasNextPage}
            />
          </Pagination>
          {showPageSizeSelector && (
            <PageSizeSelector
              itemName={paginationInfo.itemName}
              pageSize={paginationInfo.pageSize}
              setPageSize={setPageSize}
            />
          )}
        </div>
      </Col>
    </Row>
  )
}
