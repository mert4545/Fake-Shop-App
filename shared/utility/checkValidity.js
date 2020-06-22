export const checkInputValidity = (id, value) => {
    if (id === 'title') {
        if (!value || value.trim().length === 0) {
            return false;
        }
        return true;
    } else if (id === 'imageUrl') {
        const regExp = /^https{0,1}:\/\/www.[\W\w\D\d]+/;  // representative regExp for a typical URL. (Assumes URL should start with "http(s)://www." string)
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
        if (+value < 0 || !value || value.trim().length === 0) return false;
        return true;
    } else if (id === 'email') {  // note that use of special characters (e.g. !, _, - etc.) for email validation is not included in the regular expression for the sake of simplicity
        const regExp = /^[A-Za-z][A-Za-z0-9]*@[A-Za-z]+\.[a-z\.]+$/;  //eslint-disable-line
        if (!value || value.trim().length === 0 || !regExp.test(value)) {
            return false;
        }
        return true;
    } else if (id === 'password') {
        const regExp1 = /[A-Z]+/;  // check if password includes any capital letter 
        const regExp2 = /[a-z]+/;  // check if password includes any small letter 
        const regExp3 = /[0-9]+/;  // check if password includes any digit 
        // check if password includes any special character
        const regExp4 = /[!@#\$%\^\&*+=\._-]+/;  //eslint-disable-line 
        if (!value || value.trim().length < 8 || !regExp1.test(value) || !regExp2.test(value) || !regExp3.test(value) || !regExp4.test(value)) {
            return false;
        }
        return true;
    }
}
