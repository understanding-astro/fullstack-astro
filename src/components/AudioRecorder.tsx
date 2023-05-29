import { VoiceRecorder } from "react-voice-recorder-player";

type Props = {
  cta?: string;
};

export const Recorder = (props: Props) => {
  return (
    <div>
      <VoiceRecorder
        onAudioDownload={(blob: Blob) => {
          // 👀 upload recording
        }}
      />

      {props.cta}
    </div>
  );
};
