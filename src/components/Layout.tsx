import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Layout = () => {
  return (
    <>
      <nav>
        <NavigationList>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </NavigationList>
      </nav>

      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout

const NavigationList = styled.ul`
  list-style: none;
  display: flex;
  gap: ${({ theme }) => theme.space.m};
  padding: ${({ theme }) => theme.space.l};
`
const Container = styled.div`
  margin: auto;
  max-width: 400px;
  padding: ${({ theme }) => theme.space.m};
`
