import { ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'

type DialogProps = {
  children?: ReactNode
  isOpen: boolean
}

const Dialog = ({ children, isOpen }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (!dialogRef.current) return

    if (isOpen) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [isOpen])

  return <StyledDialog ref={dialogRef}>{children}</StyledDialog>
}

export default Dialog

const StyledDialog = styled.dialog`
  margin: auto;
  padding: ${({ theme }) => theme.space.m};
`
