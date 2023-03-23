import React, { Component, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "./about.css";
import logoImg from './img/kewLogo.png';
import kewCImg from './img/kewClimate.PNG';

export default function About() {
  const [state, setState] = useState({
    isPaneOpenLeft: false,
  });
  return (
    <div>
      
      <div style={{ marginTop: "32px" ,marginLeft: "32px"}}>
        <button onClick={() => setState({ isPaneOpenLeft: true })}>
          Click me to open About
        </button>
      </div>
     
      <SlidingPane
        closeIcon={<div><img src={logoImg} className="logoImg" alt="logoImg" /></div>}
        isOpen={state.isPaneOpenLeft}
        title={<title>"About Kew Gardens"</title>}
        from="left"
        width="40%"
        onRequestClose={() => setState({ isPaneOpenLeft: false })}
      >
        <div class="content">
            <h1>About Kew Gardens</h1>
            <h2>Climate</h2>
            <p>The Royal Botanic Gardens Kew are committed to ensuring that their operations and
            activities will by climate positive by 2030. Further they will use their scientific and
            horticultural expertise to advocate for sustainable action, to shape policy and influence
            behaviour, and further more to use their voice to shape policy and influence behaviour.</p>
            <p>RBG Kew mission is to understand and protect plants and fungi for people and all life on
            earth. The next 10 years are critical, it is for this generation to choose. The belief is if we
            choose a path of regeneration we will at least reduce the negative impact of climate change.
            RBG Kew role is to tackle the climate and biodiversity emergency, working with partners
            Worldwide. They hope to use their voice to empower and advocate for action.</p>
            <p>RBG Kew have laid out their existing and far reaching emissions boundaries and for each
            area and how they intend to tackle the reductions. These are science-based reduction
            pathways. Additionally, their skilled horticulturists will continue to care for and curate our
            landscape and living collections.</p>
            <p>The RBG Kew work with Governments, organisations and NGO’s to shape and support global
            treaties, such as the Convention on International Trade in Endangered Species of Fauna and
            Flora. This ongoing use of their respected voice is critical in meeting their Manifesto.</p>
            <img src={kewCImg} className="kewCImg" alt="kewCImg" />
          

        </div>
      </SlidingPane>
    </div>
  );
}