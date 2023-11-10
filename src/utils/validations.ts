export function validateName(name: string) {
    if (name.length < 3 || name.length > 30) {
        return 'Name must be between 3 and 30 characters long.';
    }

    if (/\s/g.test(name)) {
        return 'Name cannot contain spaces.';
    }

    if (/[^a-zA-Z0-9_.]/g.test(name)) {
        return 'Name must contain only letters, digits, underscores, and periods.';
    }

    if (/^\./.test(name) || /\.$/.test(name)) {
        return 'Name cannot start or end with a period.';
    }

    if (/^_/g.test(name)) {
        return 'Name cannot start with an underscore.';
    }

    if (/_$/g.test(name)) {
        return 'Name cannot end with an underscore.';
    }

    if (/\.{2,}/g.test(name)) {
        return 'Name cannot contain two or more consecutive periods.';
    }

    if (/_{2,}/g.test(name)) {
        return 'Name cannot contain two or more consecutive underscores.';
    }

    // If all checks pass, return null
    return null;
}
