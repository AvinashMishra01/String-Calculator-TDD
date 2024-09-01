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

  let delimiter = /[\n,]/; 
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
