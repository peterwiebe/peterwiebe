import TimelineMax from "./gsap/TimelineMax"
import TweenLite from "./gsap/TweenLite"

const _escapeSpaceCharacters = (el) => {
    el.innerText = el.innerText.replace(/\s+/g, '\u00a0')
}

// Hide cursor
const hideCursor = (cursorTl) => {
    cursorTl.kill()
}

const _moveCursor =(cursor, cursorTl, timeline) => {
    var container = cursor.parentNode
    var sibling = cursor.nextSibling
    var newCursor = cursor.parentNode.removeChild(cursor)

    container.insertBefore(newCursor, sibling.nextSibling)
    cursorTl.restart()
    timeline.play()
}

const _setDelay = (index, text) => {
    if (!index) {
    // If first character in the line we want a long delay
    return '+=2'
    } else if (text[index - 1].innerText.charCodeAt(0) === 160) {
    // If the character is a &nbsp; we want it to take a bit longer
    return '+=0.25'
    }
    // Default length of the delay
    return '+=0.1'
}

const _showLine = (lineName) => {
    document.querySelector(lineName).setAttribute("style", "opacity: 1;")
}

export const animateCharactersOfLine = (lineName, SplitText, isLast) => {
    // Get a reference to the text to animate
    var sentence = document.querySelector(lineName + ' .a-text');
    // Convert spaces to &nbsp;
    _escapeSpaceCharacters(sentence)
    // Get a reference to the cursor
    console.log('jell')
    var cursor = document.querySelector(lineName + ' .a-cursor')
    var sibling = cursor.nextSibling
    console.log({cursor})
    // Create a new timeline that will animate the text
    var tl = new TimelineMax()
    // Show line to animate
    tl.addCallback(_showLine, null, [lineName])
    // Cursor animation
    var cursorTL = new TimelineMax({repeat: -1})
    cursorTL.to(cursor, 0.4, {delay: 1, opacity: 0})
    // Split text into characters and words
    var text = new SplitText(sentence, {type: 'chars'})
    // Move the cursor into the container for the split characters
    sibling.insertBefore(cursor, sibling.firstChild)
    // Set text opacity to 0
    TweenLite.set(text.chars, { opacity: 0 });

    // Add each character to the timeline
    text.chars.forEach((char, index, text) => {
      var delay = _setDelay(index, text)
      // console.log(text[index].innerText.charCodeAt(0))
      tl.set(char, {opacity: 1}, delay)
      tl.addPause('+=0', _moveCursor, [cursor, cursorTL, tl])
    })

    if (!isLast) {
      tl.to(cursor, 0, {delay: 1, opacity: 0, onComplete: hideCursor, onCompleteParams: [cursorTL]})
    }
    return tl
  }
