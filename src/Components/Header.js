import React from "react";
import { Container } from "semantic-ui-react";
import "../Style/App.css";

class Header extends React.Component {
  render = () => (
    <div className="sticky-header">
      <Container>
        <Container
          style={{
            height: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="ui header center aligned" style={{ fontSize: "35px" }}>
            Contact Manager
          </h1>
        </Container>
      </Container>
    </div>
  );
}

export default Header;
