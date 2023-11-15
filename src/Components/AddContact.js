import React from "react";
import { Divider, Input, Label } from "semantic-ui-react";
import { SizedBox, dFlexCol, labelStyle } from "../Style/Styles";
import { Route } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };
  navigateToHome = () => {
    this.props.navigate("/");
  };
  render = () => {
    return (
      <div className="ui container main">
        <h2>Add Contact</h2>
        <form
          className="ui form"
          onSubmit={(event) => {
            event.preventDefault();
            if (this.state.name === "" || this.state.email === "") {
              alert("Both Fields Required");
              return;
            }
            this.props.contactsHandler(this.state);
            this.setState(() => ({ name: "", email: "" }));
            this.navigateToHome();
          }}
        >
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={(text) =>
                this.setState(() => ({ name: text.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={(text) =>
                this.setState(() => ({ email: text.target.value }))
              }
            />
          </div>
          <button className="ui button green">Add</button>
        </form>
      </div>
    );
  };
}
export default AddContact;

// <form className="ui container">
//  <h2 style={{fontSize:'20px'}}>Add Contact</h2>
//  <div style={dFlexCol} className="ui container">
//     <Label style={labelStyle} className="ui center aligned">Name</Label>
//     <Input type="text" placeholder="Enter Name" ></Input>
//  </div>
//  <SizedBox h='20px'/>
//  <div style={dFlexCol} className="ui container">
//     <Label style={labelStyle} className="ui center aligned">Email</Label>
//     <Input type="email" placeholder="Enter Email" ></Input>
//  </div>
// </form>
