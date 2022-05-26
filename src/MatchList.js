import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { MatchCard } from "./MatchCard";

const fetchData = async () => {
  const tempList = [];
  try {
    const collectionRef = collection(db, "match");
    const docs = await getDocs(collectionRef);
    console.log(docs.size);
    docs.forEach((doc) => {
      tempList.push(doc.data());
    });
    return tempList;
  } catch (e) {
    console.log(e);
  }
};

export const MatchList = () => {
  const [matchList, setMatchList] = useState([]);
  useEffect(() => {
    fetchData().then((result) => setMatchList(result));
  }, []);
  return (
    <div className="box container is-max-desktop has-background-primary">
      <ul>
        {matchList
          ? matchList.map((match, key) => (
              MatchCard({match:match, key:key})
            ))
          : typeof matchList}
      </ul>
    </div>
  );
};
