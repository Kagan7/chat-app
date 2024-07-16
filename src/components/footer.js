import { useState, useCallback } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const ref = collection(db, "post");
const Footer = () => {
  const [body, setBody] = useState("");

  const handlesubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const currentUser = auth.currentUser;
      if (!body) {
        return;
      }
      const uid = currentUser.uid
      await addDoc(ref, {
        text: body,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        uid,
      });
      setBody("");
    },
    [body]
  );

  return (
    <div>
      <form onSubmit={handlesubmit} className="send-class">
        <input
          type="text"
          className="send-message"
          placeholder="Bir Şeyler Yaz!"
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
          
        />
        <input type="submit" className="send-btn" value=">" />
      </form>
    </div>
  );
};
export default Footer;
