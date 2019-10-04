export const compare = ( a, b ) => {
    if ( a.gamePoints < b.gamePoints ){
        return -1;
    }
    if ( a.gamePoints > b.gamePoints ){
        return 1;
    }
    return 0;
};
