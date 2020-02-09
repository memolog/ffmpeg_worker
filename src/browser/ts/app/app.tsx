import { h, Component } from "preact";

export class App extends Component {
  worker: Worker;
  stdout: any[];
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      stdout: [],
    };
    this.stdout = [];
    this.worker = new Worker("./lib/ffmpeg-worker-webm.js");
    this.worker.addEventListener("message", ev => {
      const msg = ev.data;
      const type = msg?.type ?? "";
      console.log(msg);
      switch (type) {
        case "ready":
          this.setState({
            loading: false,
          });
          break;
        case "stderr":
        case "stdout":
          console.log(msg.data);
          this.stdout.push({
            time: Date.now(),
            msg: msg.data,
          });
          this.setState({
            stdout: this.stdout.slice(this.stdout.length - 20),
          });
          break;
        case "done":
          const data = msg?.data?.MEMFS[0]?.data;
          this.setState({
            converted: URL.createObjectURL(new Blob([data])),
          });
          break;
      }
    });
  }
  changeHandler(ev: Event) {
    const target = ev.target;
    if (target && target instanceof HTMLInputElement) {
      const file = target.files && target.files[0];
      console.log(file);
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        console.log(result);
        if (result instanceof ArrayBuffer) {
          this.worker.postMessage({
            type: "run",
            MEMFS: [{ name: file.name, data: result }],
            arguments: ["-y", "-i", file.name, "-crf", "30", "-b:v", "0", "out.webm"],
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  render(props: any, state: any) {
    const converted = state.converted ? (<div>
        <video controls>
            <source src={state.converted} type="video/webm"></source>
        </video>
    </div>) : "";
    const fileField = state.loading ? (
      <input type="file" disabled />
    ) : (
      <input type="file" onChange={ev => this.changeHandler(ev)} />
    );

    const stdout = state.stdout.length
      ? state.stdout.map((obj: any) => (
          <div key={obj.time}>{obj.msg}</div>
        ))
      : "";

    const stdoutContainer = stdout.length ? <div class="stdout">{stdout}</div> : "";

    return (
      <div>
        <div>{fileField}</div>
        <div class="converted-container">{converted}</div>
        {stdoutContainer}
      </div>
    );
  }
}
