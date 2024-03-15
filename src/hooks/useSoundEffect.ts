import { useCallback } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

const useSoundEffect = () => {
  const { load, stop } = useGlobalAudioPlayer();

  const basePath = "/soundEffects";

  const loopPlayBackgroundMusic = useCallback(() => {
    load(`${basePath}/bgmusic.mp3`, { loop: true, autoplay: true });
  }, [load]);

  return {
    loopPlayBackgroundMusic,
    stop
  };
};

export default useSoundEffect;
