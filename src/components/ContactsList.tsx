import React from 'react'
import styled from 'styled-components'

type Contact = {
  firstName: string
  lastName: string
  email: string
  country: string
}

type ContactsListProps = {
  contacts: Contact[]
  onEdit?: () => void
  onDelete?: () => void
}

const ContactsList = ({
  contacts,
  onEdit,
  onDelete,
  ...rest
}: ContactsListProps) => {
  return (
    <List {...rest}>
      {contacts.map((contact, i) => (
        <React.Fragment key={i}>
          {!!i && <hr />}

          <li>
            <p>
              {contact.firstName} {contact.lastName}, {contact.email},{' '}
              {contact.country}
            </p>

            {(onEdit || onDelete) && (
              <span>
                {onEdit && <button onClick={onEdit}>Edit</button>}
                {onDelete && <button onClick={onDelete}>Delete</button>}
              </span>
            )}
          </li>
        </React.Fragment>
      ))}
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
