import { ComponentType, ReactNode } from 'react'
import styled from 'styled-components'

export type BasicFormProps = {
  name?: string
  children?: ReactNode
  submitLabel?: string
  isSubmitting?: boolean
  as?: 'form' | ComponentType
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const BasicForm = ({
  name,
  children,
  submitLabel = 'Submit',
  isSubmitting,
  as,
  onSubmit,
  ...props
}: BasicFormProps) => {
  return (
    <StyledFormikForm as={as} {...(onSubmit ? { onSubmit } : {})} {...props}>
      {name && <h3>{name}</h3>}

      {children}

      {isSubmitting !== undefined && (
        <button disabled={isSubmitting} type="submit">
          {submitLabel}
        </button>
      )}
    </StyledFormikForm>
  )
}

export default BasicForm

const StyledFormikForm = styled.form`
  max-width: 400px;

  button {
    display: block;
    width: 100%;
    padding: ${({ theme }) => theme.space.xs};
    margin-top: ${({ theme }) => theme.space.s};
  }
`
