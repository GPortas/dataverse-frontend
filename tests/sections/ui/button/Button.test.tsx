import { fireEvent, render } from '@testing-library/react'
import { Button } from '../../../../packages/dataverse-ui-lib/src/lib/button/Button'
import { vi } from 'vitest'
import { Icon } from '../../../../packages/dataverse-ui-lib/src/lib/icon.enum'

describe('Button', () => {
  const clickMeText = 'Click me'

  it('renders a button with the correct text', () => {
    const { getByText } = render(<Button>{clickMeText}</Button>)

    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('renders an icon when provided', () => {
    const { getByRole } = render(<Button icon={Icon.COLLECTION}>{clickMeText}</Button>)
    expect(getByRole('img', { name: Icon.COLLECTION })).toBeInTheDocument()
  })

  it('calls the onClick function when the button is clicked', () => {
    const handleClick = vi.fn()
    const { getByText } = render(<Button onClick={handleClick}>{clickMeText}</Button>)

    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables the button when isDisabled prop is true', () => {
    const { getByText } = render(<Button disabled>{clickMeText}</Button>)
    const button = getByText('Click me')

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('does not call the onClick function when the button is disabled', () => {
    const handleClick = vi.fn()
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        {clickMeText}
      </Button>
    )

    fireEvent.click(getByText('Click me'))
    expect(handleClick).not.toHaveBeenCalledTimes(1)
  })
})
