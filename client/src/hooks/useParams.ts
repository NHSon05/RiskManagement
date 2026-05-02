import { useParams as useRouterParams } from "react-router-dom";

export const useParams = () => {
  const params = useRouterParams();

  const projectIdStr = params.projectId || localStorage.getItem("currentProjectId");
  const projectId = projectIdStr ? Number(projectIdStr) : 0;

  return {
    ...params,
    projectId,
  };
};
