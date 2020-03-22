import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";
import fireBaseConfig from "./config";

const firebaseApp = firebase.initializeApp(fireBaseConfig);

const db = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default db;
