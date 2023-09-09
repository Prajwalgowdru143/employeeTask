import React, { Component } from "react";
import "./EmployeeReg.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; 
import { toast } from "react-toastify"; 

class EmployeeReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      DOB: "",
      Study: "",
      StartDate: "",
      EndDate: "",
      CurrentSalary: "",
      Description: "",
    };
  }

  componentDidUpdate(prevProps) {
    // Check if the selected employee prop has changed
    if (this.props.employee !== prevProps.employee) {
      // Populate the form fields with the selected employee's data
      const selectedEmployee = this.props.employee;
      if (selectedEmployee) {
        this.setState({
          FirstName: selectedEmployee.firstname,
          LastName: selectedEmployee.lastname,
          DOB: selectedEmployee.dob,
          Study: selectedEmployee.study,
          StartDate: selectedEmployee.startdate,
          EndDate: selectedEmployee.enddate,
          Description: selectedEmployee.description,
        });
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    // Prepare the employee data to send to the API
    const {
      FirstName,
      LastName,
      DOB,
      Study,
      StartDate,
      EndDate,
      CurrentSalary,
      Description,
    } = this.state;

    const employeeData = {
      FirstName: FirstName,
      LastName: LastName,
      DOB: DOB,
      Study: Study,
      StartDate: StartDate,
      EndDate: EndDate,
      CurrentSalary: CurrentSalary,
      Description: Description,
    };

    // Send a POST request to add the employee data
    axios
      .post("https://sweede.app/DeliveryBoy/Add-Employee/", employeeData)
      .then((response) => {
        const status = `${response.status} ${response.statusText}`;

        toast.info(`Response Status: ${status}`);

        console.log("Employee data added successfully:", response.data);

        this.handleCancel();
      })
      .catch((error) => {
        const status = error.response
          ? `${error.response.status} ${error.response.statusText}`
          : "Unknown Error";

        toast.error(`Response Status: ${status}`);

        console.error("Error adding employee data:", error);
      });
  };

  handleCancel = () => {
    this.setState({
      FirstName: "",
      LastName: "",
      DOB: "",
      Study: "Select a Study",
      StartDate: "",
      EndDate: "",
      CurrentSalary:"",
      Description: "",
    });
  };

  render() {
    const { Study } = this.state;
    return (
      <div>
        <h1>Employee Registration Form</h1>
        <form>
          <div className="box">
            <div className="form-group">
              <label>First Name*</label>
              <input
                type="text"
                name="FirstName"
                value={this.state.FirstName}
                onChange={this.handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                name="LastName"
                value={this.state.LastName}
                onChange={this.handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="DOB"
              value={this.state.DOB}
              onChange={this.handleChange}
              placeholder="Enter the DOB"
            />
          </div>



          <div className="form-group">
            <label htmlFor="Study">Study</label>
            <select
              id="Study"
              name="Study"
              value={Study}
              onChange={this.handleChange}
              required
            >
              <option value="Select a Study" disabled>
                Select a Study
              </option>
              <option value="M-Tech">M-Tech</option>
              <option value="BE/B-Tech">BE/B-Tech</option>
              <option value="BCA">BCA</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="box">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="StartDate"
                value={this.state.StartDate}
                onChange={this.handleChange}
                placeholder="Enter StartDate"
              />
            </div>
            <div className="form-group">
              <label>End Date</label>

              <input
                type="date"
                name="EndDate"
                value={this.state.EndDate}
                onChange={this.handleChange}
                placeholder="Enter EndDate"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Current Salary</label>
            <input
              type="number"
              name="CurrentSalary"
              value={this.state.CurrentSalary}
              onChange={this.handleChange}
              placeholder="CurrentSalary"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="Description"
              value={this.state.Description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={this.handleCancel}>
              Cancel
            </button>
            <button style={{backgroundColor:'#142A51',color:"white"}} type="button" onClick={this.handleSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EmployeeReg;
