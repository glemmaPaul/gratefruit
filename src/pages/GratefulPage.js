import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import GratefulForm from "../components/GratefulForm";
import PhoneNumberAuth from "../components/PhoneNumberAuth";
import AppHeader from "../components/AppHeader";
import moment from "moment";

const firestore = firebase.firestore();

const headerTitle = {
  title: moment().format(`dddd`),
  subtitle: moment().format(`DD MMMM`)
};

const emojis = [
  `😌`,
  `💃`,
  `🙏`,
  `🎉`,
]

// Generate random emoji
const emoji = emojis[~~(emojis.length * Math.random())];

async function saveGratitudeLog(uid, entries) {
  await firestore.collection("gratitude").add({
    entries,
    uid,
    created: new Date()
  });
}

function GratefulPage() {
  const [entries, setEntries] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  });

  // When user and entries are both truthy, save the items in firebase with the user id
  useEffect(() => {
    if (user && entries) {
      saveGratitudeLog(user.uid, entries).then(() => console.log("saved"));
    }
  }, [user, entries]);

  return (
    <div>
      <div className="entry">
        <AppHeader emojis={emoji} data={headerTitle} />

        <div className="group mt">
          {!entries && <GratefulForm hidden={entries} items="3" onComplete={setEntries} />}
          {entries && !user && <PhoneNumberAuth hidden={entries} onComplete={setUser} />}
          {user && entries && <span>Thank you for submitting, come back tomorrow</span>}
        </div>
      </div>
    </div>
  );
}

export default GratefulPage;
