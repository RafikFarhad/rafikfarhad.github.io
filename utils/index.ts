export const formatDate = (date: string): string => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(newDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const getBadgeClasses = (tag: string): string => {
  const badgeColors = [
    "blue",
    "red",
    "green",
    "yellow",
    "indigo",
    "purple",
    "pink",
  ];
  const color: string = badgeColors[tag.length % badgeColors.length];
  return ` bg-${color}-100 text-${color}-800`;
};
