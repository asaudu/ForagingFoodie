import React from "react";

const ContactMe = () => {
  //   const { initialPost = { id: null, nickname: "", email: "" } } = props;

  //   const [contact, setContact] = useState(initialPost);

  //   const handleNicknameChange = (event) => {
  //     const nickname = event.target.value;
  //     setContact((contact) => ({ ...contact, nickname }));
  //   };

  //   const handleEmailChange = (event) => {
  //     const email = event.target.value;
  //     setContact((contact) => ({ ...user, email }));
  //   };

  return (
    <div>
      <h1>Tryna Get in touch?</h1>

      <div className="container">
        <form action="/action_page.php" className="contactForm">
          <div classNam="row">
            <div classNam="col-25">
              <label for="uname">Username</label>
            </div>
            <div classNam="col-75">
              <input
                type="text"
                id="uname"
                name="username"
                placeholder="Username.."
              />
            </div>
          </div>

          <div classNam="row">
            <div classNam="col-25">
              <label for="email">Email</label>
            </div>
            <div classNam="col-75">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Your email.."
              />
            </div>
          </div>

          <div></div>

          <div classNam="row">
            <div classNam="col-25">
              <label for="email">Message</label>
            </div>
            <div classNam="col-75">
              <textarea
                type="text"
                id="message"
                name="message"
                placeholder="What's on your mind?"
                style={{ height: "10rem", width: "20rem" }}
              />
            </div>
          </div>

          <br />
          <input type="submit" value="Submit" />
          {/* <div class="row">
            
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ContactMe;
