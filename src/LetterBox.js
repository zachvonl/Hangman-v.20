import React from 'react';

class LetterBox extends React.Component {
  render() {
    const { letter, isVisible, boxStyle, letterStyle, onClick } = this.props;

    const defaultBoxStyle = {
      border: '3px solid black',
      width: '30px',
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer', // Add pointer cursor
    };

    const defaultLetterStyle = {
      visibility: isVisible ? 'visible' : 'hidden',
    };

    const combinedBoxStyle = { ...defaultBoxStyle, ...boxStyle };
    const combinedLetterStyle = { ...defaultLetterStyle, ...letterStyle };

    return (
      <div style={combinedBoxStyle} onClick={onClick}>
        <span style={combinedLetterStyle}>{letter}</span>
      </div>
    );
  }
}

export default LetterBox;