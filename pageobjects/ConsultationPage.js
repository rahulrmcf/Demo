import {expect} from '@playwright/test';

export class ConsultationPage {
    constructor(page) {
        this.page = page;
        this.nextPatientBtn = page.getByRole('button', { name: /Next Patient/i });
        this.doctorPatientQueueHeading = page.getByRole('heading', { name: /Doctors Patient Queue/i });
        this.scheduledQueueHeading = page.getByText('Scheduled');
        this.queueCloseBtn = page.getByRole('button', { name: 'close' }).first();
        this.diagnosisBtn = page.getByText('Diagnosis', { exact: true });

        //Diagnosis page
        this.diagnosisTextField = page.getByRole('textbox', { name: 'Primary diagnosis' });
        this.additionalNotesTextField = page.getByRole('textbox', { name: 'Enter any additional notes' });

        //Prescription page
        this.prescriptionBtn = page.getByText('Prescription', { exact: true });
        this.searchMedicine = page.getByPlaceholder('Search medicine...');
        this.duration = page.getByPlaceholder('e.g. 3 days');
        this.notesInstructions = page.getByPlaceholder('Notes / Instructions...');
        this.combobox = page.getByRole('combobox');
        this.addMedicineBtn = page.getByLabel('Add Medicine', { exact: true });

        //Procedure page
        this.procedureBtn = page.getByText('Procedure Details', { exact: true });
        this.procedureName = page.getByPlaceholder('Search or type procedure');

        //Save Consultation
        this.saveConsultationBtn = page.getByRole('button', { name: 'Save Consultation' });
        this.successToast = page.getByRole('alert').getByText('Consultation medication details saved successfully');

    }

    async fullConsultation(consultation) {

        await this.diagnosisTextField.fill(consultation.primaryDiagnosis);
        await this.additionalNotesTextField.fill(consultation.additionalNotes);

        await this.prescriptionBtn.click();
        await this.selectFromDropdown(this.searchMedicine, consultation.medicine);
        await this.addMedicineBtn.click();

        await this.procedureBtn.click();
        await this.selectFromDropdown(this.procedureName, consultation.procedure);

        await this.saveConsultationBtn.click();

    }

    async selectFromDropdown(dropdown, optionText) {
        await dropdown.click();
        await this.page.getByRole('option', { name: optionText }).click();
    }

    saveConsultation() {
        this.saveConsultationBtn.click();
    }
    async addDiagnosis(diagnosis, notes) {
        await this.diagnosisTextField.fill(diagnosis);
        await this.additionalNotesTextField.fill(notes);

    }

    getPatient(patientId) {
        return this.page
            .getByRole('button')
            .filter({ hasText: patientId });
    }

    async callPatient(patientId) {
        await this.getPatient(patientId)
            .getByRole('button', { name: 'Call' })
            .click();
    }

    getActivePatient(patientId) {
        return this.getActiveQueue()
            .getByText(patientId, { exact: true });
    }

    getActiveQueue() {
        return this.page
            .getByRole('heading', { name: /Active \(\d+\)/ })
            .locator('..')
            .locator('..');
    }

    getCompletedQueue() {
        return this.page
            .getByRole('heading', { name: /Completed \(\d+\)/ })
            .locator('..')
            .locator('..');
    }

    getCompletedPatient(patientId) {
        return this.getCompletedQueue()
            .getByText(patientId, { exact: true });
    }

    getPatientCard(patientId) {
        return this.page
            .getByRole('button')
            .filter({ hasText: patientId });
    }

    async getPatientFirstName(patientId) {
        const patientName = this.getPatientCard(patientId).getByRole('heading');
        await expect(patientName).not.toHaveText('Unknown');
        return await patientName.textContent();

    }

}