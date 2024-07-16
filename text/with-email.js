import { Link } from "react-router-dom";
import "../index.css";
import { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email || !password) {
        return;
      }

      // "@" karakterinin index'ini bulun
      const atIndex = email.indexOf("@");

      // Eğer "@" karakteri bulunamazsa veya kullanıcı adı boşsa, email'i kullanıcı adı olarak kullanın
      const usernameFromEmail =
        atIndex !== -1 ? email.substring(0, atIndex) : email;

      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          // Kullanıcı adını "displayName" olarak ayarla
          updateProfile(auth.user, { displayName: usernameFromEmail });
          setSuccessMessage("Hesabınız Başarıyla Oluşturuldu!");
        })
        .catch((e) => {
          setErrorMessage("Hesap Oluşturulurken Bir Hata Oluştu!");
          setEmail("");
          setPassword("");
          return;
        });
    },
    [email, password]
  );

  return (
    <div className="form-contain-out">
      <div className="form-container">
        <h1 className="form-header">Yeni Hesap Oluştur!</h1>
        <form className="form" onSubmit={handleSubmit}>
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
          <p
            style={{ color: "green", display: errorMessage ? "block" : "none" }}
            className="errormsg"
          >
            {successMessage}
          </p>
          <p
            style={{ color: "red", display: errorMessage ? "block" : "none" }}
            className="errormsg"
          >
            {errorMessage}
          </p>
          <Link to="/sign-in" className="link-to-page">
            Zaten bir hesabınız var mı? Giriş Yapın!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
