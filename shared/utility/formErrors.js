export const addProductFormErrors = [
    {
        id: 'title',
        label: 'Title',
        errorTextHeader: 'Invalid Title',
        errorText: 'Title can not be less than 6 characters.',
    },
    {
        id: 'imageUrl',
        label: 'Image URL',
        errorTextHeader: 'Invalid image URL',
        errorText: 'Please provide a valid URL.',
    },
    {
        id: 'description',
        label: 'Description',
        errorTextHeader: 'Invalid Description',
        errorText: 'Description field cannot be left blank.',
    },
    {
        id: 'price',
        label: 'Price',
        errorTextHeader: 'Invalid Price',
        errorText: 'Price can not be negative and/or this field cannot be left blank.',
    }
];

export const authenticationFormErrors = [
    {
        id: 'email',
        label: 'Email',
        errorTextHeader: 'Invalid Email',
        errorText: 'Please enter a valid email address.',
    },
    {
        id: 'password',
        label: 'Password',
        errorTextHeader: 'Invalid Password',
        errorText: 'Password should include at least one capital letter, small letter, digit and special character and at least be 8 characters long.',
    }
];