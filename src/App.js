import './App.css';
import React from 'react';
import styled from 'styled-components';
import Callendar from './components/Callendar'
export const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  padding:30px;

`

export default function App() {


  return (
      <Container>
        <Callendar/>
      </Container>

  );
}

