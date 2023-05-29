import { useStore } from "@nanostores/react";
import { VoiceRecorder } from "react-voice-recorder-player";
import { $audioRecording, uploadRecording } from "@stores/audioRecording";
import UploadingRecording from "@components/UploadingRecording.astro";
import RecordingPublishFailed from "@components/RecordingPublishFailed.astro";
import RecordingPublishSuccess from "@components/RecordingPublishSuccess.astro";

type Props = {
  cta?: string;
};

export const Recorder = (props: Props) => {
  const state = useStore($audioRecording);

  switch (state.status) {
    case "idle":
      return (
        <div>
          <VoiceRecorder
            onAudioDownload={(blob: Blob) => uploadRecording(blob)}
          />

          {props.cta}
        </div>
      );

    case "uploading":
      return <UploadingRecording>Uploading ...</UploadingRecording>;

    case "failed":
      return (
        <RecordingPublishFailed>
          An error occurred uploading your recording
        </RecordingPublishFailed>
      );

    case "completed":
      return (
        <RecordingPublishSuccess>
          Successfully published your recording!
        </RecordingPublishSuccess>
      );

    default:
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
};
