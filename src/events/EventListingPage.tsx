// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { resultsAtom } from "../state/EventState.ts";
import { useAtom } from "jotai";
import { GroupInfo } from "./GroupInfo.tsx";
import { EventSearch } from "./EventSearch.tsx";
import { Group } from "../data/ObjectConfig.ts";
export function EventListingPage() {
  const [data] = useAtom(resultsAtom);
  return (
    <div id="listing-page">
      <EventSearch></EventSearch>
      <h1>Groups With Recurring events</h1>

      {data.groups.map((group: Group) => (
        <GroupInfo group={group}></GroupInfo>
      ))}
      <h1> Upcoming conventions</h1>
      {data.conventions.map((convention, index) => (
        <div key={index * 10}>
          <h3>
            <a href={convention.link}>{convention.title}</a>
          </h3>
          <p>Days: {convention.days.join()}</p>
        </div>
      ))}
      <h1> Game stores </h1>
      {data.gameStores.map((gameStore, index) => (
        <div key={index * 100}>
          <h3>
            {gameStore.link && gameStore.link !== "" ? (
              <a href={gameStore.link}>{gameStore.name}</a>
            ) : (
              <p>{gameStore.name}</p>
            )}
          </h3>
          <p>Location: {gameStore.location}</p>
        </div>
      ))}
    </div>
  );
}
