import React from "react";
import Header from "../../Components/Header";
import AddContact from "../../Components/AddContact";
import ContactList from "../../Components/ContactList";
import { v4 as uuid } from "uuid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactDetail from "../../Components/ContactDetail";
import MyModal from "../../Components/Modal";
import { SizedBox } from "../../Style/Styles";
import api from "../../Api/Contacts.js";
import EditContact from "../../Components/EditContact";
class Home extends React.Component {
  state = {
    contactList: [],
    searchTerm: "",
    searchResult: "",
  };
  retrieveContacts = async () => {
    const contacts = await api.get("/contacts");
    return contacts.data;
  };
  componentDidMount = async () => {
    // DATA FROM API
  try { const contactVar = await this.retrieveContacts();
    this.setState(() => ({ contactList: contactVar }));}
    catch(e){
      console.log(e)
    }
    // DATA FROM LOCAL STORAGE
    // const contactVar = JSON.parse(localStorage.getItem("contactList"));
    // if (contactVar != null) {
    //   this.setState(() => ({ contactList: contactVar }));
    // }
  };
  componentDidUpdate(prevProps, prevState) {
    // if (prevState.contactList !== this.state.contactList) {
    //   localStorage.setItem(
    //     "contactList",
    //     JSON.stringify(this.state.contactList)
    //   );
    // }
  }
  render = () => {
    
    // Function to Extract Data from AddContact Component
    const contactsHandler = async (value) => {
      const request = { id: uuid(), ...value };
      try {
        const response = await api.post("/contacts", request);
        const responseData = response.data;
        this.setState((oldState) => ({
          contactList: [...oldState.contactList, responseData],
        }));
        console.log(responseData);
      } catch (error) {
        console.error('Error adding contact:', error);
        // Handle the error here, e.g., display an error message to the user
      }
    };
    const updateHandler= async (value,uid) => {
      
    const  response= await api.put(`/contacts/${uid}`,value)
    const {id,name,email}=response.data;
      this.setState(()=>({contactList:this.state.contactList.map((contact)=>{return contact.id===id?{...response.data}:contact})}))
    }
    // Function to give id to AddContact Component and create new list without that id
    const removeContactHandler = async(id, object) => {
       await api.delete(`/contacts/${id}`);
      const newContactList = this.state.contactList.filter((contact) => {
        return contact.id !== id;
      });
      this.setState(() => ({ contactList: newContactList }));
    };
    const handleSearch=(term) => {
      this.setState(()=>({searchTerm:term}))
      if(this.state.searchTerm!==""){
        const newContactList=this.state.contactList.filter(contact =>{
          return Object.values(contact).join("").toLocaleLowerCase().includes(this.state.searchTerm.toLocaleLowerCase())
        })
        this.setState(()=>({searchResult:newContactList}))
      }else {this.setState(()=>({searchResult:this.state.contactList}))}
    }
    //
    return (
      <div>
        <Header />
        <SizedBox h="50px" />
        {/* Using React Router DOM v6.15 */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ContactList
                  contactList={this.state.searchTerm<1? this.state.contactList:this.state.searchResult}
                  removeContactHandler={removeContactHandler}
                  searchTerm={this.state.searchTerm}
                  handleSearch={handleSearch}
                />
              }
            />
            <Route
              path="/add"
              element={
                <AddContact
                  contactsHandler={contactsHandler}
                  navigate={(to) => (window.location.href = to)}
                />
              }
            /><Route
            path="/edit/:id"
            element={
              <EditContact
                updateHandler={updateHandler}
                navigate={(to) => (window.location.href = to)}
                contactList={this.state.contactList}
              />
            }
          />
            {/* In this Route path ":id" means I can access these parameters when i Use UseParams named id */}
            <Route path="/contact/:id" element={<ContactDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };
}

export default Home;
