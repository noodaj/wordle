export const validUsername = (username: string): string | undefined => {
	if (!username || username.length < 5) {
		return "Invalid username";
	}
};

export const validPassword = (password: string): string | undefined=> {
	//const check = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
	/*
    if(!check.test(password)){
        return "Invalid password"
    }
    */
	if (!password) {
		return "Invalid password";
	}
};
