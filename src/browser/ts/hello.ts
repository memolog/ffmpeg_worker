import { Greeting } from './greeting/greeting';
import '../scss/hello.scss';

export class Hello {
  greeting: Greeting;
  constructor() {
    this.greeting = new Greeting();
  }
}
