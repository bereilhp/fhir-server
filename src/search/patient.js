const patientSearchMapping = [
  { key: "identifier", attribute: "resource.identifier.value" },
  { key: "name", attribute: "resource.name.family" },
  { key: "family", attribute: "resource.name.family" },
  { key: "given", attribute: "resource.name.given" },
  { key: "gender", attribute: "resource.gender" },
  { key: "birthdate", attribute: "resource.birthDate" },
  { key: "address", attribute: "resource.address.line" },
  { key: "address-city", attribute: "resource.address.city" },
  { key: "address-state", attribute: "resource.address.state" },
  { key: "address-postalcode", attribute: "resource.address.postalCode" },
  { key: "phone", attribute: "resource.telecom.value" },
  { key: "email", attribute: "resource.telecom.value" },
  { key: "deceased", attribute: "resource.deceasedBoolean" },
  { key: "language", attribute: "resource.communication.language.coding.code" },
];

function constructQueryFromParameters(searchParams) {
  const query = {};
  patientSearchMapping.forEach((mapping) => {
    const searchValue = searchParams[mapping.key];
    if (searchValue) {
      const attributePath = mapping.attribute.replace(/\[(\d+)\]/g, ".$1");
      query[attributePath] = searchValue;
    }
  });
  return query;
}

module.exports = { constructQueryFromParameters };
