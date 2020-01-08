import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.genClick = this.genClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  genClick(event) {
    event.preventDefault();
    const randNumber = Math.round(Math.random() * 100 - 1);
    const newImg = this.state.allMemeImgs[randNumber].url;

    this.setState({
      randomImg: newImg
    });
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(resp => resp.json())
      .then(resp => {
        const { memes } = resp.data;
        this.setState({
          allMemeImgs: memes
        });
      });
  }

  render() {
    return (
      <div>
        <form className="meme-form">
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange}
            placeholder="Top text"
          />
          <input
            type="text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
            placeholder="Bottom text"
          />
          <button onClick={this.genClick}>Gen</button>
        </form>
        <div className="meme">
          <img align="center" src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
