import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedValue',
  standalone: true
})
export class NestedValuePipe implements PipeTransform {
  transform(value: any, path: string): any {
    if (!value || !path) return value;

    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : null;
    }, value);
  }
}
