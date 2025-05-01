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
}
