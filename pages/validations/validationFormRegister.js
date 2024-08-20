import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'First Name must contain only letters')
        .trim('First Name cannot start or end with spaces')
        .strict(true)
        .max(20, 'First Name must be 20 characters or less')
        .required('First Name is required'),

    surname: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Last Name must contain only letters')
        .trim('Last Name cannot start or end with spaces')
        .strict(true)
        .max(20, 'Last Name must be 20 characters or less')
        .required('Last Name is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    password: Yup.string()
        .max(12, 'Password must be 12 characters or less')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});