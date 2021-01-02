import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'accountHtml'
})

export class accountHtmlPipe implements PipeTransform {
    transform(value: string): any {
        return value.replace(/<.*?>/g, ''); // replace tags
    }
}