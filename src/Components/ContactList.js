import React, { useRef } from "react";
import userIcon from "../Images/userIcon.png";
import { Link } from "react-router-dom";
import MyModal from "./Modal";
import { Modal, Icon, Button } from "semantic-ui-react";
//import { SizedBox } from "../Style/Styles";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false, // State variable to control the modal
      contactToDelete: null, // Store the contact to delete
    };
    this.inputText=React.createRef()
  }
  // Function to open the modal and set the contact to delete
  openModal = (contact) => {
    this.setState({ modalOpen: true, contactToDelete: contact });
  };
  // Function to close the modal
  closeModal = () => {
    this.setState({ modalOpen: false, contactToDelete: null });
  };
  // Function to handle contact deletion
  handleContactDeletion = () => {
    const { contactToDelete } = this.state;
    if (contactToDelete) {
      this.props.removeContactHandler(contactToDelete.id, contactToDelete.name);
    }
    this.closeModal(); // Close the modal after deletion
  };
 getSearchResults =() => {this.props.handleSearch(this.inputText.current.value)}
  render() {
    const { modalOpen } = this.state;
    const renderContactList=this.props.contactList.map((contact) => (
      <ContactCard
        contactInfo={contact}
        key={contact.id}
        removeContact={this.props.removeContactHandler}
        openModal={() => this.openModal(contact)}
      />
    ))
    return (
      <div className="ui container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Contact List</h1>
          <Link to="/add">
            <button className="ui button green"> Add Contact</button>
          </Link>
        </div>
        <div className="ui search">
          <div className="ui icon input" style={{ width: "100%" }}>
            <input
            ref={this.inputText}
              className="prompt"
              type="text"
              placeholder="Search Contacts"
              value={this.props.searchTerm}
              onChange={this.getSearchResults}
            />
            <i className="search icon" />
          </div>
        </div>
        {renderContactList.length>0?renderContactList:"No Contacts"}
        <MynewModal
          modalOpen={modalOpen}
          closeModal={this.closeModal}
          handleContactDeletion={this.handleContactDeletion}
        />
      </div>
    );
  }
}

export default ContactList;

const ContactCard = ({ contactInfo, removeContact, openModal }) => {
  return (
    <div className="ui celled list">
      <div
        className="item items" // Add the "items" class here
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          {" "}
          <img
            className="ui avatar image"
            src={userIcon}
            style={{
              fontSize: "20px",
              paddingTop: "1px",
              marginRight: "10px",
            }}
          />
          <Link
            to={`/contact/${
              contactInfo.id + "=" + contactInfo.name + "=" + contactInfo.email
            }`}
            state={{ contactInfo }}
            key={contactInfo.id}
          >
            <div className="content">
              <div className="header">
                <p>{contactInfo.name}</p>
              </div>
              <div>
                <p>{contactInfo.email}</p>
              </div>
            </div>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end", // Align icons to the right
          }}
        >
          <Link to={`/edit/${contactInfo.id}`}>
            {" "}
            <i
              className="ui edit icon"
              style={{
                color: "green",
                fontSize: "20px",
                paddingTop: "10px",
                cursor: "pointer",
              }}
            />
          </Link>
          <i
            className="trash alternate outline icon"
            style={{
              marginLeft: "10px", // Add some spacing between the icons
              color: "red",
              fontSize: "20px",
              paddingTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              openModal();
              // Handle delete action
            }}
          />
        </div>
      </div>
    </div>
  );
};

const MynewModal = ({ modalOpen, closeModal, handleContactDeletion }) => {
  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Modal.Header>Confirm Deletion</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this contact?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleContactDeletion}>
          <Icon name="trash" /> Delete
        </Button>
        <Button color="blue" onClick={closeModal}>
          <Icon name="cancel" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
