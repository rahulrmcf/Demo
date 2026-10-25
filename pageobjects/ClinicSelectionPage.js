export class ClinicSelectionPage
{
    constructor(page)
    {
        this.page = page;
        this.clinicName = page.locator('#tenant-name-input');
        this.continueBtn = page.locator('#tenant-continue-btn');
    }

    async selectClinic(clinicname)
    {
        await this.clinicName.fill(clinicname);
        await this.continueBtn.click();
    }


}