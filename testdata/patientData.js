const unique = Date.now().toString().slice(-6);

export const newPatient =
{
    salutation: 'Mr',
    firstName: 'Auto',
    lastName: `Tester${unique}`,
    dob: '1995-05-20',
    gender: 'Male',
    countryCode: '+91',
    mobileNumber: `98${Date.now().toString().slice(-8)}`,
    email: `auto${unique}@example.com`,
    insurance: 'Basic',
    bloodGroup: 'A+',
    country: 'India',
    state: 'Kerala',
    district: 'Ernakulam',
    locality: 'Kakkanad',
    address: '123 Test Street',
};