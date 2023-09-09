import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import EmployeeList from "./Components/EmployeeList";
import EmployeeReg from "./Components/EmployeeReg";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedEmployee: null,
    };
  }

  editEmployee = (employee) => {
    this.setState({ selectedEmployee: employee });
    console.log(employee);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/employee-list">Employee List</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<EmployeeReg selectedEmployee={this.state.selectedEmployee}  />} />
            <Route path="/employee-list" element={<EmployeeList editEmployee={this.editEmployee} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
