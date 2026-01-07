export const useInitials =
  () =>
  (fullName: string): string => {
    const names = fullName.trim().split(" ");

    if (names.length === 0) {
      return "";
    }
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    const firstInitial = names[0].charAt(0);
    const lastName = names.at(-1) ?? "";
    const lastInitial = lastName.charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
  };
