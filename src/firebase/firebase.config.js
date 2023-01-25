
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC5sNnkjhZn2SpJzV7sK2oVNc0LSVQFis",
  authDomain: "rechat-f4efd.firebaseapp.com",
  projectId: "rechat-f4efd",
  storageBucket: "rechat-f4efd.appspot.com",
  messagingSenderId: "835052440457",
  appId: "1:835052440457:web:20837384a477aa9581ef58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app