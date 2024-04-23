const { ObjectId } = require("mongodb");

function transformToFhirMongoFormat(fhirData) {
  return {
    _id: new ObjectId(),
    metadata: {
      documentVersion: "1.0",
      fhirVersion: "5.0.0",
      lastUpdate: new Date().toISOString(),
      tenant_id: "Tenant",
      id: fhirData.id || "default-id",
      resourceType: fhirData.resourceType || "Unknown",
    },
    resource: fhirData,
  };
}

module.exports = { transformToFhirMongoFormat };
