import { AuthenticationProvider } from '@type/auth';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutWithFirebase,
} from 'firebase/auth';

const firebaseOptions: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseOptions);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  hd: import.meta.env.VITE_HOSTED_DOMAIN,
});

const CodeLinkGoogleProvider = new GoogleAuthProvider();
CodeLinkGoogleProvider.setCustomParameters({
  hd: AuthenticationProvider.CodeLink,
});

const FMGGoogleProvider = new GoogleAuthProvider();
FMGGoogleProvider.setCustomParameters({
  hd: AuthenticationProvider.FMG,
});

const AgencyRevolutionGoogleProvider = new GoogleAuthProvider();
AgencyRevolutionGoogleProvider.setCustomParameters({
  hd: AuthenticationProvider.AgencyRevolution,
});

const GOOGLE_PROVIDERS = {
  [AuthenticationProvider.CodeLink]: CodeLinkGoogleProvider,
  [AuthenticationProvider.FMG]: FMGGoogleProvider,
  [AuthenticationProvider.AgencyRevolution]: AgencyRevolutionGoogleProvider,
};

const signInWithGoogleProvider = async (
  authenticationProvider: AuthenticationProvider
) => await signInWithPopup(auth, googleProvider);

// const signInWithGoogleProvider = async (
//   authenticationProvider: AuthenticationProvider
// ) => await signInWithPopup(auth, GOOGLE_PROVIDERS[authenticationProvider]);

const signOut = async () => await signOutWithFirebase(auth);

export { auth };

export { signInWithGoogleProvider, signOut };
