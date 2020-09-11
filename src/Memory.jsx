import React, { PureComponent } from 'react';
import Card from './Card';
import './Memory.scss';

const cards = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z',
];

const hexRainbow = [
  '#ff0000',
  '#b1978e',
  '#ff8500',
  '#ebe939',
  '#7fff00',
  '#ffd700',
  '#00BFFF',
  '#808000',
  '#008000',
  '#0d98ba',
  '#0000ff',
  '#4b0082',
  '#ee82ee',
  '#a358e8',
  '#cf71af',
  '#532915',
  '#808080',
  '#000000',
];

const generateCard = (face, pairIndex, index) => ({
  flipped: false,
  matched: false,
  face,
  key: `${face}${pairIndex}`,
  color: hexRainbow[index],
});

// use of sort to suffle is not very good
const suffle = () => 0.5 - Math.random();
const genBoard = () => cards
  .sort(suffle)
  .slice(0, 18)
  .reduce(
    (acc, c, i) => [
      ...acc,
      generateCard(c, 1, i),
      generateCard(c, 2, i),
    ],
    [],
  )
  .sort(suffle)
  .sort(suffle);

class Memory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      board: genBoard(),
      turns: 0,
      lockInput: false,
    };
  }

  handleClick(key) {
    const {
      board,
      turns,
    } = this.state;
    const card = board.filter((c) => c.key === key)[0];
    const previousFlipped = board.filter((c) => c.flipped)[0];
    const delay = 1500;
    if (card && !card.flipped && !card.matched) {
      if (previousFlipped && previousFlipped.face === card.face) {
        // delay and match found
        this.setState({
          turns: turns + 1,
          lockInput: false,
          board: board.reduce((acc, c) => [
            ...acc,
            (
              c.key === card.key || c.key === previousFlipped.key
                ? { ...c, flipped: false, matched: true }
                : c
            ),
          ], []),
        });
      } else if (previousFlipped) {
        // delay than flip back
        this.setState({
          turns: turns + 1,
          lockInput: true,
          board: board.reduce((acc, c) => [
            ...acc,
            (
              c.key === card.key
                ? { ...c, flipped: true, matched: false }
                : c
            ),
          ], []),
        });
        setTimeout(() => this.setState({
          turns: turns + 1,
          lockInput: false,
          board: board.reduce((acc, c) => [
            ...acc,
            (
              c.key === card.key || c.key === previousFlipped.key
                ? { ...c, flipped: false, matched: false }
                : c
            ),
          ], []),
        }), delay);
      } else {
        // flip first of turn
        this.setState({
          board: board.reduce((acc, c) => [
            ...acc,
            (
              c.key === card.key
                ? { ...c, flipped: true, matched: false }
                : c
            ),
          ], []),
        });
      }
    }
  }

  render() {
    const {
      board,
      turns,
      lockInput,
    } = this.state;
    return (
      <main id="memory">
        <header>
          <div className="controls">
            <h3>Memory</h3>
            <button
              type="button"
              className="ng-button"
              onClick={() => this.setState({
                board: genBoard(),
                turns: 0,
                lockInput: false,
              })}
            >
              New game
            </button>
          </div>
          <span>
            Number of turns
            &nbsp;
            <b>
              {turns}
            </b>
          </span>
        </header>
        <section className="board">
          {board.map((c) => (
            <Card
              key={c.key}
              flipped={c.flipped}
              matched={c.matched}
              face={c.face}
              color={c.color}
              handle={lockInput ? () => {} : () => this.handleClick(c.key)}
            />
          ))}
        </section>
      </main>
    );
  }
}

export default Memory;
