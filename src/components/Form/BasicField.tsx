import styled from 'styled-components'

export type BasicFieldProps = {
  label?: string
  meta?: {
    error?: string
    touched?: boolean
  }
  as?: 'input' | 'select'
} & React.InputHTMLAttributes<HTMLInputElement>

const BasicField = ({ label, meta, children, ...props }: BasicFieldProps) => {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}

      <StyledInput meta={meta} {...props}>
        {children}
      </StyledInput>

      {meta?.error && meta?.touched && (
        <ErrorMessage>{meta?.error}</ErrorMessage>
      )}
    </>
  )
}

export default BasicField

const StyledLabel = styled.label`
  display: block;
  margin-top: ${({ theme }) => theme.space.s};
`

const StyledInput = styled.input<Pick<BasicFieldProps, 'meta'>>`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.space.s};
  ${({ meta, theme }) => {
    return (
      meta?.error && meta?.touched && `border: 2px solid ${theme.colors.error};`
    )
  }}
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-top: ${({ theme }) => theme.space.xs};
`
