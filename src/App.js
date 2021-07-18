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
      array: [],
      key: 0,
    };

    this.updateId = this.updateId.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.filterSearchByID = this.filterSearchByID.bind(this);
    this.filterSearchByName = this.filterSearchByName.bind(this);
    this.filterSearchByGender = this.filterSearchByGender.bind(this);
  }

  //fetch data
  componentDidMount() {
    let api =
      "https://my-json-server.typicode.com/Donguzashvili/FakeBack/course";
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
  //filter data by id
  filterSearchByID() {
    for (let i = 0; i < this.state.student.length; i++) {
      if (this.state.student[i].id.indexOf(this.state.search) !== -1) {
        this.setState({ selectedStudent: this.state.student[i] });
      }
    }
  }
  //filter data by name
  filterSearchByName() {
    for (let i = 0; i < this.state.student.length; i++) {
      if (this.state.student[i].name.indexOf(this.state.search) !== -1) {
        this.setState({ selectedStudent: this.state.student[i] });
      }
    }
  }
  //filter data by gender
  filterSearchByGender() {
    for (let i = 0; i < this.state.student.length; i++) {
      if (this.state.student[i].gender.indexOf(this.state.search) !== -1) {
        this.setState({ selectedStudent: this.state.student[i] });
      }
    }
  }
  advancedSearch() {
    let data = this.state.student;
    //if data is array
    if (data.constructor === Array) {
      //open it
      for (let i = 0; i < data.length; i++) {
        //every element in object
        for (let item in data[i]) {
          //if any of this element is equal to search input select this data and is not link
          if (
            data[i][item].includes(this.state.search) !== false &&
            !data[i][item].startsWith("http")
          ) {
            this.setState({ selectedStudent: data[i] });
          }
          // if there was not what we were looking for and there is array
          else if (data[i][item].constructor === Array) {
            //open it
            for (let j = 0; j < data[i][item].length; j++) {
              //search in object
              for (let key in data[i][item][j]) {
                //if any of this element type is not equal to object type and there is what we looking for search input select this data
                if (
                  typeof data[i][item][j][key] !== "object" &&
                  data[i][item][j][key].includes(this.state.search) !== false
                ) {
                  this.setState({ selectedStudent: data[i] });
                } //if there was not what we were looking for and there is object
                else if (typeof data[i][item][j][key] === "object") {
                  //open object
                  for (let last in data[i][item][j][key]) {
                    //if any of this element equal to search input selec tthis data
                    if (
                      data[i][item][j][key][last].includes(
                        this.state.search
                      ) !== false
                    ) {
                      this.setState({ selectedStudent: data[i] });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  searchResults() {
    //check if id is checked
    if (this.state.ID === true) {
      this.filterSearchByID();
    }
    //check if name is checked
    else if (this.state.name === true) {
      this.filterSearchByName();
    }
    //check if gender is checked
    else if (this.state.gender === true) {
      this.filterSearchByGender();
    }
    //ignore checkbox
    else {
      this.advancedSearch();
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
