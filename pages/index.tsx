import React, { BaseSyntheticEvent, useRef, useState } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import ProfileRelationsWrapper from "../src/components/ProfileRelations";
import ProfileSidebar from "../src/components/ProfileSidebar";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

const Home: React.FC = () => {
  const githubUser = "silvoneymachado";
  const [communities, setCommunities] = useState<
    { title: string; imgUrl: string; url: string }[]
  >([]);
  const formRef = useRef(null);
  const favoritesPeople = [
    "filipedeschamps",
    "diego3g",
    "wenderpmachado",
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  const resetFields = (formData: FormData) => {
    formData.set("title", "");
    formData.set("cover", "");
    formData.set("url", "");
  };

  const handleCreateCommunity = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title")?.toString();
    const cover = formData.get("cover")?.toString();
    const url = formData.get("url")?.toString();

    if (title === "" || !title) {
      alert("Você precisa informar um nome para a comunidade!");
      return;
    }

    if (url === "" || !url) {
      alert("Você precisa informar uma url para sua comunidade!");
      return;
    }

    const newCommunity = {
      title: title,
      imgUrl:
        cover !== "" && cover
          ? cover
          : `https://picsum.photos/300/300.jpg?hmac=${Math.random() * 10000}`,
      url: url,
    };

    setCommunities([...communities, newCommunity]);
    
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
          {/* Form */}
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form ref={formRef} onSubmit={handleCreateCommunity}>
              <div>
                <input
                  placeholder="Qual será o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual será o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma url para usarmos de capa"
                  name="cover"
                  aria-label="Coloque uma url para usarmos de capa"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma url para sua comunidade"
                  name="url"
                  aria-label="Coloque uma url para sua comunidade"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritesPeople.length})
            </h2>
            <ul>
              {favoritesPeople.map((person) => (
                <li key={person}>
                  <a href={`/users/${person}`} key={person}>
                    <img src={`https://github.com/${person}.png`} />
                    <span>{person}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsWrapper>
          <ProfileRelationsWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map((community, index) => (
                <li key={`${community.title}-${index}`}>
                  <a href={community.url} key={community.title}>
                    <img src={community.imgUrl} />
                    <span>{community.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsWrapper>
        </div>
      </MainGrid>
    </>
  );
};

export default Home;
