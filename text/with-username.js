import { Link } from "react-router-dom";
import "../index.css";
import { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log(username, email, password);

      if (!username || !email || !password) {
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          updateProfile(auth.user, { displayName: username });
          alert("Hesabınız Oluşturuldu!");
        })
        .catch((e) => {
          alert("Hesap Oluşturulurken Bir Hata Oluştu!");
          setEmail("");
          setPassword("");
          setUsername("");
          return;
        });
    },
    [username, email, password]
  );

  return (
    <div className="form-contain-out">
      <div className="form-container">
        <h1 className="form-header">Yeni Hesap Oluştur!</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            maxlength="12"
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="E-Mail Giriniz"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Parola Giriniz"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <input
            className="form-input form-submit"
            type="submit"
            value="KAYDOL"
          />
          <Link to="/sign-in" className="link-to-page">
            Zaten bir hesabınız varmı? Giriş Yapın!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
