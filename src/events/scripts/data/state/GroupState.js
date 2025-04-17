const groupState = {};

const groupStateSubscribedComponents = [];

const IS_VISIBLE = "isVisible";

//TODO: Prevent components from being added more than once.
export function subscribeToGroupState(component) {
  groupStateSubscribedComponents.push(component);
}

export function updateSubscriberData() {
  //TODO: Add support for use cases where a component can require state from multiple sources of data.
  groupStateSubscribedComponents.forEach(function (component) {
    component.updateData(groupState);
  });
}

export function getGroupData(groupId) {
  return groupState[groupId];
}

export function initGroups(groups) {
  updateSearchResultState(groups);
}

export function isVisible(groupId) {
  const groupData = groupState[groupId];
  return groupData && groupData[IS_VISIBLE];
}

export function updateGroupVisibilityState(groupId) {
  groupState[groupId][IS_VISIBLE] = !isVisible(groupId);
}

export function updateSearchResultState(groupResults) {
  Object.keys(groupState).forEach(function (key) {
    delete groupState[key];
  });

  Object.keys(groupResults).forEach(function (groupId) {
    const group = groupResults[groupId];

    const key = `group-${group.id}`;
    groupState[key] = {
      events: group["events"],
      locations: group.cities || group.locations,
      url: group.url,
      title: group.name,
      summary: group.summary,
      isHidden: false,
    };
  });

  console.log(groupState);

  updateSubscriberData();
}
