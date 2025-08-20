

export const emailValidator = (email: string | null): string => {
    if (!email) {
        return "Email is required";
    }
    else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Incorrect email format";
    }
    return "";
}

export const passwordValidator = (password: string | null): string => {
    if (!password) {
        return "Password is required";
    } else if (password.length < 4) {
        return "Password must have a minimum 4 characters";
    }
    return "";
};
