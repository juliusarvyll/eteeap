export const validatePersonalInfo = (formData) => {
    const errors = {};

    // Required fields validation
    const requiredFields = {
        lastName: 'Last name',
        firstName: 'First name',
        address: 'Complete address',
        zipCode: 'ZIP code',
        contactNumber: 'Contact number',
        birthDate: 'Birth date',
        birthPlace: 'Place of birth',
        civilStatus: 'Civil status',
        sex: 'Sex',
        nationality: 'Nationality',
        languages: 'Languages and dialects'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field]) {
            errors[field] = `${label} is required`;
        }
    });

    // Additional validations
    if (formData.nationality === 'Others' && !formData.otherNationality) {
        errors.otherNationality = 'Please specify your nationality';
    }

    return errors;
};

export const validateLearningObjectives = (formData) => {
    const errors = {};

    // Required fields validation
    const requiredFields = {
        firstPriority: 'First priority program',
        goalStatement: 'Goal statement',
        timeCommitment: 'Time commitment',
        costPayment: 'Cost payment method',
        completionTimeline: 'Completion timeline'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field]) {
            errors[field] = `${label} is required`;
        }
    });

    // Additional validations
    if (formData.costPayment === 'Others' && !formData.otherCostPayment) {
        errors.otherCostPayment = 'Please specify your payment method';
    }

    return errors;
};

export const validateAccount = (formData) => {
    const errors = {};

    // Required fields validation
    if (!formData.username) {
        errors.username = 'Username is required';
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
};

export const validateStep = (step, formData) => {
    switch (step) {
        case 1:
            return validatePersonalInfo(formData);
        case 2:
            return validateLearningObjectives(formData);
        case 3:
            return validateAccount(formData);
        default:
            return {};
    }
}; 