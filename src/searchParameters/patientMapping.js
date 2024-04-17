const patientSearchMapping = [
  {
    key: "identifier",
    attribute: "identifier",
    transform: (identifiers) =>
      identifiers
        ? identifiers.map((id) => `${id.system || ""}: ${id.value}`).join("; ")
        : null,
  },
  {
    key: "name",
    attribute: "name",
    transform: (names) =>
      names
        ? names
            .map((name) => `${name.family || ""}, ${name.given.join(" ")}`)
            .join("; ")
        : null,
  },
  {
    key: "family",
    attribute: "name",
    transform: (names) =>
      names ? names.map((name) => name.family).join("; ") : null,
  },
  {
    key: "given",
    attribute: "name",
    transform: (names) =>
      names ? names.flatMap((name) => name.given).join(", ") : null,
  },
  {
    key: "gender",
    attribute: "gender",
    transform: (gender) => gender || null,
  },
  {
    key: "birthdate",
    attribute: "birthDate",
    transform: (birthDate) => birthDate || null,
  },
  {
    key: "address",
    attribute: "address",
    transform: (addresses) =>
      addresses
        ? addresses
            .map(
              (addr) =>
                `${addr.line.join(", ")}, ${addr.city}, ${addr.state}, ${
                  addr.postalCode
                }`
            )
            .join("; ")
        : null,
  },
  {
    key: "address-city",
    attribute: "address",
    transform: (addresses) =>
      addresses ? addresses.map((addr) => addr.city).join("; ") : null,
  },
  {
    key: "address-state",
    attribute: "address",
    transform: (addresses) =>
      addresses ? addresses.map((addr) => addr.state).join("; ") : null,
  },
  {
    key: "address-postalcode",
    attribute: "address",
    transform: (addresses) =>
      addresses ? addresses.map((addr) => addr.postalCode).join("; ") : null,
  },
  {
    key: "phone",
    attribute: "telecom",
    transform: (telecoms) =>
      telecoms
        ? telecoms
            .filter((t) => t.system === "phone")
            .map((t) => t.value)
            .join("; ")
        : null,
  },
  {
    key: "email",
    attribute: "telecom",
    transform: (telecoms) => {
      if (!telecoms || telecoms.length === 0)
        return "No telecom data available";

      const emails = telecoms
        .filter((t) => t.system === "email")
        .map((t) => t.value);
      return emails.length > 0 ? emails.join("; ") : "No email provided";
    },
  },
  {
    key: "deceased",
    attribute: "deceasedBoolean",
    transform: (deceased) => (deceased !== undefined ? deceased : null),
  },
  {
    key: "language",
    attribute: "communication",
    transform: (communications) =>
      communications
        ? communications
            .map((comm) =>
              comm.language.coding.map((coding) => coding.code).join(", ")
            )
            .join("; ")
        : null,
  },
  {
    key: "active",
    attribute: "active",
    transform: (active) => (active !== undefined ? active : null),
  },
  {
    key: "address-country",
    attribute: "address",
    transform: (addresses) => {
      if (!addresses) return "No address data";
      const countryList = addresses.map(
        (addr) => addr.country || "Country not specified"
      );
      return countryList.join("; ");
    },
  },
  {
    key: "address-use",
    attribute: "address",
    transform: (addresses) =>
      addresses ? addresses.map((addr) => addr.use).join("; ") : null,
  },
  {
    key: "death-date",
    attribute: "deceased",
    transform: (deceased) => {
      if (!deceased) return null;
      if (deceased.hasOwnProperty("DateTime")) return deceased.DateTime;
      if (deceased.hasOwnProperty("Boolean"))
        return `Deceased: ${deceased.Boolean}`;
      return null;
    },
  },
  {
    key: "general-practitioner",
    attribute: "generalPractitioner",
    transform: (gps) => (gps ? gps.map((gp) => gp.reference).join("; ") : null),
  },
  {
    key: "organization",
    attribute: "managingOrganization",
    transform: (org) => (org ? org.reference : null),
  },
  {
    key: "link",
    attribute: "link",
    transform: (links) =>
      links ? links.map((link) => link.other.reference).join("; ") : null,
  },
  {
    key: "phonetic",
    attribute: "name",
    transform: (names) =>
      names
        ? names
            .map((name) => `${name.family}, ${name.given.join(" ")}`)
            .join("; ")
        : null,
  },
  {
    key: "telecom",
    attribute: "telecom",
    transform: (telecoms) =>
      telecoms
        ? telecoms.map((t) => `${t.system}: ${t.value}`).join("; ")
        : null,
  },
];

module.exports = { patientSearchMapping };
