import React from "react";
import "./App.css";
import Header from "./Components/Header";
import MainContent from "./Components/MainContent";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null,
      search: "",
      ID: true,
      name: false,
      gender: false,
      selectedStudent: "",
    };
    this.updateId = this.updateId.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }
  //fetch data
  componentDidMount() {
    let api = "http://localhost:3000/course";
    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ student: data[0].student });
      });
  }
  //update current state from child component
  updateSearch(data) {
    this.setState({ search: data });
  }
  updateId(data) {
    this.setState({ ID: data });
  }
  updateName(data) {
    this.setState({ name: data });
  }
  updateGender(data) {
    this.setState({ gender: data });
  }

  //update current component if its not updated
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.ID !== prevState.ID ||
      this.state.name !== prevState.name ||
      this.state.gender !== prevState.gender
    ) {
      this.setState({ ID: this.state.ID });
      this.setState({ name: this.state.name });
      this.setState({ gender: this.state.gender });
    }
    if (this.state.search !== prevState.search) {
      this.setState({ search: this.state.search });
      this.searchResults();
    }
  }
  searchResults() {
    let data = this.state.student;
    let input = this.state.search;
    //check if id is checked
    if (this.state.ID === true) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id.toLowerCase().includes(input.toLowerCase())) {
          this.setState({ selectedStudent: data[i] });
        }
      }
    }
    //check if name is checked
    else if (this.state.name === true) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(input.toLowerCase())) {
          this.setState({ selectedStudent: data[i] });
        }
      }
    }
    //check if gender is checked
    else if (this.state.gender === true) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].gender.toLowerCase().includes(input.toLowerCase())) {
          console.log(data[i].startsWith("a"));
          this.setState({ selectedStudent: data[i] });
        }
      }
    }
    //ignore checkbox
    else {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].gender.toLowerCase().includes(input.toLowerCase()) ||
          data[i].name.toLowerCase().includes(input.toLowerCase()) ||
          data[i].id.toLowerCase().includes(input.toLowerCase())
        ) {
          this.setState({ selectedStudent: data[i] });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Header
          search={this.updateSearch}
          id={this.updateId}
          name={this.updateName}
          gender={this.updateGender}
        />
        <MainContent
          data={this.state.student}
          selectedStudent={this.state.selectedStudent}
          input={this.state.search}
        />
      </div>
    );
  }
}
