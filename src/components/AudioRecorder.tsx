import { useState } from "react";
import { VoiceRecorder } from "react-voice-recorder-player";

type State = {
  blob: Blob;
};

export const Recorder = () => {
  const [state, setState] = useState<Partial<State>>({});

  return (
    <div className="flex flex-col">
      <VoiceRecorder
        onAudioDownload={(blob: Blob) => {
          setState({ blob });
        }}
      />

      {state.blob && (
        <div>
          <button
            className="mt-10 ext-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  dark:hover:bg-blue-700 dark:focus:ring-blue-800 
          dark:text-white dark:hover:text-white hover:text-white"
          >
            Upload Recording
          </button>
        </div>
      )}
    </div>
  );
};
