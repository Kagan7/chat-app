import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef } from "react";

const ref = collection(db, "post");
const queryRef = query(ref, orderBy("createdAt", "asc"));
const Chat = () => {
  const [data, isLoading] = useCollectionData(queryRef);
  const [user, isLoadingTwo] = useAuthState(auth);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  if (isLoading || isLoadingTwo) {
    return <div className="loading-container"><div className="loading-content"><p className="loading">Yükleniyor...</p></div></div> ;
  }

  return (
    <div className="msgs">
      {data.map(({ id, text, uid,user }) => (
        <div className="msg-out">
          <div
            key={id}
            className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}
          >
            <h4 id="user-name">{user}</h4>
           
              <p>{text}</p>
            
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
