import { FileMother } from '../../../files/domain/models/FileMother'
import { DatasetFiles } from '../../../../../src/sections/dataset/dataset-files/DatasetFiles'
import { FileRepository } from '../../../../../src/files/domain/repositories/FileRepository'
import {
  FileAccessOption,
  FileCriteria,
  FileSortByOption,
  FileTag
} from '../../../../../src/files/domain/models/FileCriteria'
import { FilesCountInfoMother } from '../../../files/domain/models/FilesCountInfoMother'
import { FilePaginationInfo } from '../../../../../src/files/domain/models/FilePaginationInfo'
import { FileSize, FileSizeUnit, FileType } from '../../../../../src/files/domain/models/File'
import styles from '../../../../../src/sections/dataset/dataset-files/files-table/FilesTable.module.scss'
import { DatasetMother } from '../../../dataset/domain/models/DatasetMother'
import { SettingMother } from '../../../settings/domain/models/SettingMother'
import { ZipDownloadLimit } from '../../../../../src/settings/domain/models/ZipDownloadLimit'
import { SettingsProvider } from '../../../../../src/sections/settings/SettingsProvider'
import { SettingRepository } from '../../../../../src/settings/domain/repositories/SettingRepository'

const testFiles = FileMother.createMany(10)
const datasetPersistentId = 'test-dataset-persistent-id'
const datasetVersion = DatasetMother.create().version
const fileRepository: FileRepository = {} as FileRepository
const testFilesCountInfo = FilesCountInfoMother.create({
  total: 200,
  perFileType: [
    {
      type: new FileType('text'),
      count: 5
    },
    {
      type: new FileType('image'),
      count: 485
    }
  ],
  perAccess: [
    { access: FileAccessOption.PUBLIC, count: 222 },
    { access: FileAccessOption.RESTRICTED, count: 10 }
  ],
  perFileTag: [
    { tag: new FileTag('document'), count: 5 },
    { tag: new FileTag('code'), count: 10 }
  ]
})
const filePaginationInfo = new FilePaginationInfo(1, 10, 200)
const settingsRepository = {} as SettingRepository
describe('DatasetFiles', () => {
  beforeEach(() => {
    fileRepository.getAllByDatasetPersistentId = cy.stub().resolves(testFiles)
    fileRepository.getFilesCountInfoByDatasetPersistentId = cy.stub().resolves(testFilesCountInfo)
    fileRepository.getFilesTotalDownloadSizeByDatasetPersistentId = cy.stub().resolves(19900)

    settingsRepository.getByName = cy
      .stub()
      .resolves(SettingMother.createZipDownloadLimit(new ZipDownloadLimit(1, FileSizeUnit.BYTES)))
  })

  it('renders the files table', () => {
    cy.customMount(
      <DatasetFiles
        filesRepository={fileRepository}
        datasetPersistentId={datasetPersistentId}
        datasetVersion={datasetVersion}
      />
    )

    cy.findByRole('table').should('exist')
    cy.findByRole('columnheader', { name: /Files/ }).should('exist')
  })

  describe('Pagination navigation', () => {
    it('renders the files table with the correct header on a page different than the first one ', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByRole('button', { name: '6' }).click()

      cy.findByRole('columnheader', { name: '51 to 60 of 200 Files' }).should('exist')
    })

    it('renders the files table with the correct page selected after updating the pageSize', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByRole('button', { name: '3' }).click()

      cy.findByRole('columnheader', { name: '21 to 30 of 200 Files' }).should('exist')

      cy.findByLabelText('Files per page').select('25')

      cy.findByRole('columnheader', { name: '26 to 50 of 200 Files' }).should('exist')
    })

    it('renders the files table with the correct header with a different page size ', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByLabelText('Files per page').select('50')
      cy.findByRole('button', { name: '3' }).click()

      cy.findByRole('columnheader', { name: '101 to 150 of 200 Files' }).should('exist')
    })

    it('maintains the selection when the page changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )
      cy.findByRole('columnheader', { name: '1 to 10 of 200 Files' }).should('exist')

      cy.get('table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=checkbox]').click()
      cy.get('table > tbody > tr:nth-child(2)').should('have.class', styles['selected-row'])

      cy.findByText('1 file is currently selected.').should('exist')

      cy.findByRole('button', { name: 'Next' }).click()
      cy.findByRole('columnheader', { name: '11 to 20 of 200 Files' }).should('exist')

      cy.get('table > tbody > tr:nth-child(2)').should('not.have.class', styles['selected-row'])

      cy.findByText('1 file is currently selected.').should('exist')

      cy.get('table > tbody > tr:nth-child(3) > td:nth-child(1) > input[type=checkbox]').click()
      cy.get('table > tbody > tr:nth-child(3)').should('have.class', styles['selected-row'])

      cy.findByText('2 files are currently selected.').should('exist')

      cy.findByRole('button', { name: 'Previous' }).click()
      cy.findByRole('columnheader', { name: '1 to 10 of 200 Files' }).should('exist')

      cy.get('table > tbody > tr:nth-child(2)').should('have.class', styles['selected-row'])
    })

    it('maintains the selection when the page size changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )
      cy.findByRole('columnheader', { name: '1 to 10 of 200 Files' }).should('exist')

      cy.get('table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=checkbox]').click()
      cy.get('table > tbody > tr:nth-child(2)').should('have.class', styles['selected-row'])

      cy.findByText('1 file is currently selected.').should('exist')

      cy.findByLabelText('Files per page').select('25')

      cy.findByRole('columnheader', { name: '1 to 25 of 200 Files' }).should('exist')

      cy.get('table > tbody > tr:nth-child(2)').should('have.class', styles['selected-row'])

      cy.findByText('1 file is currently selected.').should('exist')
    })

    it('renders the zip download limit message when selecting rows from different pages', () => {
      testFiles[1] = FileMother.create({
        size: new FileSize(1, FileSizeUnit.BYTES)
      })

      testFiles[2] = FileMother.create({
        size: new FileSize(2, FileSizeUnit.BYTES)
      })

      cy.customMount(
        <SettingsProvider repository={settingsRepository}>
          <DatasetFiles
            filesRepository={fileRepository}
            datasetPersistentId={datasetPersistentId}
            datasetVersion={datasetVersion}
          />
        </SettingsProvider>
      )

      cy.get('table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=checkbox]').click()
      cy.findByRole('button', { name: 'Next' }).click()
      cy.get('table > tbody > tr:nth-child(3) > td:nth-child(1) > input[type=checkbox]').click()

      cy.findByText(
        'The overall size of the files selected (3.0 B) for download exceeds the zip limit of 1.0 B. Please unselect some files to continue.'
      ).should('exist')

      cy.get('table > tbody > tr:nth-child(3) > td:nth-child(1) > input[type=checkbox]').click()

      cy.findByText(
        /exceeds the zip limit of 1.0 B. Please unselect some files to continue./
      ).should('not.exist')
    })

    it('renders the zip download limit message when selecting all rows', () => {
      cy.customMount(
        <SettingsProvider repository={settingsRepository}>
          <DatasetFiles
            filesRepository={fileRepository}
            datasetPersistentId={datasetPersistentId}
            datasetVersion={datasetVersion}
          />
        </SettingsProvider>
      )

      cy.get('table > thead > tr > th > input[type=checkbox]').click()
      cy.findByRole('button', { name: 'Select all 200 files in this dataset.' }).click()
      cy.findByText(
        'The overall size of the files selected (19.4 KB) for download exceeds the zip limit of 1.0 B. Please unselect some files to continue.'
      ).should('exist')
    })

    it('renders the zip download limit message when selecting all rows and then navigating to other page', () => {
      cy.customMount(
        <SettingsProvider repository={settingsRepository}>
          <DatasetFiles
            filesRepository={fileRepository}
            datasetPersistentId={datasetPersistentId}
            datasetVersion={datasetVersion}
          />
        </SettingsProvider>
      )

      cy.get('table > thead > tr > th > input[type=checkbox]').click()
      cy.findByRole('button', { name: 'Select all 200 files in this dataset.' }).click()
      cy.findByRole('button', { name: 'Last' }).click()
      cy.findByText(
        'The overall size of the files selected (19.4 KB) for download exceeds the zip limit of 1.0 B. Please unselect some files to continue.'
      ).should('exist')
    })
  })

  describe('Calling use cases', () => {
    it('calls the useFiles hook with the correct parameters', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.wrap(fileRepository.getAllByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion
      )

      cy.wrap(fileRepository.getFilesCountInfoByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion
      )
    })

    it('calls the useFiles hook with the correct parameters when sortBy criteria changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByRole('button', { name: /Sort/ }).click()
      cy.findByText('Name (A-Z)').should('exist').click()
      cy.wrap(fileRepository.getAllByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion,
        filePaginationInfo,
        new FileCriteria().withSortBy(FileSortByOption.NAME_AZ)
      )
    })

    it('calls the useFiles hook with the correct parameters when filterByType criteria changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByRole('button', { name: 'File Type: All' }).click()
      cy.findByText('Image (485)').should('exist').click()
      cy.wrap(fileRepository.getAllByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion,
        filePaginationInfo,
        new FileCriteria().withFilterByType('image')
      )
    })

    it('calls the useFiles hook with the correct parameters when filterByAccess criteria changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByRole('button', { name: 'Access: All' }).click()
      cy.findByText('Public (222)').should('exist').click()
      cy.wrap(fileRepository.getAllByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion,
        filePaginationInfo,
        new FileCriteria().withFilterByAccess(FileAccessOption.PUBLIC)
      )
    })

    it('calls the useFiles hook with the correct parameters when filterByTag criteria changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByRole('button', { name: 'File Tags: All' }).click()
      cy.findByText('Document (5)').should('exist').click()
      cy.wrap(fileRepository.getAllByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion,
        filePaginationInfo,
        new FileCriteria().withFilterByTag('document')
      )
    })

    it('calls the useFiles hook with the correct parameters when searchText criteria changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByLabelText('Search').type('test{enter}')
      cy.wrap(fileRepository.getAllByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion,
        filePaginationInfo,
        new FileCriteria().withSearchText('test')
      )
    })

    it('calls the useFiles hook with the correct parameters when paginationInfo changes', () => {
      cy.customMount(
        <DatasetFiles
          filesRepository={fileRepository}
          datasetPersistentId={datasetPersistentId}
          datasetVersion={datasetVersion}
        />
      )

      cy.findByRole('button', { name: '5' }).click()
      cy.wrap(fileRepository.getAllByDatasetPersistentId).should(
        'be.calledWith',
        datasetPersistentId,
        datasetVersion,
        new FilePaginationInfo(5, 10, 200)
      )
    })
  })
})
