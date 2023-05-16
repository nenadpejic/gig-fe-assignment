import { getCodes } from 'country-list'
import * as yup from 'yup'

export const addNewContactSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, 'First Name must be at least 3 characters long')
    .required('Required'),
  lastName: yup
    .string()
    .min(3, 'Last Name must be at least 3 characters long')
    .required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  country: yup
    .string()
    .oneOf(getCodes(), 'Invalid Job Type')
    .required('Required'),
})
