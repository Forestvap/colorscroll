import { Component } from '@angular/core';

@Component({
  selector: 'colorscroll-app',
  template: `
  <div
    class="ui three column middle aligned centered grid"
    [colorScrollGradientBackground]="50">
    <div class="ui eight wide computer ten wide tablet twelve wide mobile column">
      <div class="ui segments raised scroll-controls-wrapper">
        <color-scroll-header></color-scroll-header>
        <hsl-scroll-blocks></hsl-scroll-blocks>

        <div id="color-details-widget" class="ui segment attached bottom center aligned secondary no-border">
        </div>

        <div class="ui segment attached bottom center aligned secondary no-border">
          <!-- HSL string value -->
          <code class="hsl-string">{{hslString$ | async}}</code>
          <code class="hex-string">#??????</code>
        </div>
      </div>
    </div>
  </div>
  `
})
export class AppComponent {}
