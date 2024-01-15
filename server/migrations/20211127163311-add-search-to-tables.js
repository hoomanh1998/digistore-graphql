const vectorName = "_search";

const searchObjects = {
  Products: "title",
  // Orders: ["name", "summary"],
};

module.exports = {
  up: async (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) => {
          queryInterface.sequelize.query(
            `ALTER TABLE "${table}" ADD COLUMN ${vectorName} TSVECTOR;`,
            { transaction: t }
          ),
            queryInterface.sequelize.query(
              `UPDATE "${table}" SET ${vectorName} = to_tsvector('english', ${searchObjects[table]});`,
              { transaction: t }
            ),
            queryInterface.sequelize.query(
              `CREATE INDEX ${table}_search ON "${table}" USING gin(${vectorName});`,
              { transaction: t }
            ),
            queryInterface.sequelize.query(
              `CREATE TRIGGER ${table}_vector_update
            BEFORE INSERT OR UPDATE ON "${table}"
            FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.english', ${searchObjects[table]});`,
              { transaction: t }
            );
        })
      )
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) => {
          queryInterface.sequelize.query(
            `DROP TRIGGER ${table}_vector_update ON "${table}";`,
            { transaction: t }
          ),
            queryInterface.sequelize.query(`DROP INDEX ${table}_search;`, {
              transaction: t,
            }),
            queryInterface.sequelize.query(
              `ALTER TABLE "${table}" DROP COLUMN ${vectorName};`,
              { transaction: t }
            );
        })
      )
    ),
};
