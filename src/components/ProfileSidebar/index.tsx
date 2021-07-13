import React from "react";
import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";

interface Props {
  githubUser: string;
}

const ProfileSidebar: React.FC<Props> = ({ githubUser }: Props) => {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        title={githubUser}
        style={{ borderRadius: 8 }}
      />
      <hr />

      <a className="boxLink" href={`https://github.com/${githubUser}`}>
        @{githubUser}
      </a>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

export default ProfileSidebar;
