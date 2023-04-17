// whack-a-mole-message.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whackAMoleMessage'
})
export class WhackAMoleMessagePipe implements PipeTransform {

  transform(seconds: number | null): string {
    if (seconds == null) {
      return '';
    }

    const units = seconds > 1 ? 'seconds' : 'second'; 
    return seconds > 0 ? `Whack a mole will begin in ${seconds} ${units}` : '';
  }
}