import { useA11y } from "../a11y/accessibilityStore";

type Props = {
  src: string;
  poster?: string;
  captions?: { src: string; srclang: string; label: string; default?: boolean };
  transcript?: string; // texto de transcripción
  title: string;
};

export default function VideoPlayerAccessible({ src, poster, captions, transcript, title }: Props){
  const { captionsEnabled, muteAll } = useA11y();

  return (
    <figure className="border rounded-xl overflow-hidden">
      <video
        controls
        muted={muteAll}
        poster={poster}
        className="w-full"
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        {captions && (
          <track
            kind="captions"
            src={captions.src}
            srcLang={captions.srclang}
            label={captions.label}
            default={captionsEnabled || captions.default}
          />
        )}
      </video>
      {transcript && (
        <figcaption className="p-3 text-sm text-gray-700">
          <details>
            <summary className="cursor-pointer underline">Ver transcripción</summary>
            <p className="mt-2 whitespace-pre-wrap">{transcript}</p>
          </details>
        </figcaption>
      )}
    </figure>
  );
}
