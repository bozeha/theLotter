const transObj = {
  status: "Status",
  sortByStatus: "Sort by status",
  done: "Done",
  active: "Active",
  changeToActive: "Change to active",
  changeToDone: "Change to done",
  ascDesc: "Asc/Desc",
  getFromServer: "Get from server",
  bonusQuesitionFastSearch: "Bonus question fast search",
};

const t = (text) => {
  return transObj[text] || text;
};

export default t;
