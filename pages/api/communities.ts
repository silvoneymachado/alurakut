import { SiteClient } from "datocms-client";
import { databaseTables } from "./help/datoCmsMapper";

const communityController = async (req: any, res: any) => {
  const API_TOKEN = "acbbe7f993581b69ef2841718f3e52";
  const client = new SiteClient(API_TOKEN);

  const createItem = async (community: any) => {
    try {
      const record = await client.items.create({
        itemType: databaseTables.COMMUNITY,
        ...community,
      });
      res.json({
        ok: true,
        data: record,
      });
      return;
    } catch (err) {
      res.json({
        ok: false,
        message: JSON.stringify(err),
      });
    }
  };

  const getAllUserCommunities = async (userName: string) => {
    try {
      fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          Authorization: API_TOKEN,
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `query {
            allCommunities(filter: { creatorslug: { eq: ${userName}} }) {
              id
              title
              imageurl
              communityurl
              creatorslug
            }
          }`,
        }),
      })
        .then(async (response) => {
          if (response.ok) {
            const jsonData = await response.json();
            res.json(...jsonData.data.allCommunities);
          }

          throw new Error(
            `We had an error: ${response.status}-${response.statusText}`
          );
        })
        .catch((err) => alert(err));
      return;
    } catch (err) {
      res.json({
        ok: false,
        message: JSON.stringify(err),
      });
    }
  };

  if (req.method === "POST") {
    createItem(req.body);
  }

  if (req.method === "GET") {
    getAllUserCommunities(req.headers.userName);
  }
};

export default communityController;
