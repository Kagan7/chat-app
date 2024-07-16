import { Link } from "react-router-dom";
import "../index.css";
import { useCallback, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[errorMessage,setErrorMessage] = useState("")

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email || !password) {
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .catch((e) => {
          console.log(e);
          setErrorMessage("Yanlış hatalı e-mail veya şifre girdiniz!")

          
          setPassword("")
        });
    },
    [email, password]
  );

  return (
    <div className="form-contain-out">
      <div className="form-container">
        <h1 className="form-header">Giriş Yap!</h1>
        <form className="form" onSubmit={handleSubmit}>
        <input
            className="form-input"
            type="email"
            placeholder="E-Mailiniz"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Parolanız"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
           <Link to="/forget-password" className="link-to-page" id="forget-pass">
            Şifremi unuttum!
          </Link>
          <input
            className="form-input form-submit"
            type="submit"
            value="GİRİŞ YAP"
          />
           <p style={{ color: "red", display: errorMessage ? "block" : "none" }} className="errormsg">
            {errorMessage}
          </p>
          <Link to="/sign-up" className="link-to-page">
            Hesabınız yokmu? Kayıt olun!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
