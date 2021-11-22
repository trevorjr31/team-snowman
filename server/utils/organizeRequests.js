const sortRequests = (listToSort) => {
  return listToSort.sort(function(reqA, reqB) {
    return Date.parse(reqA.duration.start) < Date.parse(reqB.duration.start);
  });
};
const getNext = (upcomingRequests) => {
  if (upcomingRequests.length > 0) {
    nextRequest = upcomingRequests.reduce(function(reqA, reqB) {
      return Date.parse(reqA.duration.start) <
        Date.parse(reqB.duration.start) && reqA.accepted
        ? reqA
        : reqB;
    });
    if (!nextRequest.accepted) {
      nextRequest = null;
    }
  }

  return nextRequest;
};

const organizeRequests = async (requests) => {
  const now = new Date();
  let before = [];
  let after = [];
  let nextRequest = null;
  for (let request of requests) {
    request = JSON.parse(JSON.stringify(request));
    const sitterInfo = await User.findById(request.sitterId);
    request.sitterInfo = {};
    request.sitterInfo.username = sitterInfo.username;
    request.sitterInfo.email = sitterInfo.email;
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
