import React, { useEffect, useRef, useState } from "react"
// import { Link } from "gatsby"
import styled from "@emotion/styled"
import Draggable from "gsap/Draggable"
import TimelineMax from "gsap/TimelineMax"
import {animateCharactersOfLine} from "../utils/animate"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Input from "../components/input"

const windowBarHeight = '36px;'

const Terminal = styled.div`
  width: 100%;
  max-width: ${8 * 12 * 10}px;
  ${({isMinimized}) => isMinimized ? `max-height: ${windowBarHeight};` : null}
  ${({isMinimized}) => isMinimized ? `overflow: hidden;` : null}

  color: white;
  font-family: source-code-pro, monospace;
  font-weight: 400;
  font-style: normal;

  border-radius: 6px;
  -webkit-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.8), 0px 16px 55px 4px rgba(158,158,158,1);
  -moz-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.8), 0px 16px 55px 4px rgba(158,158,158,1);
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.8), 0px 16px 55px 4px rgba(158,158,158,1);
`

const WindowBar = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
  width: 100%;
  height: ${windowBarHeight};
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c4c4c4+0,c4c4c4+100&0.12+0,1+100 */
  background: -moz-linear-gradient(top, rgba(196,196,196,0.24) 0%, hsl(0, 0%, 57%) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(196,196,196,0.24) 0%,hsl(0, 0%, 57%) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(196,196,196,0.24) 0%,hsl(0, 0%, 57%) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1fc4c4c4', endColorstr='#c4c4c4',GradientType=0 ); /* IE6-9 */
  border-radius: 4px 4px 0 0;
  box-shadow: inset 0 1px 0px 0px hsl(0, 0%, 87%), inset 2px 0 0px -1px hsla(0, 0%, 87%, 1), inset -1px 0 0px 0px hsla(0, 0%, 87%, 1);
`

const WindowButton = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: ${props =>
    props.success ? '#7CB342' :
    props.warn ? '#FB8C00' :
    props.fail ? '#D32F2F' : ''};
  margin-right: 8px;

  cursor: pointer;
`

const Interface = styled.div`
  background: hsl(0, 17%, 6%);
  border-radius: 0 0 6px 6px;
  padding: 12px;
  box-shadow: inset 0 -1px 0px 0px hsl(0, 17%, 87%), inset 2px 0 0px -1px hsl(0, 17%, 87%), inset -1px 0 0px 0px hsl(0, 17%, 87%);
  min-height: ${8*6*10}px;
  cursor: text;
`

// Data to initialize state
const initialEntries = [
  {id: "a-hello", body: "Hello 🌎"}
]

const IndexPage = () => {
  const [isMinimized, setMinimized] = useState(false)
   // Currently only used to make sure that useEffect for intro animation is only executed on mount, not on update (triggered by isMinimized)
  const [messageLines, setMessageLines] = useState(initialEntries)
  const [windeau, setWindeau] = useState(null)
  const masterTimeline = new TimelineMax({paused: true})

  const inputEl = useRef(null)

  const showInput = () => {
    inputEl.current.showInput()
  }

  const focusInput = () => {
    inputEl.current.focus()
  }

  const closeBrowser = () => {
    console.log('clicked', {windeau})
    if (windeau) {
      windeau.open('','_self').close()
    }
  }

  const maximize = () => {
    setMinimized(false)
  }

  const minimize = () => {
    setMinimized(true)
  }

  // Animation Effect
  useEffect(() => {
    // Need to import SplitText after mounting due to SSR errors when building
    const SplitText = require("../utils/gsap/SplitText").SplitText
    // Make <Terminal/> draggable
    Draggable.create("#terminal-window", {
      bounds: "#container",
      trigger: "#terminal-window-bar"
    })
    // Animation timelines
    masterTimeline
      .add(animateCharactersOfLine('#a-hello', SplitText))
      .add(animateCharactersOfLine('#a-name', SplitText))
      .add(animateCharactersOfLine('#a-passion', SplitText))
      .add(animateCharactersOfLine('#a-build', SplitText, true))
      .addCallback(showInput)
      .play()
  }, [messageLines])

  // Window effect
  useEffect(() => {
    if (!windeau) {
      setWindeau(window)
    }
  })

  return (
    <Layout id="container" fullPage>
      <SEO title="Terminal" />
      <Terminal id="terminal-window" isMinimized={isMinimized}>
        <WindowBar id="terminal-window-bar">
          <WindowButton fail onClick={closeBrowser}/>
          <WindowButton warn onClick={minimize}/>
          <WindowButton success onClick={maximize}/>
        </WindowBar>
        <Interface onClick={focusInput}>
          <div id="a-hello" style={{opacity: 0}}><span className='a-cursor' style={{backgroundColor:'#fff'}}>&#32;</span><div className="a-text">Hello 🌎</div></div>
          <div id="a-name" style={{opacity: 0}}><span className='a-cursor' style={{backgroundColor:'#fff'}}>&#32;</span><div className="a-text">my name is Peter Wiebe</div></div>
          <div id="a-passion" style={{opacity: 0}}><span className='a-cursor' style={{backgroundColor:'#fff'}}>&#32;</span><div className="a-text">my passion is in building products, both digital and physical</div></div>
          <div id="a-build" style={{opacity: 0}}><span className='a-cursor' style={{backgroundColor:'#fff'}}>&#32;</span><div className="a-text">enter a command to learn more about me (you can start with: help)</div></div>
          <Input ref={inputEl} />
        </Interface>
      </Terminal>
    </Layout>
  )
}

export default IndexPage
