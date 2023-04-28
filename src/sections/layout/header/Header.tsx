import logo from '../../assets/logo.svg'
import { useTranslation } from 'react-i18next'
import { Navbar } from 'dataverse-ui-lib'
import { Route } from '../../route.enum'

type User = {
  name: string
}

interface HeaderProps {
  user?: User
}

export function Header({ user }: HeaderProps) {
  const { t } = useTranslation('header')

  return (
    <Navbar
      brand={{
        title: t('brandTitle'),
        href: Route.HOME,
        logoImgSrc: logo
      }}>
      {user ? (
        <Navbar.Dropdown title={user.name} id="dropdown-user">
          <Navbar.Dropdown.Item href={Route.LOG_OUT}>{t('logOut')}</Navbar.Dropdown.Item>
        </Navbar.Dropdown>
      ) : (
        <>
          <Navbar.Link href={Route.LOG_IN}>{t('logIn')}</Navbar.Link>
          <Navbar.Link href={Route.SIGN_UP}>{t('signUp')}</Navbar.Link>
        </>
      )}
    </Navbar>
  )
}
