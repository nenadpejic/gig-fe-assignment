import { useField } from 'formik'
import BasicField, { BasicFieldProps } from './BasicField'

type FormFieldProps = {
  name: string
} & BasicFieldProps

const FormikField = ({ children, name, ...props }: FormFieldProps) => {
  const [field, meta, helpers] = useField(name)

  return (
    <BasicField meta={meta} {...props} {...field}>
      {children}
    </BasicField>
  )
}

export default FormikField
