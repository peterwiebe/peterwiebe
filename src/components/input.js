import React, { useRef, useState } from "react"
import styled from "@emotion/styled"

const Wrapper = styled.div`
    display: inline-block;
    white-space: pre-wrap;
    word-break: break-all;

    &:focus {
        outline: none;
    }
`

const Input = () => {
    const ref = useRef()
    const [input, setInput] = useState("")
    const [lines, setLines] = useState([])

    const handleKeyDown = (e) => {
        e.persist()
        // console.log(e.keyCode, e.key, e)
        const {key, keyCode} = e

        // For 'Shift' (16), 'Ctrl' (17), 'Alt' (18), 'Esc' (27), 'Left Meta' (91), 'Right Meta' (93), or 'Function keys' (112 - 123) do nothing
        if ([16, 17, 18, 27, 91, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123].includes(keyCode)) {
            return
        // For 'Enter' (13) do something special
        } else if (keyCode === 13) {
            setLines(prev => [...prev, input])
            setInput("")
        // For 'Tab' (9) maintain focus on input
        } else if (keyCode === 9) {
            e.preventDefault()
            // setTimeout(() => {
            //     console.log(document.activeElement)
            //     ref.current.focus()
            //     console.log(document.activeElement)
            // }, 10)
        // For 'Arrows' (37-39) do nothing for now
        } else if ([37, 38, 39, 40].includes(keyCode)) {
            e.preventDefault()
            return
        // For 'Delete' remove the last character
        } else if (keyCode === 8) {
            setInput(prev => prev.slice(0, Math.max(0, prev.length - 1)))
        } else {
            setInput(prev => prev + key)
        }
    }

    return (
        <Wrapper
            autoFocus
            ref={ref}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {lines.map((line, index) => {
                return (<div key={index}>{line}</div>)
            })}
            {input}
            <span
                style={{
                    backgroundColor: 'white',
                    color: 'black'
                }}
            >
                &nbsp;
            </span>
        </Wrapper>
    )
}

export default Input
