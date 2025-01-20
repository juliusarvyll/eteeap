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

export const validateStep = (step, data) => {
    const errors = {};

    switch (step) {
        case 1:
            if (!data.firstName?.trim()) errors.firstName = 'First name is required';
            if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
            if (!data.email?.trim()) errors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
            if (!data.address?.trim()) errors.address = 'Address is required';
            if (!data.contactNumber?.trim()) errors.contactNumber = 'Contact number is required';
            if (!data.birthPlace?.trim()) errors.birthPlace = 'Birth place is required';
            if (!data.civilStatus) errors.civilStatus = 'Civil status is required';
            if (!data.sex) errors.sex = 'Sex is required';
            if (!data.nationality) errors.nationality = 'Nationality is required';
            // Document validation based on civil status
            if (data.civilStatus && !data.document) errors.document = 'Required document is missing';
            break;

        case 2:
            if (!data.firstPriority?.trim()) errors.firstPriority = 'First priority program is required';
            if (!data.goalStatement?.trim()) errors.goalStatement = 'Goal statement is required';
            if (!data.timeCommitment?.trim()) errors.timeCommitment = 'Time commitment is required';
            if (!data.costPayment) errors.costPayment = 'Cost payment information is required';
            if (data.costPayment === 'Others' && !data.otherCostPayment?.trim()) {
                errors.otherCostPayment = 'Please specify other payment method';
            }
            if (!data.completionTimeline) errors.completionTimeline = 'Completion timeline is required';
            break;

        case 3:
            // Elementary
            if (!data.elementarySchool?.trim()) errors.elementarySchool = 'Elementary school name is required';
            if (!data.elementaryAddress?.trim()) errors.elementaryAddress = 'Elementary school address is required';
            if (!data.elementaryDateFrom) errors.elementaryDateFrom = 'Start date is required';
            if (!data.elementaryDateTo) errors.elementaryDateTo = 'End date is required';

            // High School validation if hasHighSchoolDiploma is true
            if (data.hasHighSchoolDiploma && (!data.highSchools?.length || !data.highSchools[0].name?.trim())) {
                errors['highSchools.0.name'] = 'High school name is required';
            }

            // Post-Secondary validation if hasPostSecondaryDiploma is true
            if (data.hasPostSecondaryDiploma && (!data.postSecondary?.length || !data.postSecondary[0].program?.trim())) {
                errors['postSecondary.0.program'] = 'Program name is required';
            }
            break;

        case 4:
            if (!data.workExperiences?.length) {
                errors.workExperiences = 'At least one work experience is required';
            } else {
                data.workExperiences.forEach((exp, index) => {
                    if (!exp.designation?.trim()) errors[`workExperiences.${index}.designation`] = 'Designation is required';
                    if (!exp.companyName?.trim()) errors[`workExperiences.${index}.companyName`] = 'Company name is required';
                    if (!exp.dateFrom) errors[`workExperiences.${index}.dateFrom`] = 'Start date is required';
                    if (!exp.dateTo) errors[`workExperiences.${index}.dateTo`] = 'End date is required';
                });
            }
            break;

        case 5:
            // Validation only if awards are added
            if (data.academicAwards?.length) {
                data.academicAwards.forEach((award, index) => {
                    if (!award.title?.trim()) errors[`academicAwards.${index}.title`] = 'Award title is required';
                    if (!award.organization?.trim()) errors[`academicAwards.${index}.organization`] = 'Organization is required';
                });
            }
            break;

        case 6:
            if (!data.creativeWorks?.length) {
                errors.creativeWorks = 'At least one creative work is required';
            } else {
                data.creativeWorks.forEach((work, index) => {
                    if (!work.title?.trim()) errors[`creativeWorks.${index}.title`] = 'Title is required';
                    if (!work.description?.trim()) errors[`creativeWorks.${index}.description`] = 'Description is required';
                });
            }
            break;

        case 7:
            // Require at least one entry in any category
            if (!data.hobbies?.length && !data.specialSkills?.length &&
                !data.workActivities?.length && !data.volunteerActivities?.length &&
                !data.travels?.length) {
                errors.lifelong = 'At least one lifelong learning experience is required';
            }
            break;

        case 8:
            if (!data.essay?.trim()) {
                errors.essay = 'Essay is required';
            } else if (data.essay.trim().length < 500) {
                errors.essay = 'Essay must be at least 500 characters';
            }
            break;
    }

    return errors;
};
