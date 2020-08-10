export default {
  name: "Database1",
  version: 1,
  objectStoresMeta: [
    {
      store: "locations",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "location", keypath: "location", options: { unique: false } },
      ],
    },
  ],
};
