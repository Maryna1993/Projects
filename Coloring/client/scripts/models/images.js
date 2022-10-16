class Images {
    static async getImages() {
        const response = await fetch('http://localhost:3000/api/images');

        return await response.json();
    }

    static async getImage(id) {
        const response = await fetch(`http://localhost:3000/api/image/${id}`);

        return await response.json();
    }
}

export default Images;