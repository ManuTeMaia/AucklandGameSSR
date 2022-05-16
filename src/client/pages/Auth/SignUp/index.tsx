import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import useForm from 'client/hooks/useForm'
import { SignUpForm } from './types'
import { initialState, TextFieldsSignUp } from './shared'
import TextInput from 'components/inputs'
import Form from 'components/form'
import { RouterPath } from '@shared/consts'
import HomePageWrap from 'components/homePageWrap'
import { useAppDispatch } from 'src/client'
import { signUp } from '../actions'

const SignUp: FC = () => {
	const dispatch = useAppDispatch()
	const { values, handleChange, handleBlur, handleSubmit, isValid, formError, setFormError } =
		useForm<SignUpForm>({
			initialState,
			onSubmit: values => {
				if (!isValid) return
				dispatch(signUp({ ...values, setFormError }))
			}
		})
	return (
		<HomePageWrap titleContent={'Registration'}>
			<Form handleSubmit={handleSubmit} submitTitle={'Welcome aboard!'} errorText={formError}>
				{TextFieldsSignUp.filter(({ isHide }) => !isHide).map(
					({ name, type, title, validType }) => (
						<TextInput
							key={name}
							title={title}
							type={type}
							name={name}
							validType={validType}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values[name]}
						/>
					)
				)}
			</Form>
			<Link to={RouterPath.SignIn}>Have account already?</Link>
		</HomePageWrap>
	)
}

export default SignUp
