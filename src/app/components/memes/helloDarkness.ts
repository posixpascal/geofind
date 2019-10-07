export const helloDarkness = (enable) => {
    if (!enable){
        document.body.classList.remove("helloDarkness");
    } else {
        document.body.classList.add("helloDarkness");
    }
};
