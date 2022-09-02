export interface Document {
  id:           number;
  name:         string;
  type:         Type;
  url:          string;
  sponsored:    boolean | null;
  description?: string;
  image:        Image;
}
export interface Image {
  name:         string;
  photographer: string;
  url:          string;
}

export enum Type {
  Article = "article",
  Recipe = "recipe",
}
export interface Article{
  type: Type.Article
}
export interface Recipe{
  type: Type.Recipe
}