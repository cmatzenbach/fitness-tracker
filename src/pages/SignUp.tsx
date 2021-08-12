import React, { useState, FunctionComponent, ChangeEvent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from '../config/theme.signinup';

import { withFirebase } from '../components/Firebase/index';
import Firebase from '../components/Firebase/firebase';
import Copyright from '../components/Copyright';
import { InitialUser } from '../types/user-types';

interface FirebaseComp {
	firebase: Firebase;
}

const SignUp: FunctionComponent<RouteComponentProps & FirebaseComp> = (props: RouteComponentProps & FirebaseComp) => {
	const classes = useStyles();

 	const initialUser: InitialUser = {
 		id: null,
 		email: '',
 		password: '',
		name: '',
 		error: null,
 		auth: null
 	};

 	const [user, setUser] = useState(initialUser);

 	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
 	}

 	const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
		props.firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
			.then(authUser => {
				setUser(initialUser);
				props.history.push('/dashboard');
			})
			.catch(err => {
				setUser({ ...user, error: err.message });
			});
 	}

	const isValid = user.name === '' || user.email === '' || user.password === '';

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<form className={classes.form} noValidate onSubmit={e => e.preventDefault()}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoFocus
						value={user.name}
						onChange={handleChange}
					/>
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={isValid}
					>
						Sign Up
					</Button>
					<Grid container>
						<Grid item>
							<Link to="/">
								{"Already have an account? Sign In"}
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

export default withRouter(withFirebase(SignUp));
