import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IncomeService } from '../../../services/income.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income-details',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './income-details.component.html',
  styleUrl: './income-details.component.scss'
})
export class IncomeDetailsComponent {
  incomeForm : FormGroup = new FormGroup(
    {
      amount : new FormControl(''),
      source : new FormControl(''),
      date : new FormControl('')
    }
  )

  sources : any[] = [];
  submitted: boolean = false;
  incomes: any[] = [];
  totalAmount: any;

  constructor(private formBuilder: FormBuilder, private incomeService : IncomeService) { }

   ngOnInit () {
    this.incomeForm = this.formBuilder.group({
      amount : ['', []],
      source : ['', []],
      date : ['', []]
    })

    this.getIncomes()

   
    this.incomeService.getIncomeSources().subscribe(sources => {
      console.log(sources, "income sources");
      
      this.sources = sources;
    }, err => console.log("error", err))
   }

   getIncomes() {
    this.incomeService.getIncomes().subscribe(income => {

      this.incomes = income.data;
      this.totalAmount = income.totalAmount;
      console.log("income", income);
      
    }, err => console.log("error", err))

   }
   onSubmit() {
    this.submitted = true
     console.log(this.incomeForm.value);
     if (this.incomeForm.invalid) {
      return
     }

     this.incomeService.addIncome(this.incomeForm.value).subscribe(response => {
       console.log(response);
       this.submitted = false;
       this.getIncomes()
       this.incomeForm.reset();
     }, err => console.log("error", err))

   }
}
