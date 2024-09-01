import { Component } from '@angular/core';

@Component({
  selector: 'app-calulator',
  templateUrl: './calulator.component.html',
  styleUrls: ['./calulator.component.css']
})
export class CalulatorComponent {

    inputString: string = '';
    result: number | null = null;
    errorMessage: string = '';
    exampleTemplate:boolean=false
    datas=[
      {input:'1,2,3', output:'6'},
      {input:'1\\n3\\n3', output:'7'},
      {input:'1!2!4!9!2', output:'18'},
      {input:'1+2+6', output:'9'},
      {input:'5$5$6', output:'16'},
      {input:'6&9&0', output:'15'},
      {input:'6&9!5', output:'20'},
      {input:'//;\\n1;2;3', output:'6'},
      {input:'//$\\n1$2$3', output:'6'},
      {input:'//!\\n1!2\\n3!3', output:'9'},
      {input:'//!\\n1!-2\\n3!3', output:'Negative numbers not allowed: -2'},
      {input:'//!\\n1!-2\\n3!-3', output:'Negative numbers not allowed: -2,-3'},
      {input:'//!\\n1!-2\\n3$3', output:'Error: Invalid number/sequence: 3$3'},
    ]
    onCalculate() {
      try {
        this.errorMessage = '';
        this.result = this.add(this.inputString);
      } catch (error:any) {
        this.errorMessage = error.message;
        this.result = null;
      }
    }


add(numbers: string): number {
  numbers = numbers.replace(/\\n/g, '\n').replace(/\r\n/g, '\n');
  console.log("Normalized input string:", JSON.stringify(numbers));

  if (numbers === "") {
    return 0;
  }

  let delimiter = /[\n,$!*&+]/; 
  let numberString = numbers;


  if (numbers.startsWith("//")) {
    const delimiterMatch = numbers.match(/^\/\/(.+?)\n/);
    console.log("Delimiter Match:", delimiterMatch); // Debug print

    if (delimiterMatch) {
      const customDelimiter = delimiterMatch[1];
      console.log("Custom Delimiter:", customDelimiter); // Debug print

      // Escape special characters for regex
      delimiter = new RegExp(customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      
      // Extract the numbers part from the string
      numberString = numbers.slice(numbers.indexOf('\n') + 1);
      console.log("Number String:", numberString); // Debug print
    } else {
      throw new Error("Invalid delimiter specification.");
    }
  }


  let nums: number[] = [];
  numberString.split(delimiter).forEach(str => {
   
    const subNums = str.split('\n').map(subStr => {
      const num = Number(subStr);
      if (isNaN(num)) {
        throw new Error(`Invalid number/sequence: ${subStr}`);
      }
      return num;
    });
    nums = nums.concat(subNums);
  });


  const negatives = nums.filter(num => num < 0);
  
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return nums.reduce((sum, num) => sum + num, 0);
}



  
  
}
