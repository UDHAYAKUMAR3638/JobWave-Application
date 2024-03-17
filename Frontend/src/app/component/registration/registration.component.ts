import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  chart: any;
  registrations!: {
    APRIL: number,
    AUGUST: number,
    DECEMBER: number,
    FEBRUARY: number
    JANUARY: number
    JULY: number,
    JUNE: number,
    MARCH: number
    MAY: number,
    NOVEMBER: number,
    OCTOBER: number,
    SEPTEMBER: number,
  };
  year: number = 2024;
  @ViewChild("select")
  selectButton!: ElementRef;

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.getRegistrationsByMonth();
  }

  yearChange() {
    this.year = this.selectButton.nativeElement.value;
    this.getRegistrationsByMonth();
  }

  getRegistrationsByMonth() {
    if (this.chart)
      this.chart.destroy();
    this.registrationService.getRegistrationsByMonth(this.year).subscribe({
      next: (data) => {
        this.registrations = data.months;
        this.chart = new Chart("MyChart1", {
          type: 'line',
          data: {
            labels: Object.keys(this.registrations),
            datasets: [
              {
                label: "Registrations",
                data: Object.values(this.registrations),
                backgroundColor: 'blue'
              },
            ]
          },
          options: {
            aspectRatio: 2.5
          }

        });
      }

    });

  }
}
