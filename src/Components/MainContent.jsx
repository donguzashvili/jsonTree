import React from "react";
import "../style/MainContent.css";
import Card from "./Card";

export default class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: 2,
    };
  }
  //check quantity of data if its one data we dont need MAP to handle like array
  checkQuantity() {
    if (this.props.data) {
      if (this.props.selectedStudent !== null) {
        this.setState({ Data: 1 });
      } else {
        this.setState({ Data: 2 });
      }
    }
  }

  render() {
    return (
      <div className="MainContent">
        {!this.props.data //if data loaded
          ? "loading..."
          : [
              //if there one data and input is not empty
              this.props.selectedStudent !== "" && this.props.input !== "" ? (
                <Card
                  data={this.props.selectedStudent}
                  key={this.props.selectedStudent.id}
                />
              ) : (
                this.props.data.map((item, key) => {
                  return <Card data={item} key={key} />;
                })
              ),
            ]}
      </div>
    );
  }
}
