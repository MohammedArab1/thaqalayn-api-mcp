import { Book, Hadith, Ingredient } from "../../types/types.js";

export default class HadithService {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Book-related operations
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${this.apiUrl}/allBooks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }

    return await response.json();
  }

  // Hadith operations
  async getRandomHadith(bookId?: string): Promise<Hadith> {
    var url = `${this.apiUrl}/random`
    if (typeof bookId !== undefined) {
      url = `${this.apiUrl}/${bookId}/random`
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching random data: ${response.statusText}`);
    }

    return await response.json();
  }

  async searchHadith(query: string, bookId?: string): Promise<Hadith[]> {
    var url = `${this.apiUrl}/query?q=${query}`;
    if (typeof bookId !== undefined) {
      url = `${this.apiUrl}/query/${bookId}?q=${query}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching query data: ${response.statusText}`);
    }

    return await response.json();
  }

  async fetchIngredients(): Promise<Ingredient[]> {
    const response = await fetch(`${this.apiUrl}/ingredients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching query data: ${response.statusText}`);
    }

    return await response.json();
  }

  // async searchHadith(query, bookId = null) {
  // 	const escapedQuery = this.escapeRegExp(query);
  // 	const $regex = new RegExp(escapedQuery, 'i');
  // 	const baseFilter = bookId ? { bookId } : {};

  // 	const [englishResults, arabicResults] = await Promise.all([
  // 		this.hadithModel.find(
  // 			{
  // 				...baseFilter,
  // 				englishText: { $regex },
  // 			},
  // 			{ _id: 0, __v: 0 }
  // 		),

  // 		this.hadithModel.find(
  // 			{
  // 				...baseFilter,
  // 				arabicText: { $regex },
  // 			},
  // 			{ _id: 0, __v: 0 }
  // 		),
  // 	]);

  // 	return this.processResults(englishResults, arabicResults);
  // }

  // async getHadithsByBook(bookId) {
  // 	const hadiths = await this.hadithModel.find({ bookId }, { _id: 0, __v: 0 });
  // 	return hadiths.sort((a, b) => a.id - b.id);
  // }

  // async getHadithById(bookId, hadithId) {
  // 	return this.hadithModel.findOne(
  // 		{ bookId, id: hadithId },
  // 		{ _id: 0, __v: 0 }
  // 	);
  // }

  // // Utility methods
  // processResults(englishResults, arabicResults) {
  // 	if (englishResults.length === 0 && arabicResults.length === 0) {
  // 		return { error: 'No matches found' };
  // 	}
  // 	return englishResults.length > 0 ? englishResults : arabicResults;
  // }

  // escapeRegExp(string) {
  // 	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // }

  // compareAlphabetically(field) {
  // 	return (a, b) =>
  // 		a[field].localeCompare(b[field], undefined, {
  // 			sensitivity: 'base',
  // 		});
  // }
}
