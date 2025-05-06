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
    async getRandomHadith(bookId) {
        var url = `${this.apiUrl}/random`;
        if (typeof bookId !== undefined) {
            url = `${this.apiUrl}/${bookId}/random`;
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
    async searchHadith(query, bookId) {
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
    async fetchIngredients() {
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
    async graphQLIntrospection() {
        const minimalQuery = `
        query MinimalIntrospection {
          __schema {
            types {
              name
              kind
              fields {
                name
              }
            }
          }
        }
      `;
        const response = await fetch(`https://www.thaqalayn-api.net/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: minimalQuery,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error fetching introspection data: ${response.statusText}`);
        }
        return await response.json();
    }
    async graphQLRequest(gqlQuery) {
        const response = await fetch(`${this.apiUrl}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: gqlQuery,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error fetching graphql data: ${response.statusText}`);
        }
        return await response.json();
    }
}
