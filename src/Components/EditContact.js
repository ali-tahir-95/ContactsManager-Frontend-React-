import React, { useState, useEffect } from "react";
import { Divider, Input, Label } from "semantic-ui-react";
import { SizedBox, dFlexCol, labelStyle } from "../Style/Styles";
import { useParams } from "react-router-dom";

const EditContact = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // You can fetch the current contact's name using id here
    const thisContact = props.contactList.find((contact) => contact.id === id);

    if (thisContact) {
      setName(thisContact.name); // Set the name state with the current contact's name
      setEmail(thisContact.email);
    }
  }, [id, props.contactList]);

  const navigateToHome = () => {
    props.navigate("/");
  };

  return (
    <div className="ui container main">
      <h2>Edit this Contact</h2>
      <form className="ui form" onSubmit={(event) => {
          try { event.preventDefault();
            // if (this.state.name === "" || this.state.email === "") {
            //   alert("Both Fields Required");
            //   return;
            // }
          props.updateHandler({name,email},id);            
          navigateToHome();
          //  setEmail("")
          //  setName("")
          }
            catch{console.log("")}
          }}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button violet">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditContact;
