const allOfMembers = [
  ["보현", "우리"],
  ["형탁", "홍규"],
  ["은비"],
  ["민주", "준호"],
];

const getSpeakers = async (allOfMembers) => {
  console.log("오늘의 발표자는,,,!!!");

  allOfMembers.map(async (members, index) => {
    const speakerNum = Math.round(Math.random());
    setTimeout(() => {
      if (members.length > 1) {
        console.log(">>> ", members[speakerNum]);
      } else {
        console.log(">>> ", members[members.length - 1]);
      }
    }, 3000 * (index + 1));
  });
};

getSpeakers(allOfMembers);
