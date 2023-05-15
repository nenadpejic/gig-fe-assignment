import localforage from 'localforage'
import { nanoid } from 'nanoid'

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  country: string
}

export type NewContact = Omit<Contact, 'id'>

export const getAllContacts = async () => {
  const contacts: Contact[] = []
  return localforage
    .iterate((contact: Contact) => {
      contacts.push(contact)
    })
    .then(() => contacts)
    .catch((err) => console.error(err))
}

export const addContact = async (newContact: NewContact) => {
  const id = nanoid()
  return localforage.setItem(id, { ...newContact, id })
}

export const queryContacts = async (index: keyof Contact, query: string) => {
  const contacts: Contact[] = []
  return localforage
    .iterate((contact: Contact) => {
      if (contact[index].toLowerCase().includes(query.toLowerCase())) {
        contacts.push(contact)
      }
    })
    .then(() => contacts)
    .catch((err) => console.error(err))
}

export const deleteContact = async (id: string) => localforage.removeItem(id)

export const editContact = async (contact: Contact) =>
  localforage.setItem(contact.id, contact)
