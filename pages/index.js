import React, { useState, useContext } from 'react'
import * as Renderer from '../react-paper-renderer'

// we set color to red when we create context
const Context = React.createContext({
  color: 'red',
  setColor: () => {}
})

// then in provider we useState with a green default
const MyProvider = ({ children }) => {
  const [color, setColor] = useState('green')
  const context = { color, setColor }
  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}

// this component receives context from props
const MyCircle = ({ context }) => {
  return (
    <Renderer.Circle
      center={[350, 150]}
      radius={50}
      fillColor={context.color}
      onClick={() => console.log(context)}
    />
  )
}

// this component useContext hook to retrieve the context
const MyRectangle = () => {
  const context = useContext(Context)
  return (
    <Renderer.Rectangle
      center={[150, 150]}
      size={[120,60]}
      // context.color should be green not red (BUG???)
      fillColor={context.color}
      onClick={() => console.log(context)}
    />
  )
}

const MyView = () => {
  const context = useContext(Context)
  return (
    <>
      <p>Context color is {context.color}. Click on the shape to log the context value.</p>
      <Renderer.View style={{width:500,height:300,border:`2px solid ${context.color}`}}>
        <MyRectangle />
        <MyCircle context={context} />
      </Renderer.View>
    </>
  )
}


const IndexPage = () => {
  return (
    <MyProvider>
      <header>
        <h1>Here be dragons!</h1>
      </header>
      <main>
        <h2>Problem #1: useContext()</h2>
        <p>If we useContext() inside custom renderer component, the default value is returned, that is the value passed to React.createContext function. Expected result is the value from the Provider.</p>
        <MyView />
        <h2>Problem #2: react-devtools</h2>
        <p>Custom renderer components show up on the root level in react-devtools. Expected result is to see custom renderer show under the right node in the component tree. Fire up the devtools and you should se something similar:</p>
        <img src={'/static/devtools.png'} alt={'react-devtools'} />
      </main>
    </MyProvider>
  )
}

export default IndexPage
