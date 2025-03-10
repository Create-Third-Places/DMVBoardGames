const groupState = {};

const groupStateSubscribedComponents = [];

//TODO: Prevent components from being added more than once.
export function subscribeToGroupState(component) {
  groupStateSubscribedComponents.push(component);
}

export function updateSubscriberData() {
  //TODO: Add support for use cases where a component can require state from multiple sources of data.
  groupStateSubscribedComponents.forEach(function (component) {
    component.updateData(Object.values(groupState));
  });
}

export function getGroupData(groupId) {
  return groupState[groupId];
}

export function hasVisibleEvents(group) {
  const groupId = "group-" + group.id;

  return true;
  if (!groupState[groupId]?.["frontendState"]) {
    return group.data["events"].length > 0;
  }

  return (
    groupState[groupId]?.["frontendState"]?.["visibleEvents"] &&
    groupState[groupId]["frontendState"]["visibleEvents"].length > 0
  );
}

export function getVisibleEvents(groupId) {
  if (!groupState[groupId]["frontendState"]) {
    return [];
  }
  return groupState[groupId]["frontendState"]["visibleEvents"];
}

export function initGroups(groups) {
  groups.forEach(function (group) {
    groupState["group-" + group.id] = {
      data: group,
      frontendState: {
        isVisible: false,
      },
    };
  });
}

export function shouldRender(group) {
  const groupId = "group-" + group.data.id;
  const frontendState = groupState?.[groupId]?.["frontendState"];
  return (
    frontendState !== null &&
    frontendState !== undefined &&
    frontendState !== {} &&
    frontendState.isHidden !== true
  );
}

export function isVisible(groupId) {
  const groupData = groupState[groupId]["frontendState"];
  return groupData && groupData.isVisible;
}

export function getGroupList() {
  return Object.values(groupState);
}

export function updateGroupVisibilityState(groupId) {
  groupState[groupId]["frontendState"].isVisible = !isVisible(groupId);
}

export function updateSearchResultState(groupResults) {
  const hiddenGroupIds = new Set(Object.keys(groupState));

  groupResults.forEach(function (group) {
    const key = "group-" + group.data.id;
    groupState[key]["frontendState"]["visibleEvents"] =
      group["frontendState"]["visibleEvents"];
    hiddenGroupIds.delete(key);
    groupState[key]["frontendState"] = { isHidden: false };
  });
  hiddenGroupIds.forEach(function (id) {
    groupState[id]["frontendState"] = { isHidden: true };
  });
  updateSubscriberData();
}
