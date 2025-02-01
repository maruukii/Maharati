import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../login/login.scss'

const activateAccount = () => {
    let email='';
    email = localStorage.getItem("email");
    const navigate = useNavigate();
  
      useEffect(() => {
        if (email === null || email === '') {
            navigate("/login", { replace: true });
        } else {
            localStorage.removeItem("email");
        }
    }, [navigate]);

  return (
    <div>
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row gx-60">
            <div className="col-lg-6">
              <div className="form-style4 login">
                <h2 className="form-title" style={{fontWeight:"bold"}}>ACCOUNT ACTIVATION</h2>
                <h3 style={{fontSize:"1.5rem"}}>An account activation mail has been sent to {email}. </h3>
                <p style={{fontSize:"1.3rem"}}>You must verify your email address in order to log in your new account. <br/>Follow the link sent in the mail to activate your account then enter your credentials<br/><br/></p>
                <h4>Welcome on Board !</h4>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default activateAccount;
