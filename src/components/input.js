import React, { useRef, useState } from "react"
import styled from "@emotion/styled"
import { gql } from "apollo-boost"
import { Mutation } from "react-apollo"

const ADD_COMMAND_REQUEST = gql`
    mutation EnterCommand($command: String!) {
        createCommandRequest(entry: $command) {
            success
            entry
            command {
                command
                helpText
            }
        }
    }
`

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

    const addLine = (line) => {
        console.log({line})
        let newLine = line
        if (line.hasOwnProperty('createCommandRequest')) {
            newLine = line.createCommandRequest.command.helpText
        }
        setLines(prev => [...prev, newLine])
    }

    const handleKeyDown = (submit, loading) => (e) => {
        e.persist()
        if (loading) {
            return
        }
        // console.log(e.keyCode, e.key, e)
        const {key, keyCode} = e

        // For 'Shift' (16), 'Ctrl' (17), 'Alt' (18), 'Esc' (27), 'Left Meta' (91), 'Right Meta' (93), or 'Function keys' (112 - 123) do nothing
        if ([16, 17, 18, 27, 91, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123].includes(keyCode)) {
            return
        // For 'Enter' (13) do something special
        } else if (keyCode === 13) {
            // setLines(prev => [...prev, input])
            addLine(input)
            // Submit command to GraphQL endpoint
            submit()
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
            e.preventDefault()
            setInput(prev => prev.slice(0, Math.max(0, prev.length - 1)))
        } else {
            setInput(prev => prev + key)
        }
    }

    return (
        <Mutation
            mutation={ADD_COMMAND_REQUEST}
            variables={{command: input}}
            onCompleted={addLine}
            onError={(e) =>{console.log('Error', e)}}
        >
            {(submitCommand, {loading}) => {
                return (
                    <Wrapper
                        autoFocus
                        ref={ref}
                        tabIndex={0}
                        onKeyDown={handleKeyDown(submitCommand, loading)}
                    >
                        {lines.map((line, index) => {
                            return (<div key={index}>{line}</div>)
                        })}
                        {!loading && input}
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
            }}
        </Mutation>
    )
}

export default Input
