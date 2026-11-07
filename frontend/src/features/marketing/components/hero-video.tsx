import { preload } from 'react-dom';

import { cn } from '@/utils/cn';

import posterUrl from '../assets/hero-workshop-poster.webp';
import videoSmallUrl from '../assets/hero-workshop-sm.mp4';
import videoMp4Url from '../assets/hero-workshop.mp4';
import videoWebmUrl from '../assets/hero-workshop.webm';
import { useBackgroundVideo } from '../hooks/use-background-video';

// Background footage of the hero. Temporary clips (Mixkit free license)
// until MecaFix records its own workshop video: replace the files in
// ../assets keeping the same names.
//  - Poster (46 KB) paints first and is preloaded with high priority.
//  - 640x360 MP4 for phones (620 KB), 1280x720 WebM/MP4 for the rest (1.8 MB).
export const HeroVideo = () => {
  preload(posterUrl, { as: 'image', fetchPriority: 'high' });
  const { videoRef, shouldLoad, isPlaying, onPlaying } = useBackgroundVideo();

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 bg-night">
      <img
        src={posterUrl}
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        decoding="async"
        className="size-full object-cover"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        onPlaying={onPlaying}
        className={cn(
          'absolute inset-0 size-full object-cover opacity-0 motion-safe:transition-opacity motion-safe:duration-1000',
          isPlaying && 'opacity-100',
        )}
      >
        {shouldLoad && (
          <>
            <source
              src={videoSmallUrl}
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src={videoWebmUrl} type="video/webm" />
            <source src={videoMp4Url} type="video/mp4" />
          </>
        )}
      </video>
    </div>
  );
};
