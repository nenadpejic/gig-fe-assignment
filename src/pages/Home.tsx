import styled from 'styled-components'
import contacts from '../example-contacts-data.json'
import ContactsList from '../components/ContactsList'

const Home = () => {
  return (
    <>
      <h2>Home</h2>

      <StyledContactsList contacts={contacts} />
    </>
  )
}

export default Home

const StyledContactsList = styled(ContactsList)`
  margin-top: ${({ theme }) => theme.space.s};
`
