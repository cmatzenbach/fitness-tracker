import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
	apiKey: "AIzaSyD7cl4DNfShCTVCb7Clrkugz1t16tJisiU",
	authDomain: "fitness-tracker-bc528.firebaseapp.com",
	projectId: "fitness-tracker-bc528",
	storageBucket: "fitness-tracker-bc528.appspot.com",
	messagingSenderId: "433355928103",
	appId: "1:433355928103:web:afc22408df0255e0939402",
	measurementId: "G-GDM9NG6K5K"
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
	}

	// authentication
	doCreateUserWithEmailAndPassword = (email, password) =>	this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
