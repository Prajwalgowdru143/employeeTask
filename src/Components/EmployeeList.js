import React, { Component } from "react";
import "./EmployeeList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify"; 
import { Link } from "react-router-dom";


class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      contextMenuVisible: false, 
      contextMenuPosition: { top: 0, left: 0 }, 
      activeEmployeeId: null, 
    };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    axios
      .get("https://sweede.app/DeliveryBoy/Get-Employee/")
      .then((response) => {
        const employees = response.data;
        this.setState({ employees });
        console.log(employees);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  toggleContextMenu = (e, employeeId) => {
    e.preventDefault();
    const position = { top: e.pageY, left: e.pageX };
    this.setState({
      contextMenuVisible: !this.state.contextMenuVisible,
      contextMenuPosition: position,
      activeEmployeeId: employeeId,
    });
  };

  hideContextMenu = () => {
    this.setState({
      contextMenuVisible: false,
    });
  };

  handleView = (employeeId) => {
    console.log(`View employee with ID ${employeeId}`);
    this.hideContextMenu();
  };

  handleEdit = (employeeId) => {
    const selectedEmployee = this.state.employees.find(
      (employee) => employee.id === employeeId
    );

    this.props.editEmployee(selectedEmployee);
    this.hideContextMenu();
  };

  handleDelete = (employeeId) => {
    axios
      .delete(`https://sweede.app/DeliveryBoy/delete-Employee/${employeeId}`)
      .then((response) => {
        console.log("Employee deleted successfully:", response.data);
        
        this.setState((prevState) => ({
          employees: prevState.employees.filter(
            (employee) => employee.id !== employeeId
          ),
        }));

        toast.success("Employee deleted successfully");
      })
      .catch((error) => {

        toast.error("Error deleting employee");
        console.error("Error deleting employee:", error);
      });
  };

  render() {
    const { employees } = this.state;

    return (
      <div style={{width:'80vw', marginLeft:"12%"}}>
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{`${employee.FirstName} ${employee.LastName}`}</td>
                <td>{employee.DOB}</td>
                <td>{employee.StartDate}</td>
                <td>{employee.EndDate}</td>
                <td>
                  <div className="description">{employee.Description}</div>
                </td>
                <td>
                  <div
                    className="three-dots-menu"
                    onClick={(e) => this.toggleContextMenu(e, employee.id)}
                  >
                    
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.contextMenuVisible && (
          <div
            className="context-menu"
            style={{
              top: this.state.contextMenuPosition.top,
              left: this.state.contextMenuPosition.left,
            }}
          >
            <ul>
              <li onClick={() => this.handleView(this.state.activeEmployeeId)}>
                View
              </li>
              <li style={{textDecoration:"none"}} onClick={() => this.handleEdit(this.state.activeEmployeeId)}>
                <Link to="/"  selectedEmployee={this.state.selectedEmployee} >
                <FontAwesomeIcon icon={faEdit}/>
                  Edit</Link>
              </li>
              <li
                onClick={() => this.handleDelete(this.state.activeEmployeeId)}
              >
                <FontAwesomeIcon icon={faTrash} />
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default EmployeeList;
