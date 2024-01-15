const { User, Location } = require("../../models");
const { checkUserToken } = require("../../util");

module.exports = {
  Query: {
    location: async (_, { location_id }, { user }) => {
      if (checkUserToken(user) && user_id === user.id) {
        try {
          const location = await Location.findByPk(location_id);
          return location;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },
  },

  Mutation: {
    addLocation: async (_, { city, address }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const _user = await User.findOne({ where: { id: user.id } });
          if (_user) {
            return await Location.create({
              UserId: _user.id,
              city,
              address,
            });
          } else {
            throw new Error("Can not add new location.");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    removeLocation: async (_, { location_id }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const _user = await User.findOne({ where: { id: user.id } });
          const location = await Location.findOne({
            where: { id: location_id },
          });
          if (_user && location) {
            await location.destroy();
            return {
              id: location_id,
            };
          } else {
            throw new Error("Can not remove location.");
          }
        }
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    updateLocation: async (_, { locations }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const _user = await User.findOne({ where: { id: user.id } });
          if (_user && locations.length > 0) {
            locations.forEach((location) => {
              Location.update(
                { city: location.city, address: location.address },
                {
                  where: { id: location.id, UserId: _user.id },
                  order: [["id", "ASC"]],
                }
              );
            });
            return true;
          } else {
            throw new Error("Can not update locations.");
          }
        }
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
  },
};
