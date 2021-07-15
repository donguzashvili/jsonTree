import React from "react";
import "../style/Header.css";
import Logo from "../style/image/logo.png";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: true,
      name: null,
      gender: null,
    };
    this.search = this.search.bind(this);
  }
  search() {
    let input = document.getElementById("search");
    this.props.search(input.value);
  }
  updateId = () => {
    let id = document.getElementById("id");
    if (id.checked === true) {
      this.props.id(true);
    } else {
      this.props.id(false);
    }
  };
  updateName = () => {
    let name = document.getElementById("name");

    if (name.checked === true) {
      this.props.name(true);
    } else {
      this.props.name(false);
    }
  };
  updateGender = () => {
    let gender = document.getElementById("gender");

    if (gender.checked === true) {
      this.props.gender(true);
    } else {
      this.props.gender(false);
    }
  };

  render() {
    return (
      <div className="headerWrapper">
        <div className="content">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <form onInput={this.search}>
            <div className="search">
              <input id="search" type="text" placeholder="Search..." />
              <button>Search</button>
            </div>
          </form>

          <div className="menu">
            <p>Home</p>
            <p>Contact</p>
            <p>About</p>
          </div>
        </div>
        <div className="options">
          <label htmlFor="id">
            <p>Search By ID</p>
            <input
              type="checkbox"
              id="id"
              defaultChecked
              onChange={this.updateId}
            />
          </label>
          <label htmlFor="name">
            <p>Search By Name</p>
            <input type="checkbox" id="name" onChange={this.updateName} />
          </label>
          <label htmlFor="gender">
            <p>Search By Gender</p>
            <input type="checkbox" id="gender" onChange={this.updateGender} />
          </label>
        </div>
      </div>
    );
  }
}
