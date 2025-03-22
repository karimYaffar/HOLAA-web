import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, input, Output } from "@angular/core";

@Component({
  selector: 'button-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-control.component.html'
})
export class ButtonControlComponent { 
  @Input() hasIconClass: boolean = false
  @Input() hasIconClassHidden: boolean = false;
  @Input() isIconRight: boolean = false;
  @Input() iconClass: string = "";
  @Input() iconClassHidden: any;
  @Input() text: string = "";
  @Input() type: string = "button"
  @Input({ required: true }) buttonClass!: string;
  @Input() hasDisabledCondition: boolean = false;
  @Input() disabledCondition: any;
  @Output() onClick = new EventEmitter<void>();
}