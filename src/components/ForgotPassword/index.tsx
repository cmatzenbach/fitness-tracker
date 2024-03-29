import React, { useState, FunctionComponent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Error } from '@firebase/auth-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

import Firebase, { withFirebase } from '../Firebase/index';

interface FirebaseComp {
	firebase: Firebase;
}

const ForgotPassword: FunctionComponent<FirebaseComp> = (props: FirebaseComp) => {
	const [field, setField] = useState<{email: string, error: Error | null}>({ email: '', error: null });
	const [open, setOpen] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setField({ ...field, [name]: value });
	}

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: CloseEvent | object, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

	const handleSubmit = (): void => {
		props.firebase
			.doPasswordReset(field.email)
			.then(() => {
				setField({ email: '', error: null });
				handleClose();
				setOpenAlert(true);
			})
			.catch((err) => {
				setField({ ...field, error: err });
			});
	};

	const isInvalid = field.email === '';

	return(
		<div>
			<Link to="" onClick={handleClick}>
				Forgot password?
			</Link>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="forgot-pw-dialog-title">Reset my password</DialogTitle>
				<DialogContent>
					<DialogContentText>To reset your password, please enter your email address here. We will you instructions on how to reset your password shortly after.</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						name="email"
						value={field.email}
						onChange={handleChange}
						fullWidth
					/>
					{field.error && <p style={{color: 'red'}}>{field.error.message}</p>}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">Cancel</Button>
					<Button onClick={handleSubmit} disabled={isInvalid} type="submit" color="primary">Reset Password</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				open={openAlert}
				autoHideDuration={6000}
				message="Password reset link successfully sent"
			/>
		</div>
	);
}

export default withFirebase(ForgotPassword);
