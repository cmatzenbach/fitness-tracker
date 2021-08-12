import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Firebase from '../components/Firebase/firebase';
import { withFirebase } from '../components/Firebase/index';
import { InitialUser } from '../types/user-types';
import ForgotPassword from '../components/ForgotPassword/index';

interface FirebaseComp {
	firebase: Firebase;
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Copyright: FunctionComponent = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" to="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const SignIn: FunctionComponent<RouteComponentProps & FirebaseComp> = (props: RouteComponentProps & FirebaseComp) => {
	const classes = useStyles();

	const initialUser: InitialUser = {id: null, email: '', password: '', name: '', error: null, auth: null};

	const [user, setUser] = useState(initialUser);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLButtonElement>): void => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	}

	const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
		props.firebase.doSignInWithEmailAndPassword(user.email, user.password)
			.then(authUser => {
				setUser(initialUser);
				props.history.push('/dashboard');
			})
			.catch(err => {
				setUser({ ...user, error: err.message });
			})
	}

	const isValid = user.email === '' || user.password === '';

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1">
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={e => e.preventDefault()}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={isValid}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<ForgotPassword />
						</Grid>
						<Grid item>
							<Link to="/sign-up">
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default withRouter(withFirebase(SignIn));
