import React, { useState } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const FullScreen = styled.div`
  width: 100%;
`;

const BigScreen = styled.div`
  float: left;
  width: 70%;
  height: 100vh;

  ul {
    list-style: none;
  }

  li {
    display: inline-block;
    width: 33%;
  }
`;

const LittleScreen = styled.div`
  float: left;
  width: 14.7%;
  height: 100vh;
  background-color: #794cff;

  button {
    margin-top: 45vh;
    background-color: #fb5783;
    color: white;
  }
`;

let welcome = {
  buttonText: "Welcome",
  header: "Thanks for downloading our local demos!",
  body: "Here is some more information about our local demos! Yada yada yada.",
};

let middle = {
  buttonText: "The Config",
  header: "Here's code snippets and where to find the code",
  body: "fghjkl ghjkl hgjkhkalskjd askjdlakjs lorem ipsum.",
};

const final = {
  buttonText: "Get Started",
  header: "Sign up with Github to be redirected to the local demo!",
  body:
    "And here is some more gibberish hjaksjkldkaj aklsjddlakjs asjdhjdlakjsdasd d.",
  basicDemo: "cd ../basic-example",
  hooksDemo: "cd ../data-hooks-example",
  crmDemo: "cd ../crm-example",
  stepTwo: "npm install",
  stepThree: "npm run start",
};

export const Main = () => {
  const Stage = {
    Initial: 1,
    Middle: 2,
    Final: 3,
  };
  let [currentStage, setCurrentStage] = useState(Stage.Initial);
  const initialStage = () => {
    setCurrentStage(Stage.Initial);
  };
  const middleStage = () => {
    setCurrentStage(Stage.Middle);
  };
  const finalStage = () => {
    setCurrentStage(Stage.Final);
  };
  return (
    <FullScreen>
      {Stage.Initial === currentStage && (
        <>
          <BigScreen>
            <h1>{welcome.header}</h1>
          </BigScreen>
          <LittleScreen>
            <button onClick={middleStage}>{middle.buttonText}</button>
          </LittleScreen>
          <LittleScreen>
            <button onClick={finalStage}>{final.buttonText}</button>
          </LittleScreen>
        </>
      )}
      {Stage.Middle === currentStage && (
        <>
          <LittleScreen>
            <button onClick={initialStage}>{welcome.buttonText}</button>
          </LittleScreen>
          <BigScreen>
            <h1>{middle.header}</h1>
          </BigScreen>
          <LittleScreen>
            <button onClick={finalStage}>{final.buttonText}</button>
          </LittleScreen>
        </>
      )}
      {Stage.Final === currentStage && (
        <>
          <LittleScreen>
            <button onClick={initialStage}>{welcome.buttonText}</button>
          </LittleScreen>
          <LittleScreen>
            <button onClick={middleStage}>{middle.buttonText}</button>
          </LittleScreen>
          <BigScreen>
            <h1>{final.header}</h1>
            <p>Step One: Pick a demo</p>
            <ul>
              <li>
                Basic Example
                {
                  <SyntaxHighlighter language="bash" style={dark}>
                    {final.basicDemo}
                  </SyntaxHighlighter>
                }
              </li>
              <li>
                Data Hooks Example
                {
                  <SyntaxHighlighter language="bash" style={dark}>
                    {final.hooksDemo}
                  </SyntaxHighlighter>
                }
              </li>
              <li>
                Mock CRM Dashboard
                {
                  <SyntaxHighlighter language="bash" style={dark}>
                    {final.crmDemo}
                  </SyntaxHighlighter>
                }
              </li>
            </ul>
            <p>Step Two: Install dependencies</p>
            <SyntaxHighlighter language="bash" style={dark} >
              npm install
            </SyntaxHighlighter>
            <p>Step Three: Start it up!</p>
            <SyntaxHighlighter language="bash" style={dark}>
              npm run start
            </SyntaxHighlighter>
            <p>Step Four: Sign up to get a license key. This will automatically redirect your (with thew license key) to your local demo!</p>
            <a href="https://api.flatfile.io/auth/github?redirect_url=https://localhost:3377">
              <button>Sign up with GitHub</button>
            </a>
          </BigScreen>
        </>
      )}
    </FullScreen>
  );
};
