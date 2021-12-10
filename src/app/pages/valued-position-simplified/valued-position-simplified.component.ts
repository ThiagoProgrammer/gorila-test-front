import { BrlPipe } from './../../pipes/brl.pipe';
import { ToastrService } from 'ngx-toastr';
import { InvestmentsService } from './../../services/investments.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Investment } from 'src/app/models/investment.model';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { InvestmentsDTO } from 'src/app/dto/investment.dto';
import { ApexTooltip, ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { CurrencyPipe } from '@angular/common';
import { PercentagePipe } from 'src/app/pipes/percentage.pipe';

export type ChartOptions = {
  series?: any;
  chart?: any;
  responsive?: any;
  legend?: any;
  labels?: any;
  tooltip?: any;
  total?: any;
  plotOptions?: any;
};
@Component({
  selector: 'app-valued-position-simplified',
  templateUrl: './valued-position-simplified.component.html',
  styleUrls: ['./valued-position-simplified.component.scss'],
})
export class ValuedPositionSimplifiedComponent implements OnInit {
  investmentForm!: FormGroup;
  investments?: Investment;
  investmentsFiltered: any;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  totalInvestments: any;
  darkMode: boolean = false;
  loading: boolean = false;
  constructor(
    private titleService: Title,
    private router: Router,
    private investmentsService: InvestmentsService,
    private toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    private percentagePipe: PercentagePipe
  ) {
    this.titleService.setTitle('Controle de Investimentos');
  }

  ngOnInit(): void {
    this.createInvestmentsForm(new Investment());
    this.getUserInvestments();
  }
  createChart(totalInvestments: any) {
    this.chartOptions = {
      series: [
        this.investments!.totalRendaVariavel,
        this.investments!.totalRendaFixa,
      ],

      chart: {
        type: 'donut',
      },
      labels: [
        'Renda Variável ' +
          this.percentagePipe.transform(
            Math.round(
              (this.investments!.totalRendaVariavel! / this.totalInvestments) *
                100
            )
          ),
        'Renda Fixa ' +
          this.percentagePipe.transform(
            Math.round(
              (this.investments!.totalRendaFixa! / this.totalInvestments) * 100
            )
          ),
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
              offsetY: 0,
            },
          },
        },
        {
          breakpoint: 1367,
          options: {
            legend: {
              offsetY: 120,
            },
          },
        },
        {
          breakpoint: 1920,
          options: {
            legend: {
              offsetY: 150,
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 300,
                offsetY: 20,
                color: '#288a8e',
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Valor Total Investido',
                color: '#288a8e',
                formatter: function (w: any) {
                  const brlPipe = new BrlPipe();
                  return brlPipe.transform(totalInvestments);
                },
              },
              value: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: -20,
                color: '#288a8e',
              },
            },
          },
        },
      },
      legend: {
        show: true,
        position: 'right',
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
        y: {
          formatter: function (value: number) {
            const brlPipe = new BrlPipe();
            return `${brlPipe.transform(value)}`;
          },
        },
      },
    };
  }

  async getUserInvestments() {
    try {
      this.loading = true;
      this.investments = await lastValueFrom(this.investmentsService.getAll());
      this.investmentsFiltered = JSON.parse(JSON.stringify(this.investments));
      this.totalInvestments =
        this.investments!.totalRendaFixa! +
        this.investments!.totalRendaVariavel!;
      this.createChart(this.totalInvestments);
    } catch (error) {
      this.investmentsService.actionsForError(error);
    }
    this.loading = false;
  }
  filterInvestments(event: any) {
    const value = event.target.value;

    if (value == 'ALL') {
      this.investmentsFiltered = JSON.parse(JSON.stringify(this.investments));
    } else {
      this.investmentsFiltered.items = this.investments!.items!.filter(
        (x: any) => x.type.includes(value)
      );
    }
  }

  async deleteInvestment(id: number) {
    try {
      const res = await lastValueFrom(this.investmentsService.delete(id));
      this.toastr.success('Investimento removido!', 'Sucesso!');
      this.getUserInvestments();
    } catch (error) {
      this.investmentsService.actionsForError(error);
    }
  }

  createInvestmentsForm(investment: InvestmentsDTO) {
    this.investmentForm = new FormGroup({
      type: new FormControl(
        investment.type,
        Validators.compose([Validators.required])
      ),
      value: new FormControl(
        investment.value,
        Validators.compose([Validators.required])
      ),
      date: new FormControl(
        investment.date,
        Validators.compose([Validators.required])
      ),
    });
  }

  async onSubmit() {
    try {
      const res: any = await lastValueFrom(
        this.investmentsService.create(this.investmentForm.value)
      );
      this.toastr.success('Investimento adicionado!', 'Sucesso!');
      this.getUserInvestments();
    } catch (error) {
      this.investmentsService.actionsForError(error);
    }
  }
}
