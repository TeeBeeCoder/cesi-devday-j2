function normalize(value) {
  return value
    .trim()
    .toLocaleLowerCase('fr')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function filterWorkshops(workshops, query, onlyAvailable) {
  const search = normalize(query);
  return workshops.filter(
    (item) =>
      normalize(`${item.title} ${item.topic}`).includes(search) &&
      (!onlyAvailable || item.seats > 0),
  );
}
