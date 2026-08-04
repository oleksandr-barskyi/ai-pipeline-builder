import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <main className="pipeline-app">
      <section className="pipeline-shell">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </section>
    </main>
  );
}

export default App;
