export class AppointmentPage {
    constructor(page) {
        this.page = page;
        this.addPatientBtn = page.getByRole('button', { name: 'Add Patient' });
        this.searchPatientField = page.getByRole('combobox', { name: 'Search Patient' });
        this.patientCode = page.getByText(/Patient Code:/);
        this.department = page.getByRole('combobox', { name: 'Department' });
        this.doctorName = page.getByText('Rohan Kumar', { exact: true });
        this.availableTimeSlots = page.locator('input[name="timeSlot"]:not([disabled])');
        this.proceedBtn = page.getByText('Proceed', { exact: true });
        this.completePaymentHeading = page.getByRole('heading', { name: 'Complete Payment' });
        this.payBtn = page.locator("button[type='submit']");
        this.paymentSuccess = page.getByRole('heading', { name: 'Payment Successful!' });
    }

    //Helper for autocomplete
    async selectAutoComplete(combobox, text) {
        await combobox.fill(text);
        await this.page.getByRole('option', { name: text }).click();
    }

    async selectFromDropdown(dropdown, optionText) {
        await dropdown.click();
        await this.page.getByRole('option', { name: optionText, exact: true }).click();
    }

    async searchPatient(text) {
        await this.selectAutoComplete(this.searchPatientField, text);
    }

    async selectDoctor() {
        await this.doctorName.click();
    }

    async selectTimeSlot(time) {
        await this.page.locator('label').filter({ hasText: time }).click();
    }

    async submit() {
        await this.proceedBtn.click();
    }

    async selectPaymentOption(option) {
        await this.page.getByRole('radio', { name: option }).check();
    }

    async pay()
    {
        this.payBtn.click();
    }

}