const { patientSearchMapping } = require("../searchParameters/patientMapping");

function constructQueryFromParameters(searchParams) {
  const query = {};
  patientSearchMapping.forEach((mapping) => {
    const searchValue = searchParams[mapping.key];
    if (searchValue) {
      const attributePath = `resource.${mapping.attribute.replace(
        /\[(\d+)\]/g,
        ".$1"
      )}`;
      query[attributePath] = searchValue;
    }
  });
  return query;
}

module.exports = { constructQueryFromParameters };
