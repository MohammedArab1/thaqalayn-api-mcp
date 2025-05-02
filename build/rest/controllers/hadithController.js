export default class HadithController {
    service;
    constructor(hadithService) {
        this.service = hadithService;
    }
    async allBooksHandler() {
        try {
            const books = await this.service.getAllBooks();
            return {
                success: true,
                data: books.map((book) => JSON.stringify(book)).join("\n"),
            };
        }
        catch (error) {
            console.error("Failed to fetch books:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
    async randomHadithHandler() {
        try {
            const hadith = await this.service.getRandomHadith();
            return {
                success: true,
                data: JSON.stringify(hadith),
            };
        }
        catch (error) {
            console.error("Failed to fetch hadith:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
    async hadithQueryHandler(query) {
        try {
            const hadiths = await this.service.searchHadith(query);
            return {
                success: true,
                data: hadiths.map((hadith) => JSON.stringify(hadith)).join("\n"),
            };
        }
        catch (error) {
            console.error("Failed to fetch hadiths:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
}
