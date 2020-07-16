import React from 'react';
import { withRouter } from "react-router-dom";
 
const Footer  = (props) => {
  return props.location.pathname != '/login' ? (
      <footer className="main-footer">
          <div className="pull-right hidden-xs">
              <b>Version</b> 2.4.0
          </div>
          <strong>Copyright &copy; 2020.</strong> All rights
          reserved.
      </footer>
  ):null
};
 
export default withRouter(Footer);