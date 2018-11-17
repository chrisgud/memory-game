import React, { Component } from 'react';
import Wrapper from './components/Wrapper';
import Portrait from './components/Portrait';
import './App.css';
import portraits from './portraits.json';
import {
  Navbar,
  Container,
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPortraits: [],
      myPortraits: portraits,
      score: 0,
      topScore: 0
    }
  }

  shufflePortraits = (input) => {

    for (let i = input.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }

    return input;
  }

  handlePortraitClick = id => {
    if (this.state.clickedPortraits.includes(id)) {
      this.handleLoss();
    } else {
      this.state.clickedPortraits.push(id);
      this.setState({ score: this.state.score + 1});
      if(parseInt(this.state.score + 1) === parseInt(this.state.myPortraits.length)) {
        this.handleWin();
      }
      const scrambledPortraits = this.shufflePortraits(this.state.myPortraits);
      this.setState({ myPortraits: scrambledPortraits });
    }
  }
  handleWin = () => {
    const newState = {
      clickedPortraits: [],
      myPortraits: portraits,
      score: 0,
      topScore: 0
    }
    alert('YOU WIN! Top score reset');
    this.setState(newState);
  }

  handleLoss = () => {
    if(this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score})
    }
    alert('YOU LOSE');
    const newState = {
      clickedPortraits: [],
      myPortraits: portraits,
      score: 0,
    }
    this.setState(newState);
  }


  render() {
    return (
      <div>
        <Navbar color="inverse" light expand="md">
          <ul>
            <li className='brand'>Memory Clicks</li>
            <li>Click an image to begin!</li>
            <li>Top Score: {this.state.topScore}  |  Score: {this.state.score}</li>
          </ul>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col className='text-center'>
                <h1>Memory Clicks!</h1>
                <br />
                <p>
                  Click on an image to earn points, but don't click on any more than once!
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <Wrapper>
            {
              this.state.myPortraits.map(portrait => (
                <Portrait
                  id={portrait.id}
                  key={portrait.id}
                  name={portrait.name}
                  image={portrait.image}
                  scramble={this.handlePortraitClick}
                />))
            }
            {/* Game Div Here Probably */}
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default App;