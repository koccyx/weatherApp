const storage = {
    saveFavorites(favorites) {
        let favoritesJSON = JSON.stringify([...favorites]);
        localStorage.setItem('favorites',favoritesJSON);
    },
    getFavorites() {
        let favoritesArray = JSON.parse(localStorage.getItem('favorites'));

        return favoritesArray;
    },
    saveCurrent(currentCity) {
        localStorage.setItem('currentCity', currentCity);
    },
    getCurrent() {
        return localStorage.getItem('currentCity');
    }
};

export default storage;