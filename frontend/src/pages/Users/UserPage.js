import React from 'react';
import {
  useParams
} from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>User #{id}</h1>
    </div>
  );
};

export default UserPage;
