import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return;
        
      }
      sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Sıfırlama Mesajı Gönderildi!")
        })
        .catch((e) => {
            console.log(e);
        });
    },
    [email]
  );
  return (
    <div className="form-contain-out">
      <div className="form-container">
        <h1 className="form-header">Şifremi Unuttum!</h1>
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
            className="form-input form-submit"
            type="submit"
            value="ŞİFREMİ UNUTTUM"
          />
          <Link to="/sign-in" className="link-to-page">
            Giriş sayfasına git!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
