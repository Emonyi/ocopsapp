import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const AuntenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("user") ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

export default withRouter(AuntenticatedRoute);
