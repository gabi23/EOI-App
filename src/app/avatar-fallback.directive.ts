import { Directive, Input, HostBinding} from '@angular/core';

@Directive({
  selector: 'img[appAvatarFallback]',
  host: {
    '(error)':'fallbackUrl()',
    '[src]':'src'
   }
})
export class AvatarFallbackDirective {
  @Input() src:string;
  @Input() appAvatarFallback:string;

  fallbackUrl(){
    console.log("entro")
    this.src = this.appAvatarFallback || "../assets/avatar-fallback.svg";
  }


}
