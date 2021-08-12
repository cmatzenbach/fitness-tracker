import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

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

export default Copyright;
