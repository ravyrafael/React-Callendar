import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { shallow, mount  } from '../enzyme';


it("Render callendar with Success", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<App/>, div)

})
it("Render callendar with", ()=>{
   render(<App/>)
    fireEvent.click(screen.getByTestId("day-block1"))



  expect(screen.getByTestId('event-dialog')).toHaveTextContent('save!')
})