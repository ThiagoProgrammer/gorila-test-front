import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Investment } from 'src/app/models/investment.model';

@Component({
  selector: 'app-valued-position-simplified',
  templateUrl: './valued-position-simplified.component.html',
  styleUrls: ['./valued-position-simplified.component.scss'],
})
export class ValuedPositionSimplifiedComponent implements OnInit {
  investmentForm!: FormGroup;
  constructor(private titleService: Title) {
    this.titleService.setTitle('Controle de Investimentos');
  }

  ngOnInit(): void {
    this.createInvestmentsForm(new Investment());
  }

  createInvestmentsForm(investment: Investment) {
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
  get f() {
    return this.investmentForm.controls;
  }
  onSubmit() {}
}
