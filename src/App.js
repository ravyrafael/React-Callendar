import './App.css';
import React from 'react';
import styled from 'styled-components';
import Callendar from './components/callendar/Callendar'
import { Provider } from "react-redux";
import store from './stores/'

export const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  padding:30px;

`

export default function App() {


  return (
    <Provider store={store} data-testid="App">
      <Container>
        <Callendar/>
      </Container>
      </Provider>

  );
}

