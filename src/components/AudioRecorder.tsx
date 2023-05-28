import { useStore } from "@nanostores/react";
import { VoiceRecorder } from "react-voice-recorder-player";
import { $audioRecording, uploadRecording } from "@stores/audioRecording";

export const Recorder = () => {
  const state = useStore($audioRecording);

  switch (state.status) {
    case "idle":
      return (
        <div>
          <VoiceRecorder
            onAudioDownload={(blob: Blob) => uploadRecording(blob)}
          />

          <a
            href="/"
            className="dark:text-slate-50 px-4  mt-12 rounded-2xl inline-block bg-purple-600"
          >
            View Audibles
          </a>
        </div>
      );

    case "uploading":
      return (
        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            Uploading ...
          </div>
        </div>
      );

    case "failed":
      return (
        <div className="bg-red-400 rounded-md py-6 px-3 text-slate-100 motion-safe:animate-bounce">
          An error occurred uploading your recording
        </div>
      );

    case "completed":
      return (
        <div className="bg-green-400 rounded-md py-6 px-3 text-slate-100 motion-safe:animate-bounce">
          Successfully published your recording!
        </div>
      );

    default:
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
};
