import React from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import ProfileRelationsWrapper from "../src/components/ProfileRelations";
import ProfileSidebar from "../src/components/ProfileSidebar";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

const Home: React.FC = () => {
  const githubUser = "silvoneymachado";
  const favoritesPeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'filipedeschamps',
    'diego3g',
    'wenderpmachado',
  ]

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({favoritesPeople.length})</h2>
            <ul>
              {favoritesPeople.map((person) => (
                <li>
                  <a href={`/users/${person}`} key={person}>
                  <img src={`https://github.com/${person}.png`} />
                  <span>{person}</span>
                </a>
                </li>
              ))}
            </ul>

          </ProfileRelationsWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  );
};

export default Home;
