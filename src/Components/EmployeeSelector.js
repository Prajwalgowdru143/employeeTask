import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './EmployeeSelector.css'
class EmployeeSelector extends Component {
    constructor(props) {
        super(props); // Call super() once at the beginning
        this.state = {
          selectedEmployee: null,
          selectedDate: null,
        };
      }

  handleEmployeeChange = (selectedOption) => {
    this.setState({ selectedEmployee: selectedOption });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedEmployee, selectedDate } = this.state;
    const { employees } = this.props; // Receive employees prop

    // Map employee data to options for the Select component
    const employeeOptions = employees.map((employee) => ({
      value: employee.id,
      label: `${employee.FirstName} ${employee.LastName}`,
    }));

    return (
      <div className="employee-selector-container">
        <h2>Select Employee and Date</h2>
        <div className="employee-selector">
          <div style={{width:"50vw"}} className="form-group">
            <label>Select Employee:</label>
            <Select
              value={selectedEmployee}
              onChange={this.handleEmployeeChange}
              options={employeeOptions} // Use employeeOptions here
            />
          </div>
          <div className="form-group">
            <label>Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={this.handleDateChange}
              dateFormat="dd/MM/yyyy" // You can customize the date format
            />
          </div>
        </div>
        <div className="form-group">
          <label>Selected Date:</label>
          <input
            type="text"
            value={selectedDate ? selectedDate.toLocaleDateString() : ""}
            readOnly
          />
        </div>
      </div>
    );
  }
}

export default EmployeeSelector;
