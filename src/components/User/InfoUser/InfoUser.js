import React from "react";
import moment from "moment";
import localization from "moment/locale/es";
import { DataBirth, Link, Location } from "../../../utils/Icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;
  return (
    <div className="info-user">
      <h2 className="name">
        {user?.nombre} {user?.apellido}{" "}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biografia && <div className="description">{user.biografia}</div>}
      <div className="more-info">
        {user?.ubicacion && (
          <p>
            <Location />
            {user.ubicacion}
          </p>
        )}
        {user?.sitioweb && (
          <a
            href={user.sitioweb}
            alt={user.sitioweb}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <Link /> {user.sitioweb}
          </a>
        )}
        {user?.fechaNacimiento && (
          <p>
            <DataBirth />
            {moment(user.fechaNacimiento)
              .locale("es", localization)
              .format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
