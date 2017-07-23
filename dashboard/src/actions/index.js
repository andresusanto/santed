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

export const getWorkforce = () => {
    const query = `
    {
        workschedule{
            id,
            persNo,
            pa,
            planned,
            pws,
            wsRuleId,
            wsRule,
            employmentStatus,
            companyCode,
            startDate,
            endDate
        }
    }`;
    
    return {
        type: 'GET_WORKFORCE',
        query,
    }
}

export const getLeave = () => {
    const query = `
    {
        leave {
            persNo,
            firstName,
            lastName,
            position,
            orgUnit,
            type,
            startDate,
            endDate
        }
    }`;
    
    return {
        type: 'GET_LEAVE',
        query,
    }
}

export const getRedTicket = () => {
    const query = `
    {
        redTicket {
            companyNo,
            name,
            businessUnit,
            position,
            medicalDate,
            outcome,
            toReturnDate,
            required,
            expiryDate
        }
    }`;
    
    return {
        type: 'GET_RED_TICKET',
        query,
    }
}

export const getLicense = () => {
    const query = `
    {
        license {
            firstName,
            lastName,
            entityId,
            entityTitle,
            completionDate,
            totalHours,
            creditHours,
            contactHours,
            tuition,
            currencyId
        }
    }`;
    
    return {
        type: 'GET_LICENSE',
        query,
    }
}

export const getClocking = () => {
    const query = `
    {
        miningClock {
            cardNumber,
            transitDate,
            transitStatus,
            lastName,
            firstName,
            zone,
            terminal,
            direction,
            visitorCompany
        }
    }`;
    
    return {
        type: 'GET_MINING_CLOCK',
        query,
    }
}

export const getProject = () => {
    const query = `
    {
        project {
            updated
            created
            startDate
            endDate
            name
            type
            description
            site
            cost
            rejected
            assignments {
                miner {
                    updated,
                    created,
                    persNo,
                    lastName,
                    firstName,
                    employeeGroup,
                    employeeSubgroup,
                    positionId,
                    position,
                    orgUnitId,
                    orgUnit,
                    superior,
                    totalAbsHours,
                },
                position,
                status
            }
            requirements {
                license,
                num
            }
        }
    }`;
    
    return {
        type: 'GET_PROJECT',
        query,
    }
}

export const createProject = (payload) => {
    return {
        type: 'CREATE_PROJECT',
        resource: '/project/create',
        payload,
    }
};