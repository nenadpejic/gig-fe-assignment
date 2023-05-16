import { getData } from 'country-list'
import { FormikHelpers, FormikValues, useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import ContactsList from '../components/ContactsList'
import Dialog from '../components/Dialog'
import BasicField from '../components/Form/BasicField'
import BasicForm from '../components/Form/BasicForm'
import FormikField from '../components/Form/FormikField'
import FormikForm from '../components/Form/FormikForm'
import {
  Contact,
  NewContact,
  addContact,
  deleteContact,
  editContact,
  getAllContacts,
  queryContacts,
} from '../lib/localforage'
import { addNewContactSchema } from '../lib/yup'

const Dashboard = () => {
  const countryList = useMemo(() => getData(), [])
  const [query, setQuery] = useState<string>('')
  const [queriedContacts, setQueriedContacts] = useState<Contact[]>([])

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      country: '',
    },
    validationSchema: addNewContactSchema,
    onSubmit: async (values, actions) => {
      try {
        const editedContact = await editContact(values)
        setQueriedContacts((prev) =>
          prev.map((contact) =>
            contact.id === editedContact.id ? editedContact : contact,
          ),
        )
      } catch (err) {
        console.error(err)
      }

      actions.resetForm()
    },
  })

  useEffect(() => {
    getAllContacts()
      .then((res) => {
        if (!res) return
        setQueriedContacts(res)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleSubmitAddNewContact = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => {
    try {
      const addedContact = await addContact(values as NewContact)
      if (!addedContact.firstName.toLowerCase().includes(query.toLowerCase()))
        return
      setQueriedContacts((prev) => [...prev, addedContact])
    } catch (err) {
      console.error(err)
    }
    actions.resetForm()
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
    setValues(contact)
  }

  return (
    <>
      <h2>Dashboard</h2>

      <StyledAddContactForm
        name="Add Contact"
        submitLabel="Add"
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          country: '',
        }}
        validationSchema={addNewContactSchema}
        onSubmit={handleSubmitAddNewContact}
      >
        <FormikField
          label="First Name"
          name="firstName"
          placeholder="Enter your first name"
          type="text"
        />

        <FormikField
          label="Last Name"
          name="lastName"
          placeholder="Enter your last name"
          type="text"
        />

        <FormikField
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="text"
        />

        <FormikField as="select" label="Country" name="country">
          <option value="">--Select Country--</option>
          {countryList.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </FormikField>
      </StyledAddContactForm>

      <StyledQueryContactsForm name="Query Contacts">
        <BasicField
          label="First Name"
          name="query"
          placeholder="Query by first name"
          type="text"
          value={query}
          onChange={(e) => handleChangeFirstNameQuery(e.target.value)}
        />
      </StyledQueryContactsForm>

      <StyledContactsList
        contacts={queriedContacts}
        onEdit={(c) => handleEditContact(c)}
        onDelete={(id) => handleDeleteContact(id)}
      />

      <Dialog isOpen={!!values.id}>
        <BasicForm
          name="Edit Contact"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        >
          <BasicField
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            type="text"
            value={values.firstName}
            meta={{ error: errors.firstName, touched: touched.firstName }}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <BasicField
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            type="text"
            value={values.lastName}
            meta={{ error: errors.lastName, touched: touched.lastName }}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <BasicField
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="text"
            value={values.email}
            meta={{ error: errors.email, touched: touched.email }}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <BasicField
            as="select"
            label="Country"
            name="country"
            value={values.country}
            meta={{ error: errors.country, touched: touched.country }}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">--Select Country--</option>
            {countryList.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </BasicField>

          <button
            type="button"
            onClick={() => {
              resetForm()
            }}
          >
            Close
          </button>
        </BasicForm>
      </Dialog>
    </>
  )
}

export default Dashboard

const StyledAddContactForm = styled(FormikForm)`
  margin-top: ${({ theme }) => theme.space.m};
`

const StyledQueryContactsForm = styled(BasicForm)`
  margin-top: ${({ theme }) => theme.space.m};
`

const StyledContactsList = styled(ContactsList)`
  margin-top: ${({ theme }) => theme.space.s};
`
