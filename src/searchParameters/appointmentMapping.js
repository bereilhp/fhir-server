const appointmentSearchMapping = [
  {
    key: "actor",
    attribute: "participant",
    transform: (participants) => {
      if (participants && participants.length > 0) {
        const firstValidActor = participants.find(
          (participant) => participant.actor && participant.actor.reference
        );
        return firstValidActor ? firstValidActor.actor.reference : null;
      }
      return null;
    },
  },
];

module.exports = { appointmentSearchMapping };
