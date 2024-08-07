/**
 * eslint-disable no-unused-vars
 *
 * @format
 */

/** @format */
// eslint-disable-next-line no-unused-vars
import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const action =
	(store) =>
	async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			const res = await customFetch.post('/auth/local', data);
			store.dispatch(loginUser(res.data));
			toast.success('Logged in successfully');
			console.log(res);
			return redirect('/');
		} catch (error) {
			const errMsg =
				error?.response?.data?.error?.message || 'please check your details';

			toast.error(errMsg);
			return null;
		}
	};
const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginAsGuestUser = async () => {
		try {
			const response = await customFetch.post('/auth/local', {
				identifier: 'test@test.com',
				password: 'secret',
			});
			dispatch(loginUser(response.data));
			toast.success('Welcome Guest User');
			navigate('/');
		} catch (error) {
			console.log(error);
			toast.error('Guest User login error ,please try again');
		}
	};
	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="post"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
				<h4 className="text-center text-3xl font-bold">Login</h4>
				<FormInput
					type="email"
					label="email"
					name="identifier"
				/>
				<FormInput
					type="password"
					label="password"
					name="password"
				/>

				<div className="mt-4">
					<SubmitBtn text="login" />
				</div>
				<button
					type="button"
					className="btn btn-secondary btn-block"
					onClick={loginAsGuestUser}>
					Guest User
				</button>
				<p className="text-center">
					Not a memeber yet?{' '}
					<Link
						to="/register"
						className="ml-2 link link-hover link-primary capitalize">
						register
					</Link>
				</p>
			</Form>
		</section>
	);
};

export default Login;
