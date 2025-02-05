type Country = 'US' | 'CA' | 'UK' | 'IN';

const regexPatterns = {
    enrollmentNumber: /^[A-Za-z0-9]+$/, // Alphanumeric ID
    classGrade: /^[0-9A-Za-z\s]+$/, // Supports numbers & letters
    email: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, // Fixed email regex
    parentName: /^[A-Za-z\s]+$/ // Only alphabets & spaces
  };

const countryRegexPatterns: Record<Country, RegExp> = {
    // US: 5-digit code or 5+4 format (e.g., 12345 or 12345-6789)
    US: /^\d{5}(-\d{4})?$/,
    // Canada: Pattern for Canadian postal codes (e.g., A1A 1A1)
    CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    // UK: Simplified pattern for UK postal codes (e.g., SW1A 1AA)
    UK: /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i,
    // India: 6-digit PIN code where the first digit is non-zero (e.g., 110001)
    IN: /^[1-9]\d{5}$/
};

export {
    regexPatterns,
    countryRegexPatterns
}