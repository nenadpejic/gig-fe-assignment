import { useRef } from 'react'
import styled from 'styled-components'
import ContactsList from '../components/ContactsList'
import contacts from '../example-contacts-data.json'

const Dashboard = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  return (
    <>
      <h2>Dashboard</h2>

      <Heading>Add new contact</Heading>
      <Form>
        <label htmlFor="fistname">First Name</label>
        <input id="fistname" name="fistname" type="text" />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" />

        <label htmlFor="country">Country</label>
        <select id="country" name="country">
          <option value="">--Select Country--</option>
          <option value="IS">Iceland</option>
          <option value="TW">Taiwan</option>
        </select>

        <button type="submit">Add</button>
      </Form>

      <Heading>Query contacts</Heading>
      <Form>
        <label htmlFor="fistname">First Name</label>
        <input id="fistname" name="fistname" type="text" />

        <button type="submit">Query</button>
      </Form>

      <StyledContactsList
        contacts={contacts}
        onEdit={() => {
          dialogRef.current?.showModal()
          console.log('edit')
        }}
        onDelete={() => console.log('delete')}
      />

      <Dialog ref={dialogRef}>
        <h3>Edit contact</h3>
        <Form
          onSubmit={(e) => {
            e.preventDefault()

            dialogRef.current?.close()
          }}
        >
          <label htmlFor="fistname">First Name</label>
          <input id="fistname" name="fistname" type="text" />

          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />

          <label htmlFor="country">Country</label>
          <select id="country" name="country">
            <option value="">--Select Country--</option>
            <option value="IS">Iceland</option>
            <option value="TW">Taiwan</option>
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

const Heading = styled.h3`
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