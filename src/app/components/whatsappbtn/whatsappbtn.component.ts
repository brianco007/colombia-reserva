import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsappbtn',
  standalone: true,
  imports: [],
  templateUrl: './whatsappbtn.component.html',
  styleUrl: './whatsappbtn.component.css'
})
export class WhatsappbtnComponent {
  @Input() phoneNumber: string = '';
}
