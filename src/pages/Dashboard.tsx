import { getData } from 'country-list'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import ContactsList from '../components/ContactsList'
import {
  Contact,
  NewContact,
  addContact,
  deleteContact,
  editContact,
  getAllContacts,
  queryContacts,
} from '../lib/localforage'

const Dashboard = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const countryList = useMemo(() => getData(), [])
  const [query, setQuery] = useState<string>('')
  const [queriedContacts, setQueriedContacts] = useState<Contact[]>([])
  const [editContactFormData, setEditContactFormData] = useState<Contact>({
    country: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
  })

  useEffect(() => {
    getAllContacts()
      .then((res) => {
        if (!res) return
        setQueriedContacts(res)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleSubmitAddNewContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newContact = [...e.currentTarget.elements].reduce<NewContact>(
      (data, element) => {
        if (
          (element instanceof HTMLInputElement ||
            element instanceof HTMLSelectElement) &&
          element.name
        ) {
          const { name, value } = element
          return { ...data, [name]: value }
        }
        return data
      },
      { firstName: '', lastName: '', email: '', country: '' },
    )

    addContact(newContact)
      .then((addedContact) => {
        if (!addedContact.firstName.toLowerCase().includes(query.toLowerCase()))
          return
        setQueriedContacts((prev) => [...prev, addedContact])
      })
      .catch((err) => console.error(err))
  }

  const handleChangeFirstNameQuery = (value: string) => {
    setQuery(value)
    queryContacts('firstName', value)
      .then((res) => {
        if (!res) return
        setQueriedContacts(res)
      })
      .catch((err) => console.error(err))
  }

  const handleDeleteContact = (id: string) => {
    deleteContact(id)
      .then(() => {
        setQueriedContacts((prev) => prev.filter((c) => c.id !== id))
      })
      .catch((err) => console.error(err))
  }

  const handleEditContact = (contact: Contact) => {
    setEditContactFormData(contact)
    dialogRef.current?.showModal()
  }

  const handleSubmitEditContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    editContact(editContactFormData)
      .then((editedContact) => {
        setQueriedContacts((prev) =>
          prev.map((contact) =>
            contact.id === editedContact.id ? editedContact : contact,
          ),
        )
        dialogRef.current?.close()
      })
      .catch((err) => console.error(err))
  }

  const handleChangeEditContactForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setEditContactFormData((p) => {
      return {
        ...p,
        [name]: value,
      }
    })
  }

  return (
    <>
      <h2>Dashboard</h2>

      <FormName>Add new contact</FormName>
      <Form onSubmit={handleSubmitAddNewContact}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" />

        <label htmlFor="country">Country</label>
        <select id="country" name="country">
          <option value="">--Select Country--</option>
          {countryList.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </Form>

      <FormName>Query contacts</FormName>
      <Form>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={query}
          onChange={(e) => handleChangeFirstNameQuery(e.target.value)}
        />
      </Form>

      <StyledContactsList
        contacts={queriedContacts}
        onEdit={(c) => handleEditContact(c)}
        onDelete={(id) => handleDeleteContact(id)}
      />

      <Dialog ref={dialogRef}>
        <h3>Edit contact</h3>
        <Form onSubmit={handleSubmitEditContact}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={editContactFormData?.firstName}
            onChange={handleChangeEditContactForm}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={editContactFormData?.lastName}
            onChange={handleChangeEditContactForm}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={editContactFormData?.email}
            onChange={handleChangeEditContactForm}
          />

          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={editContactFormData?.country}
            onChange={handleChangeEditContactForm}
          >
            <option value="">--Select Country--</option>
            {countryList.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <button type="submit">Edit</button>
          <button type="button" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </Form>
      </Dialog>
    </>
  )
}

export default Dashboard

const FormName = styled.h3`
  margin-top: ${({ theme }) => theme.space.m};
`

const Form = styled.form`
  margin-top: ${({ theme }) => theme.space.s};
  max-width: 400px;

  label {
    display: block;
    margin-top: ${({ theme }) => theme.space.s};
  }
  input,
  select {
    display: block;
    width: 100%;
    padding: ${({ theme }) => theme.space.s};
  }
  button {
    display: block;
    width: 100%;
    padding: ${({ theme }) => theme.space.xs};
    margin-top: ${({ theme }) => theme.space.s};
  }
`

const StyledContactsList = styled(ContactsList)`
  margin-top: ${({ theme }) => theme.space.s};
`

const Dialog = styled.dialog`
  margin: auto;
  padding: ${({ theme }) => theme.space.m};
`
