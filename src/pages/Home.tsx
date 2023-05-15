import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContactsList from '../components/ContactsList'
import { Contact, getAllContacts } from '../lib/localforage'

const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    getAllContacts()
      .then((res) => {
        if (!res) return
        setContacts(res)
      })
      .catch((err) => console.error(err))
  }, [])

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
