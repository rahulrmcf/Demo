export class NavigationBar
{
    constructor(page)
    {
        this.page = page;

        this.dashboardBtn = page.locator(':text-is("Dashboard")');
        this.employeeBtn = page.locator('a').filter({ hasText: 'Employee' }).first();
        this.doctorBtn = page.locator(':text-is("Doctor")');
        this.nurseBtn = page.locator(':text-is("Nurse")');
        this.receptionBtn = page.locator(':text-is("Reception")');
        this.casualtyBtn = page.locator(':text-is("Casualty")').first();
        this.inpatientBtn = page.getByText('In-Patient');
        this.laboratoryBtn = page.locator(':text-is("Laboratory")');
        this.radiologyBtn = page.locator(':text-is("Radiology")');
        this.settingsBtn = page.locator(':text-is("Settings")');
        this.billingBtn = page.locator(':text-is("Billing")');
        this.reportsBtn = page.locator(':text-is("Reports")');
        this.supportBtn = page.locator(':text-is("Support")').first();
        this.profileMenu = page.locator('.MuiAvatar-root');
        this.logoutBtn = page.getByRole('button', { name: /Logout/i });
    }

    async goToPatientsPage()
    {
        await this.receptionBtn.click();
        await this.page.getByText('Patients',{exact:true}).click();
    }

    async goToAppointmentPage()
    {
        await this.receptionBtn.click();
        await this.page.getByText('Appointment', {exact:true}).click();
    }

}