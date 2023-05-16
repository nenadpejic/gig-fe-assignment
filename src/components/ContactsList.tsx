import React from 'react'
import styled from 'styled-components'
import { Contact } from '../lib/localforage'

type ContactsListProps = {
  contacts: Contact[]
  onEdit?: (contact: Contact) => void
  onDelete?: (id: string) => void
}

const ContactsList = ({
  contacts,
  onEdit,
  onDelete,
  ...rest
}: ContactsListProps) => {
  return (
    <ul {...rest}>
      {contacts.map((contact, i) => {
        const { country, email, firstName, id, lastName } = contact

        return (
          <React.Fragment key={id}>
            {!!i && <Divider />}

            <ListItem>
              <p>
                {firstName} {lastName}, {email}, {country}
              </p>

              {(onEdit || onDelete) && (
                <span>
                  {onEdit && (
                    <button onClick={() => onEdit(contact)}>Edit</button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(id)}>Delete</button>
                  )}
                </span>
              )}
            </ListItem>
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default ContactsList

const Divider = styled.hr`
  margin: ${({ theme }) => theme.space.xs} 0;
`
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;

  span {
    display: flex;
    gap: ${({ theme }) => theme.space.xs};

    button {
      padding: ${({ theme }) => theme.space.xs};
    }
  }
`
