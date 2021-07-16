import React from "react";
import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  githubUser: string;
  changeUsername: (newUserName: string) => void;
}

const ProfileSidebar: React.FC<Props> = ({
  githubUser,
  changeUsername,
}: Props) => {
  const handleChangeUserName = () => {
    const newUserName = prompt("Digite um nome de usuário");

    if (newUserName === "" || !newUserName) {
      return;
    }

    changeUsername(newUserName);
  };
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        title={githubUser}
        style={{ borderRadius: 8 }}
      />
      <hr />

      <a className="boxLink" href={`https://github.com/${githubUser}`}>
        @{githubUser}
      </a>
      <button onClick={handleChangeUserName}>alterar</button>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

export default ProfileSidebar;
