import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import Utils from '../utils'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { shallow, mount } from '../enzyme';
import { configure } from '@testing-library/dom'
configure({ testIdAttribute: 'id' })

it("Render callendar with Success", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div)

})
it("Add Event at first callendar square", () => {
    render(<App />)
    fireEvent.click(screen.getByTestId("day-block1"))

    expect(screen.getAllByTestId('event-dialog')[0]).toHaveTextContent('New Event')

    const description = screen.getAllByTestId('description')[0]
    fireEvent.change(description, { target: { value: 'Fake Event' } })

    const title = screen.getAllByTestId('title')[0]
    fireEvent.change(title, { target: { value: 'Fake Title' } })

    const city = screen.getAllByTestId('city')[0]
    fireEvent.change(city, { target: { value: 'Fake Title' } })

    const color = screen.getAllByTestId('color')[0]
    fireEvent.change(color, { target: { value: '#FAA1A1' } })

    const save = screen.getAllByTestId('save')[0]

    fireEvent.click(save)
    expect(screen.getAllByTestId('event-Fake-Title')[0])
        .toHaveTextContent('Fake Title')

    expect(screen.getAllByTestId('event-Fake-Title')[0])
        .toHaveStyle(`background: #FAA1A1; color:${Utils.invertColor('#FAA1A1', true)}`);
})

it("Add and remove Event at first callendar square", () => {
    render(<App />)
    fireEvent.click(screen.getByTestId("day-block1"))

    expect(screen.getAllByTestId('event-dialog')[0]).toHaveTextContent('New Event')

    const description = screen.getAllByTestId('description')[0]
    fireEvent.change(description, { target: { value: 'Fake Event' } })

    const title = screen.getAllByTestId('title')[0]
    fireEvent.change(title, { target: { value: 'Fake Title' } })

    const city = screen.getAllByTestId('city')[0]
    fireEvent.change(city, { target: { value: 'Fake Title' } })

    const color = screen.getAllByTestId('color')[0]
    fireEvent.change(color, { target: { value: '#FAA1A1' } })

    const save = screen.getAllByTestId('save')[0]

    fireEvent.click(save)
    expect(screen.getAllByTestId('event-Fake-Title')[0])
        .toHaveTextContent('Fake Title')

    expect(screen.getAllByTestId('event-Fake-Title')[0])
        .toHaveStyle(`background: #FAA1A1; color:${Utils.invertColor('#FAA1A1', true)}`);

    expect(screen.getAllByTestId('day-block1')[0]).toHaveTextContent('Fake Title');
    fireEvent.click(screen.getAllByTestId('event-Fake-Title')[0])
    fireEvent.click(screen.getAllByTestId('delete')[0])

    expect(screen.getAllByTestId('day-block1')[0]).not.toHaveTextContent('Fake Title');


})