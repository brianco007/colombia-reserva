import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { SessionTimeComponent } from './pages/session-time/session-time.component';
import { FullcalendarComponent } from './pages/fullcalendar/fullcalendar.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BusinessDashboardComponent } from './pages/business-dashboard/business-dashboard.component';
import { CancelAppointmentComponent } from './pages/cancel-appointment/cancel-appointment.component';
import { GallerycreateComponent } from './pages/gallerycreate/gallerycreate.component';


export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    title: "Home"
  },
  {
    path: "schedule",
    component: ScheduleComponent,
    title: "Tu Horario"
  },
  {
    path: "sessionTime/:id",
    component: SessionTimeComponent,
    title: "Tu Horario | Duración"
  },
  {
    path: "fullcalendar/:id",
    component: FullcalendarComponent,
    title: "Calendario"
  },
  {
    path: "booking/:id",
    component: BookingComponent,
    title: "Reservas"
  },
  {
    path: "dashboard/:id",
    component: BusinessDashboardComponent,
    title: "Dashboard"
  },
  {
    path: "dashboard/:id",
    component: BusinessDashboardComponent,
    title: "Dashboard"
  },
  {
    path: "cancel/:id",
    component: CancelAppointmentComponent,
    title: "Cancelar reserva"
  },
  {
    path: "gallery/:id",
    component: GallerycreateComponent,
    title: "Crear galería"
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },

];
