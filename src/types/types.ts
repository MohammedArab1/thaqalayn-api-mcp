export declare type Book = {
  BookId?: String;
  BookName?: String;
  author?: String;
  idRangeMin?: Number;
  idRangeMax?: Number;
  bookDescription?: String;
  bookCover?: String;
  englishName?: String;
  translator?: String;
};

export declare type ControllerResponse = {
  success: boolean;
  data?: string;
  error?: string;
};

export declare type MCPReturn = {
  content?: [type?: string, text?: string];
};

export declare type Hadith = {
  id: Number;
  bookId: String;
  book: String;
  category: String;
  categoryId: String;
  chapter: String;
  author: String;
  translator: String;
  englishText: String;
  arabicText: String;
  majlisiGrading: String;
  BehdudiGrading: String;
  MohseniGrading: String;
  URL: String;
};
