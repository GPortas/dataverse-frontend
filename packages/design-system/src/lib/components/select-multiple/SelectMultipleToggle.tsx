import { ForwardedRef, forwardRef } from 'react'
import { Dropdown as DropdownBS, Button as ButtonBS } from 'react-bootstrap'
import { X as CloseIcon } from 'react-bootstrap-icons'
import styles from './SelectMultiple.module.scss'

interface SelectMultipleToggleProps {
  selectedOptions: string[]
  handleRemoveSelectedOption: (option: string) => void
  isInvalid?: boolean
  isDisabled?: boolean
  ariaLabelledby?: string
}

export const SelectMultipleToggle = forwardRef(
  (
    {
      selectedOptions,
      handleRemoveSelectedOption,
      isInvalid,
      isDisabled,
      ariaLabelledby
    }: SelectMultipleToggleProps,
    ref: ForwardedRef<HTMLElement | null>
  ) => {
    return (
      <DropdownBS.Toggle
        as="header"
        tabIndex={0}
        ref={ref}
        aria-labelledby={ariaLabelledby}
        aria-disabled={isDisabled}
        className={`${styles['select-multiple-toggle']} ${isInvalid ? styles['invalid'] : ''} ${
          isDisabled ? styles['disabled'] : ''
        }`}>
        {selectedOptions.length > 0 ? (
          <div className={styles['selected-options-container']}>
            {selectedOptions.map((selectedOption) => (
              <div
                className={styles['selected-options-container__item']}
                onClick={(e) => e.stopPropagation()}
                key={`selected-option-${selectedOption}`}>
                <span className="me-2">{selectedOption}</span>
                <ButtonBS
                  variant="primary"
                  className="rounded-circle p-0"
                  onClick={() => handleRemoveSelectedOption(selectedOption)}
                  aria-label="Remove selected option">
                  <div style={{ display: 'grid', placeContent: 'center' }}>
                    <CloseIcon size={14} />
                  </div>
                </ButtonBS>
              </div>
            ))}
          </div>
        ) : (
          'Select...'
        )}
      </DropdownBS.Toggle>
    )
  }
)

SelectMultipleToggle.displayName = 'SelectMultipleToggle'
