import { Form, Formik, FormikHelpers, FormikValues } from 'formik'
import { ReactNode } from 'react'
import BasicForm from './BasicForm'

type FormikFormProps = {
  initialValues: FormikValues
  name?: string
  children?: ReactNode
  submitLabel?: string
  validationSchema?: any
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void | Promise<any>
}

const FormikForm = ({
  name,
  children,
  submitLabel,
  validationSchema,
  initialValues,
  onSubmit,
  ...props
}: FormikFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => {
        return (
          <BasicForm
            as={Form}
            name={name}
            submitLabel={submitLabel}
            isSubmitting={isSubmitting}
            {...props}
          >
            {children}
          </BasicForm>
        )
      }}
    </Formik>
  )
}

export default FormikForm
