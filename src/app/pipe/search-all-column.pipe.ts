import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAllColumn'
})
export class SearchAllColumnPipe implements PipeTransform {

  transform(values: any[], filter:Object): any {
    if (!values || !values.length) { return []; }
    if (Object.keys(filter).length == 0) {return values; }
    let filterKeys = Object.keys(filter);
    return values.filter((item) => {
       let matchingFields =  filterKeys.find((key)=> item[key].toLowerCase().indexOf(filter[key].toLowerCase()) < 0)
       return !matchingFields;
    })
  }

}
