import React from "react";
import { Repository } from "../backend/router/repo";

export const Analysis: React.FC<{ repository: Repository }> = ({
  repository,
}) => {
  return (
    <div>
      <p>{repository.name}</p>
      <p>{repository.description}</p>
    </div>
  );
};
