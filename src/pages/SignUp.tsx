import React, { useState, FunctionComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { InitialUser } from '../types/user-types';

/* const SignUp: FunctionComponent = () => {
 * 	const initialUser: InitialUser = {
 * 		id: 1,
 * 		email: '',
 * 		password: '',
 * 		error: null,
 * 		auth: null
 * 	};
 * 
 * 	const [user, setUser] = useState(initialUser);
 * 
 * 	const handleChange = e => {
 * 		const { name, value } = e.target;
 * 		setUser({...user, [name]: value});
 * 	}
 * 
 * 	const handleSubmit = () => {
 * 	}
 * 	return <p>Sign Up</p>;
 * } */
