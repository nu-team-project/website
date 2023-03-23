import React, { Component, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "./about.css";
import logoImg from './img/kewLogo.png';

export default function About() {
  const [state, setState] = useState({
    isPaneOpenLeft: false,
  });
  return (
    <div>
      
      <div style={{ marginTop: "32px" }}>
        <button onClick={() => setState({ isPaneOpenLeft: true })}>
          Click me to open About
        </button>
      </div>
     
      <SlidingPane
        closeIcon={<div><img src={logoImg} className="logoImg" alt="logoImg" /></div>}
        isOpen={state.isPaneOpenLeft}
        title="About Kew Gardens"
        from="left"
        width="40%"
        onRequestClose={() => setState({ isPaneOpenLeft: false })}
      >
        <div class="content">
            <h1>About Kew Gardens</h1>
            <h2>first stuff</h2>
            <p>jffdjaskfjakdljfklasdjfklajadfklsjkfdajsklfjakjfkldasjkfdlajkfljklfadsjklasjfklajkldfsajklfajklafsdjkfladjkldadsadasdasdsasassssssssssssssss</p>
            <h2>2 stuff</h2>
            <p>jffdjaskfjakdljfklasdjfklajadfklsjkfdajsklfjakjfkldasjkfdlajkfljklfadsjklasjfklajkldfsajklfajklafsdjkfladjkldadsadasdasdsasassssssssssssssss</p>
            <h2>3 stuff</h2>
            <p>jffdjaskfjakdljfklasdjfklajadfklsjkfdajsklfjakjfkldasjkfdlajkfljklfadsjklasjfklajkldfsajklfajklafsdjkfladjkldadsadasdasdsasassssssssssssssss</p>
            
          

        </div>
      </SlidingPane>
    </div>
  );
}