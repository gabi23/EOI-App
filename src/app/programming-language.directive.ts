import { Directive, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: 'img[ProgrammingLanguage]',
  host: {
    '(error)':'imageProgrammingLanguageFallback()'
  }
})
export class ProgrammingLanguageDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  imageProgrammingLanguageFallback() {
     const original = this.el.nativeElement; 
     const parent = this.renderer.parentNode(original);
     const substitute = this.renderer.createElement('div');
     this.renderer.addClass(parent,"language-text")
     const text = this.renderer.createText(this.el.nativeElement.alt);
     this.renderer.appendChild(substitute, text);
     this.renderer.appendChild(parent,substitute);
     this.renderer.removeChild(parent, original);


  }


}
