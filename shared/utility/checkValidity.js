export const checkInputValidity = (id, value) => {
    if (id === 'title') {
        if (!value || value.trim().length === 0) {
            return false;
        }
        return true;
    } else if (id === 'imageUrl') {
        const regExp = /^https{0,1}:\/\/www.[A-Za-z0-9]+/;  // representative regExp for a typical URL. (Assumes URL should start with "http(s)://www." string)
        if (!value || value.trim().length === 0 || !regExp.test(value)) {
            return false;
        }
        return true;
    } else if (id === 'description') {
        if (!value || value.trim().length === 0) {
            return false;
        }
        return true;
    } else if (id === 'price') {
        if (+value < 0) return false;
        return true;
    }

}