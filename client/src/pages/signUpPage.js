import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Navbar"
import { Redirect } from "react-router-dom";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            mainPlatform: "",
            redirect: null
        }
    }
            handleInputChange = event => {
                let value = event.target.value;
                const name = event.target.name;
    
                if (name === "password" ) {
                    value = value.substring(0, 15);
                } 
                this.setState({
                    [name]: value
                });
            };

            handleFormSubmit = event => {
                event.preventDefault();
                if (!this.state.firstName || !this.state.lastName) {
                    alert("Please fill out your first and last name.")
                } else if (this.state.password.length < 10) {
                    alert(`Password must be 10 characters long ${this.state.firstName}`)
                } else {
                    alert(` Welcome to SandBox ${this.state.userName}`)
                    api.addUser({
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            email: this.state.email,
                            userName: this.state.userName,
                            password: this.state.password,
                            mainPlatform: this.state.mainPlatform
                        }) .then(console.log("User Added"))
                            .catch((error) => console.log(error))
                    this.setState({ redirect: "/pages/profilePage"})
                }
                
            }

    render() {
            if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
            }
        return (
            <div>
                <Container fluid>
                <Row>
                    <Col size = "md-12">
                        <Nav/>
                    </Col>
                </Row>
                <Row>
                    <Col size = "12">
                        <Jumbotron> <h1>Welcome to SandBox, </h1><h1> Create an Accout below!</h1></Jumbotron>
                    </Col>
                </Row>
                
                <form className="form">
                    <Col size = "md-10">
                    <input 
                        value = {this.state.firstName} 
                        name = "firstName" 
                        onChange = {this.handleInputChange}
                        type = "text"
                        placeholder = "First Name"
                    />
                    </Col>
                    <Col size = "md-10">
                    <input 
                        value = {this.state.lastName} 
                        name = "lastName" 
                        onChange = {this.handleInputChange}
                        type = "text"
                        placeholder = "Last Name"
                    />
                    </Col>
                    <Col size = "md-10">
                    <input 
                        value = {this.state.email} 
                        name = "email" 
                        onChange = {this.handleInputChange}
                        type = "email"
                        placeholder = "example@email.com"
                    />
                    </Col>
                    <Col size = "md-10">
                    <input 
                        value = {this.state.userName} 
                        name = "userName" 
                        onChange = {this.handleInputChange}
                        type = "text"
                        placeholder = "User Name"
                    />
                    </Col>
                    <Col size = "md-10">
                    <input 
                        value = {this.state.password} 
                        name = "password" 
                        onChange = {this.handleInputChange}
                        type = "password"
                        placeholder = "Password"
                    />
                    </Col>
                    <Col size = "md-10">
                    <input 
                        value = {this.state.mainPlatform} 
                        name = "mainPlatform" 
                        onChange = {this.handleInputChange}
                        type = "text"
                        placeholder = "Playstation, Xbox, or P.C."
                    />
                    </Col>
                    < button onClick = {this.handleFormSubmit}>Create Account</button>
                </form>
                
            </Container>
            </div>
        )
    }
}

export default SignUpPage;