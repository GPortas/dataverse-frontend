import { Alert } from '@iqss/dataverse-design-system'
import { DatasetAlert } from '../../../dataset/domain/models/Dataset'
import { useTranslation } from 'react-i18next'
import styles from './DatasetAlerts.module.scss'
import parse from 'html-react-parser'

interface DatasetAlertsProps {
  alerts: DatasetAlert[]
}

export function DatasetAlerts({ alerts }: DatasetAlertsProps) {
  const { t } = useTranslation('dataset')

  return (
    <div className={styles.container}>
      {alerts.map((alert: DatasetAlert) => {
        const translatedHTML = alert.dynamicFields
          ? t(`alerts.${alert.message}`, alert.dynamicFields)
          : t(`alerts.${alert.message}`)

        return (
          <Alert variant={alert.variant} customHeading={alert.customHeading} dismissible={false}>
            {parse(translatedHTML)}
          </Alert>
        )
      })}
    </div>
  )
}
