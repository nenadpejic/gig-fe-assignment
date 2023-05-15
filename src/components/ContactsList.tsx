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
    <List {...rest}>
      {contacts.map((contact, i) => {
        const { country, email, firstName, id, lastName } = contact

        return (
          <React.Fragment key={id}>
            {!!i && <hr />}

            <li>
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
            </li>
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default ContactsList

const List = styled.ul`
  max-width: 400px;

  hr {
    margin: ${({ theme }) => theme.space.xs} 0;
  }

  li {
    display: flex;
    justify-content: space-between;

    span {
      display: flex;
      gap: ${({ theme }) => theme.space.xs};

      button {
        padding: ${({ theme }) => theme.space.xs};
      }
    }
  }
`
