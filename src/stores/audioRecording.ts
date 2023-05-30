import { atom } from "nanostores";

/**
 * Deterministic state representation
 */
type Store =
  | {
      blob: null;
      status: "idle";
    }
  | {
      blob: Blob;
      status: "uploading" | "completed" | "failed";
    };

/**
 * Optional naming convention: $[name_of_store]
 * Instead of [name_of_store]Store
 * i.e., $audioRecording instead of audioRecordingStore
 *
 * Also, we're using 'atom' and not 'map' to prohibit key changes and allow only replacing the whole object
 */
export const $audioRecording = atom<Store>({
  blob: null,
  status: "idle",
});

/**
 * upload audio recording action
 */
export const uploadRecording = async (blob: Blob) => {
  // Update $audioRecording state
  $audioRecording.set({
    status: "uploading",
    blob,
  });

  try {
    const response = await fetch("/api/recording", {
      method: "POST",
      body: blob,
    });

    if (response.ok) {
      $audioRecording.set({
        status: "completed",
        blob,
      });
    } else {
      $audioRecording.set({
        status: "failed",
        blob,
      });
    }
  } catch (error) {
    $audioRecording.set({
      status: "failed",
      blob,
    });
  } finally {
    // after 't' revert state to idle again
    const timeout = 3000;
    setTimeout(() => {
      $audioRecording.set({
        status: "idle",
        blob: null,
      });
    }, timeout);
  }
};
