import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'helpAndSupport'
})

export class helpHtmlPipe implements PipeTransform {
    transform(value: string): any {
        return value.replace(/<.*?>/g, ''); // replace tags
    }
}