import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import EmployeeList from "./Components/EmployeeList";
import EmployeeReg from "./Components/EmployeeReg";
import EmployeeSelector from "./Components/EmployeeSelector";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [], // Employee data will be stored here
      selectedEmployee: null,
    };
  }

  editEmployee = (employee) => {
    this.setState({ selectedEmployee: employee });
    console.log(employee);
  };

  componentDidMount() {
    // Fetch employee data and set it in the state
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    // Fetch employee data from your API or source
    // For example, you can use axios or fetch here
    // After fetching, update the employees state

    // Example using fetch:
    fetch("https://sweede.app/DeliveryBoy/Get-Employee/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data });
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
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
              <li>
                <Link to="/employee-selector">Employee Selector</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={<EmployeeReg selectedEmployee={this.state.selectedEmployee} />}
            />
            <Route
              path="/employee-list"
              element={
                <EmployeeList
                  editEmployee={this.editEmployee}
                  employees={this.state.employees} // Pass employee data
                />
              }
            />
            <Route
              path="/employee-selector"
              element={
                <EmployeeSelector
                  selectedEmployee={this.state.selectedEmployee}
                  employees={this.state.employees} // Pass employee data
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
