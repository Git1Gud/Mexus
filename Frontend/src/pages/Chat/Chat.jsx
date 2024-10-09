// import  { useState } from "react";
import "./Chat.css";

const ChatApp = () => {

    

  return (
<section className="msger">
  <header className="msger-header">
    <div className="msger-header-title">
      <i className="fas fa-comment-alt"></i> SimpleChat
    </div>
    {/* <div className="msger-header-options">
      <span><i className="fas fa-cog"></i></span>
    </div> */}
  </header>

  <main className="msger-chat">
    <div className="msg left-msg">
      <div
       className="msg-patient-img"
       
      ></div>

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">BOT</div>
          <div className="msg-info-time">12:45</div>
        </div>

        <div className="msg-text">
          Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
        </div>
      </div>
    </div>

    <div className="msg right-msg">
      <div
       className="msg-doctor-img"
       
      ></div>

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">Sajad</div>
          <div className="msg-info-time">12:46</div>
        </div>

        <div className="msg-text">
          You can change your name in JS section!
        </div>
      </div>
    </div>
  </main>

  <form className="msger-inputarea">
    <input type="text" className="msger-input" placeholder="Enter your message..." />
    <button type="submit" className="msger-send-btn">Send</button>
  </form>
</section>
  );
};

export default ChatApp;
