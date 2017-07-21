export const openHeaderMenu = title => {
    return {
        type: 'OPEN_HEADER_MENU',
        title,
    }
};

export const closeHeaderMenu = () => {
    return {
        type: 'CLOSE_HEADER_MENU',
    }
};

export const updateDocumentTitle = (title) => {
    return {
        type: 'UPDATE_TITLE',
        title,
    }
};

export const createWorkforce = () => {
    const query = `
        users {
            id,
            username,
            email,
            threads
        }`;
    
    return {
        type: 'CREATE_WORK_FORCE',
        query,
    }
}