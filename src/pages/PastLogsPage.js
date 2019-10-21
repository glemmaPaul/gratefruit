import React from "react";
import AppHeader from "../components/AppHeader";
import firebase from "../firebase";

const firestore = firebase.firestore();

// Pull in the items filtered by the current uid?
const headerTitle = {
  title: `Past Logs`,
  subtitle: `View your entries`
};

function PastLogs() {
  return (
    <div>
      <div className="entry">
        <AppHeader emojis="📓" data={headerTitle} />
        <div className="group">
          <span>logs here</span>
        </div>
      </div>
    </div>
  );
}

export default PastLogs;
