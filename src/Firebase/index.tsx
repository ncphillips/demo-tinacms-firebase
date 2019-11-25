import * as React from "react";
import { useState, FC, useContext } from "react";

import { initializeApp, app } from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = require("./firebase-config.json");

const FirebaseContext = React.createContext<firebase.app.App | null>(null);

export const FirebaseProvider: FC = ({ children }) => {
  const [client] = useState(() => {
    return initializeApp(firebaseConfig);
  });

  console.log(client);

  return (
    <FirebaseContext.Provider value={client}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useFirestore = () => {
  const firebase = useFirebase();
  if (firebase) {
    return firebase.firestore();
  }
};

type Page = any;

export const usePageCollection = () => {
  const firestore = useFirestore();
  const [pages, setPages] = useState<Page[]>([]);

  React.useEffect(() => {
    if (!firestore) return;

    firestore
      .collection("pages")
      .get()
      .then(pages => {
        setPages(pages.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
  }, [firestore]);

  return pages;
};
