// Intentionally incomplete classroom proposal.
export function filterWorkshops(workshops, query, onlyAvailable) {
  return workshops.filter((item) => item.title.includes(query) && (!onlyAvailable || item.seats != 0));
}
