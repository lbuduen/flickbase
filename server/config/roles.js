const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

let grantsObject = {
  admin: {
    profile: allRights,
    articles: allRights
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id"],
      "update:own": ["*", "!password", "!_id"],
    },
    articles: {
      "read:any": ["*"],
    }
  },
};

const ac = new AccessControl(grantsObject);
module.exports = ac;
