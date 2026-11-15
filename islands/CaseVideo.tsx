import { useEffect } from "preact/hooks";
import type { WorkVideo } from "@/src/types.ts";
import styles from "./CaseVideo.module.css";

interface CaseVideoProps {
  label: string;
  video: WorkVideo;
}

export default function CaseVideo({ label, video }: CaseVideoProps) {
  useEffect(() => {
    import("media-chrome");
  }, []);

  return (
    <media-controller class={styles.player}>
      <video
        slot="media"
        src={video.src}
        poster={video.poster}
        preload="metadata"
        playsInline
        aria-label={label}
      >
        <track
          kind="captions"
          src={video.captions}
          srclang="en"
          label="English"
        />
      </video>
      <media-play-button slot="centered-chrome" class={styles.bigPlay} />
      <media-control-bar class={styles.bar}>
        <media-play-button />
        <media-time-range />
        <media-time-display showduration />
        <media-captions-button />
        <media-mute-button />
        <media-fullscreen-button />
      </media-control-bar>
    </media-controller>
  );
}
