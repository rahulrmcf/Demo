import { parseArgs } from "node:util";

export class PatientListPage {
    constructor(page) {
        this.page = page;
        this.addPatientBtn = page.getByText('+ Add');
        this.pageHeading = page.getByText('Patient List').last();
        this.patientList = page.getByText('+ Add');
        this.salutation = page.getByRole('combobox', { name: 'Salutation *' });
        this.firstName = page.locator("[name='firstName']");
        this.lastName = page.locator('[name="lastName"]');
        this.dob = page.locator("div[role='group']");
        this.dobDay = page.getByRole('spinbutton', { name: 'Day' });
        this.gender = page.getByRole('combobox', { name: 'Select Gender *' });
        this.countryCode = page.getByRole('combobox', { name: 'Code *' });
        this.mobileNumber = page.locator('[name="mobileNumber"]');
        this.email = page.locator('[name="email"]');
        this.insurance = page.locator('#mui-component-select-insuranceId');
        this.bloodGroup = page.locator('#mui-component-select-bloodGroup');
        this.country = page.getByRole('combobox', { name: 'Country *' });
        this.state = page.getByRole('combobox', { name: 'State *' });
        this.district = page.getByRole('combobox', { name: 'District *' });
        this.locality = page.locator('[name="locality"]');
        this.address = page.locator('[name="address"]');
        this.medicalHistory = page.locator('[name="medicalHistory"]');
        this.toast = page.getByRole('alert').filter({ hasText: 'Patient created successfully' });
        this.searchBox = page.getByRole('textbox', { name: 'Search Patient' });

        this.addNewPatientHeading = page.getByRole('heading', { name: 'Add New Patient' });
        this.patientListPageHeading = page.getByRole('heading', { name: 'Patient List' });

        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });

        this.salutationError = page.getByText('This field is required.').nth(0);
        this.firstNameError = page.getByText('This field is required.').nth(1);
        this.lastNameError = page.getByText('This field is required.').nth(2);
        this.dobError = page.getByText('Date of Birth is required.');
        this.genderError = page.getByText('This field is required.').nth(3);
        this.mobileError = page.getByText('Mobile Number is required.');
        this.emailError = page.getByText('This field is required.').nth(4);
        this.stateError = page.getByText('This field is required.').nth(5);
        this.districtError = page.getByText('This field is required.').nth(6);
        this.localityError = page.getByText('This field is required.').nth(7);
        this.addressError = page.getByText('This field is required.').nth(8);

    }
    // DOB splitter to make sure data is enter properly into the dob field.
    async fillDob(dob) {
        const [yyyy, mm, dd] = dob.split('-');
        await this.dobDay.click();
        await this.page.keyboard.type(`${dd}${mm}${yyyy}`);
    }

    // Opens the patient add form by clicking the Add button
    async openPatientForm() {
        await this.addPatientBtn.click();
    }

    //Helper for selectdropdown
    async selectFromDropdown(dropdown, optionText) {
        await dropdown.click();
        await this.page.getByRole('option', { name: optionText, exact: true }).click();
    }

    //Helper for autocomplete dropdown
    async selectAutocomplete(combobox, text) {
        await combobox.fill(text);
        await this.page.getByRole('option', { name: text, exact: true }).click();
    }

    async addPatient(patient) {
        await this.selectFromDropdown(this.salutation, patient.salutation);
        await this.firstName.fill(patient.firstName);
        await this.lastName.fill(patient.lastName);
        await this.fillDob(patient.dob);
        await this.selectFromDropdown(this.gender, patient.gender);
        await this.mobileNumber.fill(patient.mobileNumber);
        await this.email.fill(patient.email);
        await this.selectFromDropdown(this.insurance, patient.insurance);
        await this.selectFromDropdown(this.bloodGroup, patient.bloodGroup);
        await this.country.fill(patient.country);
        await this.selectAutocomplete(this.state, patient.state);
        await this.selectAutocomplete(this.district, patient.district);
        await this.locality.fill(patient.locality);
        await this.address.fill(patient.address);
        await this.submitBtn.click();


    }

    async searchPatient(text) {
        await this.searchBox.fill(text);
    }

    getPatientRow(fullName) {
        return this.page.getByRole('row').filter({ hasText: fullName });
    }




}