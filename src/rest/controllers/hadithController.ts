import HadithService from "../services/hadithService.js";
import {
  Book,
  ControllerResponse,
  Ingredient,
  Hadith,
} from "../../types/types.js";

export default class HadithController {
  service: HadithService;

  constructor(hadithService: HadithService) {
    this.service = hadithService;
  }

  async allBooksHandler(): Promise<ControllerResponse> {
    try {
      const books = await this.service.getAllBooks();
      return {
        success: true,
        data: books.map((book) => JSON.stringify(book)).join("\n"),
      };
    } catch (error) {
      console.error("Failed to fetch books:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async randomHadithHandler(): Promise<ControllerResponse> {
    try {
      const hadith = await this.service.getRandomHadith();
      return {
        success: true,
        data: JSON.stringify(hadith),
      };
    } catch (error) {
      console.error("Failed to fetch hadith:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async hadithQueryHandler(
    query: string,
    bookId?: string,
  ): Promise<ControllerResponse> {
    try {
      var hadiths: Hadith[];
      if (typeof bookId !== undefined) {
        hadiths = await this.service.searchHadith(query, bookId);
      } else {
        hadiths = await this.service.searchHadith(query);
      }
      return {
        success: true,
        data: hadiths.map((hadith) => JSON.stringify(hadith)).join("\n"),
      };
    } catch (error) {
      console.error("Failed to fetch hadiths:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async ingredientsHandler(): Promise<ControllerResponse> {
    try {
      const ingredients = await this.service.fetchIngredients();
      return {
        success: true,
        data: ingredients
          .map((ingredient) => JSON.stringify(ingredient))
          .join("\n"),
      };
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // queryHandler = async (req, res) => {
  // 	try {
  // 		const { q: query } = req.query;
  // 		if (!query) {
  // 			return res.status(400).json({
  // 				error: 'Missing query parameter',
  // 				example: '/api/query?q=your+search+terms',
  // 			});
  // 		}

  // 		const results = await this.service.searchHadith(query);
  // 		res.json(results);
  // 	} catch (error) {
  // 		this.handleError(res, error);
  // 	}
  // };

  // queryPerBookHandler = async (req, res) => {
  // 	try {
  // 		const { bookId } = req.params;
  // 		const { q: query } = req.query;

  // 		if (!(await this.service.validateBookExists(bookId))) {
  // 			return res.status(400).json({ error: this.invalidBookMessage });
  // 		}

  // 		const results = await this.service.searchHadith(query, bookId);
  // 		res.json(results);
  // 	} catch (error) {
  // 		this.handleError(res, error);
  // 	}
  // };

  // bookHandler = async (req, res) => {
  // 	try {
  // 		const { bookId } = req.params;

  // 		if (!(await this.service.validateBookExists(bookId))) {
  // 			return res.status(400).json({ error: this.invalidBookMessage });
  // 		}

  // 		const hadiths = await this.service.getHadithsByBook(bookId);
  // 		res.json(hadiths);
  // 	} catch (error) {
  // 		this.handleError(res, error);
  // 	}
  // };

  // randomBookHadithHandler = async (req, res) => {
  // 	try {
  // 		const { bookId } = req.params;

  // 		if (!(await this.service.validateBookExists(bookId))) {
  // 			return res.status(400).json({ error: this.invalidBookMessage });
  // 		}

  // 		const randomHadith = await this.service.getRandomHadith(bookId);
  // 		res.json(randomHadith || { error: 'No hadiths found in this book' });
  // 	} catch (error) {
  // 		this.handleError(res, error);
  // 	}
  // };

  // oneHadithHandler = async (req, res) => {
  // 	try {
  // 		const { bookId, id } = req.params;
  // 		const hadithId = parseInt(id, 10);

  // 		if (isNaN(hadithId)) {
  // 			return res.status(400).json({ error: 'Invalid hadith ID format' });
  // 		}

  // 		const hadith = await this.service.getHadithById(bookId, hadithId);
  // 		res.json(hadith || { error: this.invalidIdMessage });
  // 	} catch (error) {
  // 		this.handleError(res, error);
  // 	}
  // };

  // handleError = (res, error) => {
  // 	console.error('Controller Error:', error);
  // 	res.status(500).json({
  // 		error: 'Internal server error',
  // 		details:
  // 			process.env.NODE_ENV === 'development' ? error.message : undefined,
  // 	});
  // };
}
