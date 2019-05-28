export interface Category {
  name: string;
  description?: string;
  creator: User;
}

export interface Character {
  name: string;
  origin: string;
  title?: string;
  imgSrc?: string;
}

export interface Team {
  name: string;
  roster: Character[];
  creator: User;
  categories: Category[];
}

export interface User {
  email: string;
  password: string;
  displayName?: string;
  createdCategories?: Category[];
  createdTeams?: Team[];
}
