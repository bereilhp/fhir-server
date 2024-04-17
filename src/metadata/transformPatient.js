const { ObjectId } = require("mongodb");
const { patientSearchMapping } = require("../searchParameters/patientMapping");

function transformToFhirMongoFormat(fhirData) {
  const uuid =
    fhirData.identifier.find((id) => id.system)?.system || "default-uuid";

  const searchParameters = patientSearchMapping
    .map((param) => {
      let value = fhirData;
      for (const part of param.attribute.split(".")) {
        value = value && value[part];
      }

      if (param.transform) {
        value = param.transform(value);
      }

      return {
        key: param.key,
        value,
      };
    })
    .filter((param) => param.value !== undefined && param.value !== "");

  return {
    _id: new ObjectId(),
    metadata: {
      documentVersion: "1.0",
      fhirVersion: "5.0.0",
      lastUpdate: new Date().toISOString(),
      tenant_id: "TenantA",
      id: fhirData.id || "default-id",
      uuid: uuid,
      resourceType: fhirData.resourceType || "Unknown",
      searchParameters,
    },
    resource: fhirData,
  };
}

module.exports = { transformToFhirMongoFormat };
