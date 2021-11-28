const sortRequests = (listToSort) => {
  return listToSort.sort(function (reqA, reqB) {
    return Date.parse(reqA.duration.start) <= Date.parse(reqB.duration.start);
  });
};
const getNext = (upcomingRequests) => {
  filteredRequests = upcomingRequests.filter((req) => req.accepted == true);
  if (filteredRequests.length < 1) {
    return null;
  }
  nextRequest = filteredRequests.reduce(function (reqA, reqB) {
    return Date.parse(reqA.duration.start) < Date.parse(reqB.duration.start)
      ? reqA
      : reqB;
  });
  return nextRequest;
};

const organizeRequests = async (requests) => {
  const now = new Date();
  let before = [];
  let after = [];
  let nextRequest = null;
  for (let request of requests) {
    request = JSON.parse(JSON.stringify(request));
    if (Date.parse(now) < Date.parse(request.duration.start)) {
      after.push(request);
    } else {
      before.push(request);
    }
  }
  after = sortRequests(after);
  before = sortRequests(before);
  nextRequest = getNext(after);
  if (nextRequest) {
    after = after.filter((req) => {
      return req._id != nextRequest._id;
    });
  }

  return { before, after, nextRequest };
};

module.exports = organizeRequests;
