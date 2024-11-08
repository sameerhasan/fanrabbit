import { USER } from "../constants";
import { IUser } from "../interfaces/user.interfaces";

class LocalStorageManager {
  getItem = (key: string): string | null => {
    try {
      const data = localStorage.getItem(key);

      return JSON.parse(data as string) ?? null;
    } catch (e) {
      console.error(e);

      return null;
    }
  };

  setItem = <T,>(key: string, value: T extends infer A ? A : unknown) => {
    try {
      const castedToString = JSON.stringify(value);
      castedToString && localStorage.setItem(key, castedToString);
    } catch (e) {
      console.error(e);
    }
  };

  removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  getUser = (): IUser | null => {
    const userStr = localStorage.getItem(USER);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  };

  setUser = (user: IUser): void => {
    localStorage.setItem(USER, JSON.stringify(user));
  };

  removeUser = (): void => {
    localStorage.removeItem(USER);
  };
}

export const localStorageManager = new LocalStorageManager();
