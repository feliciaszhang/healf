import useSWR from "swr";

export const useEvents = (user) => {
  const { data: events } = useSWR(user?.isLoggedIn && `/api/events`);
  const loadingEvents = events === undefined;
  return { events, loadingEvents };
}

export default useEvents;