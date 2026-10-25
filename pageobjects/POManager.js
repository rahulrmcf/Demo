const { LoginPage } = require('./LoginPage');
const { ClinicSelectionPage } = require('./ClinicSelectionPage');
const { PatientListPage } = require('./PatientListPage');
const { NavigationBar } = require('./NavigationBar');
const { AppointmentPage } = require('./AppointmentPage');
const { ConsultationPage } = require('./ConsultationPage');
export class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.clinicSelectionPage = new ClinicSelectionPage(page);
        this.patientListPage = new PatientListPage(page);
        this.navigationBar = new NavigationBar(page);
        this.appointmentPage = new AppointmentPage(page);
        this.consultationPage = new ConsultationPage(page);
    }

    getClinicSelectionPage() {
        return this.clinicSelectionPage;
    }

    getLoginPage() {
        return this.loginPage;
    }

    getPatientListPage() {
        return this.patientListPage;
    }

    getNavigationBar() {
        return this.navigationBar;
    }

    getAppointmentPage() {
        return this.appointmentPage;
    }

    getConsultationPage() {
        return this.consultationPage;
    }


}

