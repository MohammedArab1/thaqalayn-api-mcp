export default class HadithService {
    apiUrl;
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    // Book-related operations
    async getAllBooks() {
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
    async getRandomHadith(bookId = null) {
        const response = await fetch(`${this.apiUrl}/random`, {
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
}
