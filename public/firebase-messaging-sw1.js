// import { getMessaging } from "firebase/messaging";

// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyATlXab2rIRTCDlp8RyShVSP1MS9NHsWIc",
  authDomain: "notification-service-765f9.firebaseapp.com",
  databaseURL:
    "https://notification-service-765f9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "notification-service-765f9",
  storageBucket: "notification-service-765f9.appspot.com",
  messagingSenderId: "247678697957",
  appId: "1:247678697957:web:67312bf21095493f4aef0c",
  measurementId: "G-EF85MMML50",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
