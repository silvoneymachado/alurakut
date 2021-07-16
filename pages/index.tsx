import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import Box from "../src/components/Box";
import CommunityListItem from "../src/components/CommunityListItem";
import FavoritesPeopleListItem from "../src/components/FavoritesPeopleListItem";
import FollowerListItem from "../src/components/FollowerListItem";
import MainGrid from "../src/components/MainGrid";
import ProfileRelationsBoxWrapper from "../src/components/ProfileRelations";
import ProfileSidebar from "../src/components/ProfileSidebar";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

const Home: React.FC = () => {
  const [githubUser, setGithubUser] = useState("");
  const [communities, setCommunities] = useState<
    {
      title: string;
      imageurl: string;
      communityurl: string;
      creatorslug: string;
    }[]
  >([]);

  const [followers, setFollowers] = useState([]);

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

  const getFollowers = (userName: string) => {
    fetch(`https://api.github.com/users/${userName}/followers`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`We had an error: ${res.status}-${res.statusText}`);
      })
      .then((data: any[]) => {
        setFollowers(data);
      })
      .catch((err) => alert(err));
  };

  const getCummunities = (userName: string) => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "d68aa4c00f690490fd5b57ec47ecec",
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities(filter: { creatorslug: { eq: "${userName}"} }) {
            id
            title
            imageurl
            communityurl
            creatorslug
          }
        }`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`We had an error: ${res.status}-${res.statusText}`);
      })
      .then((jsonData: any) => {
        if(jsonData.data && jsonData.data.allCommunities.length > 0) {
          setCommunities(jsonData.data.allCommunities);
        } else {
          setCommunities([]);
        }
      })
      .catch((err) => alert(err));
  };

  const handleChangeUser = (userName: string) => {
    localStorage.setItem("userName", userName);
    setGithubUser(userName);
    getCummunities(userName);
  };

  useEffect(() => {
    let userName = localStorage.getItem("userName");
    if (!userName) {
      userName = prompt(`Digite o seu usuário do github`);
      localStorage.setItem("userName", userName);
    }
    setGithubUser(userName);
    getFollowers(userName);
    getCummunities(userName);
  }, [githubUser]);

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
      imageurl:
        cover !== "" && cover
          ? cover
          : `https://picsum.photos/300/300.jpg?hmac=${Math.random() * 10000}`,
      communityurl: url,
      creatorslug: githubUser,
    };

    fetch("/api/communities", {
      method: "POST",
      body: JSON.stringify(newCommunity),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if(data){
            getCummunities(githubUser);
          }
          return;
        }
        throw new Error(`We had an error: ${res.status}-${res.statusText}`);
      })
      .catch((err) => alert(err));

    // setCommunities([...communities, newCommunity]);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar
            githubUser={githubUser}
            changeUsername={handleChangeUser}
          />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
          {/* Form */}
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
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
          <ProfileRelationsBoxWrapper
            title="Comunidades"
            listItems={communities}
            RenderItem={CommunityListItem}
          />
          <ProfileRelationsBoxWrapper
            title="Pessoas da comunidade"
            listItems={favoritesPeople}
            RenderItem={FavoritesPeopleListItem}
          />
          <ProfileRelationsBoxWrapper
            title="Seguidores"
            listItems={followers}
            RenderItem={FollowerListItem}
          />
        </div>
      </MainGrid>
    </>
  );
};

export default Home;
