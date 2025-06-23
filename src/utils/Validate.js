import React from 'react'

export const checkValidData = (email, password, name) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    const isPasswordValid = /^^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    const isFullNameValid = /^[a-zA-Z ]{2,30}$/.test(name);

    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid";
    if(name !== undefined && !isFullNameValid) return "Name must be 2-30 charachters and only contain letters and spaces";

    return null;
};

