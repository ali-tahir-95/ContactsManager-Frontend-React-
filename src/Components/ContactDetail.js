import React from "react";
import profilePic from "../Images/logo.svg";
import { Grid, Image, Header } from "semantic-ui-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ContactDetail = (props) => {
  // Accessing the id parameter of Url which was passed in the Link component of Contact Card
  let { id } = useParams();
  const navigate = useNavigate();
  // Spliting the data for use
  const [uuid, name, email] = id.split("=");
  // Accessing the Data passed using state property of Link Component
  let data = useLocation().state;
  return (
    <div className="ui container center aligned">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Grid columns={1} className="ui card">
          <Grid.Column textAlign="left">
            <Image src={profilePic} size="medium" centered />
            <Header as="h2">{name}</Header>

            <p>{data.contactInfo.email}</p>
            <p>{data.contactInfo.uuid}</p>
          </Grid.Column>
        </Grid>
      </div>{" "}
      <button
        className="ui button green"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/")}
      >
        Back to List
      </button>
    </div>
  );
};

export default ContactDetail;
