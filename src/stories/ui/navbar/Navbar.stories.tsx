import type { Meta, StoryObj } from '@storybook/react'
import { WithI18next } from '../../WithI18next'
import { Navbar } from '../../../sections/ui/navbar/Navbar'
import logo from '../../../sections/ui/logo.svg'
import { CanvasFixedHeight } from '../CanvasFixedHeight'

const meta: Meta<typeof Navbar> = {
  title: 'UI/Navbar',
  component: Navbar,
  decorators: [WithI18next]
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  render: () => (
    <CanvasFixedHeight height={150}>
      <Navbar
        brand={{ logo: { src: logo, altText: 'logo' }, title: 'Brand Title', path: '#' }}
        links={[
          { title: 'Link 1 ', value: '#' },
          { title: 'Link 2', value: '#' },
          {
            title: 'Dropdown 1',
            value: [
              { title: 'Link 3 ', value: '#' },
              { title: 'Link 4', value: '#' }
            ]
          },
          {
            title: 'Dropdown 2',
            value: [
              { title: 'Link 5 ', value: '#' },
              { title: 'Link 6', value: '#' }
            ]
          }
        ]}
      />
    </CanvasFixedHeight>
  )
}

export const Menu: Story = {
  render: () => (
    <CanvasFixedHeight height={150}>
      <Navbar
        brand={{ logo: { src: logo, altText: 'logo' }, title: 'Dataverse', path: '#' }}
        links={[
          { title: 'Sign Up', value: '#' },
          { title: 'Log In', value: '#' }
        ]}
      />
    </CanvasFixedHeight>
  )
}
