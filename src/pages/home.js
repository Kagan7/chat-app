import "../index.css";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/footer";
import Chat from "../components/chat";
import Navbar from "../components/navbar";
import Users from "../components/users";

const Home = () => {
  const [user, isLoading] = useAuthState(auth);
  const [isOpen, setİsOpen] = useState(false);

  const toggleWidth = () => {
    setİsOpen(!isOpen);
  };

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);
  if (isLoading) {
    return <p></p>;
  }

  return (
    <div className="chat-container">
      <div className="chat-navbar chat-none">
        <button onClick={toggleWidth} className="open-btn">
          {isOpen ? "<" : ">"}
        </button>
        <Navbar />
      </div>

      <div className="chat-in">
        <div className={`users-content ${isOpen ? "open" : ""}`}>
          <div className="users-in-contain">
            <div className="users-name-logout">
              <h3 className="user-name">{user.displayName}</h3>
              <button onClick={handleSignOut} className="logout-btn">
                Çıkış
              </button>
             
            </div>
             <h3 className="users-h">Konuşmalar</h3>
            <div className="users">
              <Users />
            </div>
          </div>
        </div>
        <div className="chat-content">
          <div className="chat-navbar chat-seven">
            <button onClick={toggleWidth} className="open-btn">
              {isOpen ? "<" : ">"}
            </button>
            <Navbar />
          </div>
          <div className="chat">
            <div className="top-mrg"></div>
            <Chat />
          </div>
          <div className="chat-footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
